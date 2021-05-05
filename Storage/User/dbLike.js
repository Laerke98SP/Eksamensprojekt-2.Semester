
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
            };
        })
        connection.connect();
    })
}

module.exports.sqlConnection = connection;
module.exports.startDb = startDb;

function selectAll(email){
    //console.log("checking if first line in DB function works")
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM [user]
        WHERE [user].id NOT IN (SELECT userEdge.userID2
        FROM [user]
        INNER JOIN userEdge
        ON [user].id = userEdge.userID1
        WHERE [user].email = @email)
        AND (SELECT id FROM [user] WHERE [user].email = @email ) <> [user].id;` ;
        //console.log("Now we have ran sql query for potential matches")
        const request = new Request(sql, (err, rowcount) => {
            console.log(rowcount)
            if(rowcount == 0) {
                reject(
                    {message: 'There are no users to get'}  
                )
            }
            else if (err){
                reject(err)
                console.log(err + " error comming from db.js")
            } 
            else {
                console.log(" everything went fine in db.js " + rowcount);
            }
        });
        // column name, data type, paramname
        request.addParameter('email', TYPES.VarChar, email)
        
        //A row resulting from execution of the SQL statement.
        // column consist of meta data and value        
        request.on('row', (columns) => {
   
            resolve(columns)
           
        });
        //Execute the SQL represented by request.
        connection.execSql(request) // A Request Object represent the request
    });
};
module.exports.selectAll = selectAll;


function userVote(payload){
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO  userEdge (userID2, userID1, vote)
        SELECT votedOn.id, voter.id, vote = @vote
        FROM [user] as votedOn, [user] as voter
            WHERE  voter.email = @voter AND votedOn.email = @votedOn `

        
        //console.log("Sending SQL query to DB");
        const request = new Request(sql, (err) => {
            if (err){
                reject(err)
                console.log(err)
            }
        });

        //console.log("Testing the params now");
        request.addParameter('votedOn', TYPES.VarChar, payload.votedOn)
        request.addParameter('voter', TYPES.VarChar, payload.voter)
        request.addParameter('vote', TYPES.Int, payload.vote)
  
       
        //console.log("Checking if the parameters exist " + payload.votedOn);

        request.on('requestCompleted', (row) => {
            //console.log('User inserted', row);
            resolve('user inserted', row)
        });
        connection.execSql(request)

    });
}
module.exports.userVote = userVote;