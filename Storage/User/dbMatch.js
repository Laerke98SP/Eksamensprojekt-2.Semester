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
        });
        connection.connect();
    })
};
module.exports.sqlConnection = connection;
module.exports.startDb = startDb;

function insertMatch(payload){
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO MATCH (userID2, userID1)
        SELECT TOP 1 ue1.userID2, ue1.userID1
        FROM userEdge AS ue1
        INNER JOIN userEdge AS ue2
            ON ue1.userID1 = ue2.userID2
            AND ue1.userID2 = ue2.userID1
        WHERE ue1.userID1 = (SELECT id FROM [user] WHERE [user].email = 'lauraboejer@hej.dk')
        OR ue1.userID2 = (SELECT id FROM [user] WHERE [user].email = 'lauraboejer@hej.dk')
            AND NOT EXISTS (SELECT userID1, userID2
                            FROM match
                            WHERE userID1 = ue1.userID1
                            OR userID2 = ue1.userID2);`
        console.log("Sending SQL query to DB");
        const request = new Request(sql, (err) => {
            if (err){
                reject(err)
                console.log(err)
            }
        });

        console.log("Testing the params now");
        request.addParameter('email', TYPES.VarChar, payload.email);
       
        request.on('requestCompleted', (row) => {
        
            resolve('Match inserted', row)
        });
        connection.execSql(request)

    });
};
module.exports.insertMatch = insertMatch;

function getMatches(email){
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM [user] INNER JOIN match ON [user].id = match.userID1 OR [user].id = match.userID2 WHERE [user].email <> @email';
        console.log("Now we have ran sql query");
        const request = new Request(sql, (err, rowcount) => {
            if(rowcount == 0) {
                reject(
                    {message: ' There are no users'}  
                );
            } else if (err) {
                reject(err)
                console.log(err + " error comming from db.js")
            } else {
                console.log("Everything went fine in db.js");
            };
        });       
        //Column name, data type, paramname
        request.addParameter('email', TYPES.VarChar, email)
        
        //A row resulting from execution of the SQL statement.
        //Column consist of meta data and value
        request.on('doneInProc', function (rowCount, more, rows) { 
            resolve(rows)
        });
        connection.execSql(request)
    });
};
module.exports.getMatches = getMatches;

function deleteMatch(email, match){
    return new Promise((resolve, reject) => {
        const sql = `BEGIN TRANSACTION;
        DELETE FROM match
        OUTPUT deleted.*
        WHERE match.userID1 = (SELECT id FROM [user] WHERE [user].email = @email) AND match.userID2 = (SELECT id FROM [user] WHERE [user].email = @match)
          OR match.userID2 = (SELECT id FROM [user] WHERE [user].email = @email) AND match.userID2 = (SELECT id FROM [user] WHERE [user].email = @match);
        DELETE FROM userEdge
        OUTPUT deleted.*
        WHERE userEdge.userID1 = (SELECT id FROM [user] WHERE [user].email = @email)
          AND userEdge.userID2 = (SELECT id FROM [user] WHERE [user].email = @match)
        COMMIT TRANSACTION;`;      
        console.log("Sending SQL query to DB");
        const request = new Request(sql, (err) => {
            if (err){
                reject(err)
                console.log(err)
            };
        });
        console.log("Testing the params now");
        request.addParameter('email', TYPES.VarChar, email) 
        request.addParameter('match', TYPES.VarChar, match) 
        console.log("Checking if the parameters exist " + email);
        request.on('requestCompleted', (row) => {
            console.log('Match deleted', row);
            resolve('Match deleted')
        });
        connection.execSql(request)
    });
}
module.exports.deleteMatch = deleteMatch;