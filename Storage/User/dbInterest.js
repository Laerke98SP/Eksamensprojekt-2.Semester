const { Connection, Request, TYPES } = require('tedious');
const config = require('../config.json')

var connection = new Connection(config)


function startDb(){
    return new Promise((resolve, reject) => {
        connection.on('connect', (err) => {
            if (err) {
                console.log("Connection failed")
                reject(err)
                throw err;
            } else {
                console.log("Connected")
                resolve();
            }
        })
        connection.connect();
    });
}

module.exports.sqlConnection = connection;
module.exports.startDb = startDb;


// Insert User Interest POST
function insertInterest(payload){
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO userInterest(userID, interestID,vote)
        SELECT u.id, i.id, vote = @sVote
        FROM [user] as u, interest as i
        WHERE u.email = @email AND
              i.name = @sports;
        INSERT INTO userInterest(userID, interestID,vote)
        SELECT u.id, i.id, vote= @mVote
        FROM [user] as u, interest as i
        WHERE u.email = @email AND
              i.name = @music;
        INSERT INTO userInterest(userID, interestID,vote)
        SELECT u.id, i.id, vote = @hVote
        FROM [user] as u, interest as i
        WHERE u.email = @email AND
              i.name = @hiking;
        INSERT INTO userInterest(userID, interestID,vote)
        SELECT u.id, i.id, vote=@dVote
        FROM [user] as u, interest as i
        WHERE u.email = @email AND
              i.name = @dancing;`

        
        console.log("Sending SQL query to DB");
        const request = new Request(sql, (err) => {
            if (err){
                reject(err)
                console.log(err)
            }
        });

        console.log("Testing the params now");
        request.addParameter('email', TYPES.VarChar, payload.email);
        request.addParameter('sports', TYPES.VarChar, payload.sports);
        request.addParameter('sVote', TYPES.Int, payload.sVote);
        request.addParameter('music', TYPES.VarChar, payload.music);
        request.addParameter('mVote', TYPES.Int, payload.mVote);
        request.addParameter('hiking', TYPES.VarChar, payload.hiking);
        request.addParameter('hVote', TYPES.Int, payload.hVote);
        request.addParameter('dancing', TYPES.VarChar, payload.dancing);
        request.addParameter('dVote', TYPES.Int, payload.dVote);
       

        request.on('requestCompleted', (row) => {
            console.log('Interest inserted', row);
            resolve('Interest inserted')
        });
        connection.execSql(request)

    });
}
module.exports.insertInterest = insertInterest;


//  GET req - for userInterestfunction - DONE
function showInterest(email){
    return new Promise((resolve, reject) => {
        const sql = `SELECT  i.name
        FROM interest as i
        INNER JOIN userInterest as ui
        ON i.id = ui.interestID
        INNER JOIN [user] as u
        ON u.id = ui.userID
        WHERE u.email = @email  and ui.vote = 1;`;
        console.log("Now we have ran sql query")
        const request = new Request(sql, (err, rowcount, rows) => {
            // console.log(rowcount)
            // console.log(rows)
            if (rowcount == 0) {
                reject(
                    { message: 'There is no interest'}  
                )
            }
            else if (err){
                reject(err)
                console.log(err + " error comming from db.js")
            } 
            else {
                console.log(" everything went fine in db.js");
                console.log(rowcount + " logging rowcount");
            }
        });
        // column name, data type, paramname
        request.addParameter('email', TYPES.VarChar, email)

        
        //A row resulting from execution of the SQL statement.
        // column consist of meta data and value
        request.on('doneInProc', function (rowCount, more, rows) { 
         
            resolve(rows)
        });
        //Execute the SQL represented by request.
        connection.execSql(request)
    })
};
module.exports.showInterest = showInterest;


