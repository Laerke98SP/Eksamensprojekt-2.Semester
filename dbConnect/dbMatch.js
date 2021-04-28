const { Connection, Request, TYPES } = require('tedious');
const config = require('./config.json')

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
    })
};

module.exports.sqlConnection = connection;
module.exports.startDb = startDb;


function insertMatch(payload){
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO [match] (userID2, userID1)
        VALUES (@userID2, @userID1);`

        
        console.log("Sending SQL query to DB");
        const request = new Request(sql, (err) => {
            if (err){
                reject(err)
                console.log(err)
            }
        });

        console.log("Testing the params now");
        request.addParameter('userID2', TYPES.Int, payload.userID2);
        request.addParameter('userID1', TYPES.Int, payload.userID1);
       
        console.log("Checking if the parameters exist " + payload.userID1);

        request.on('requestCompleted', (row) => {
            console.log('User inserted', row);
            resolve('user inserted', row)
        });
        connection.execSql(request)

    });
}
module.exports.insertMatch = insertMatch;

function getMatches(userID){
    return new Promise((resolve, reject) => {
        const sql = 'SELECT match.userID1, match.userID2 FROM match WHERE (SELECT id FROM [user] WHERE [user].email = @email) = match.userID1 OR (SELECT id FROM [user] WHERE [user].email = @email) = match.userID2;';
        console.log("Now we have ran sql query")

        const request = new Request(sql, (err, rowcount) => {
            if(rowcount == 0) {
                reject(
                    {message: ' There are no users'}  
                )
            }
            else if (err){
                reject(err)
                console.log(err + " error comming from db.js")
            } 
            else {
                console.log("everything went fine in db.js");
            }
        });       
        
        console.log("Testing the params now");
        request.addParameter('userID1', TYPES.Int, payload.userID);
        
        //A row resulting from execution of the SQL statement.
        // column consist of meta data and value
        request.on('row', (columns) => {
            resolve(columns)
             console.log( "testing loop in DB.js");
        });
        //Execute the SQL represented by request.
        connection.execSql(request)
    })
};
module.exports.getMatches = getMatches;