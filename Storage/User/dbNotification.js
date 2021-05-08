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

function createNotification(payload){
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO notification (matchID, userID)
                     SELECT match.id, [user].id
                     FROM match
                     INNER JOIN [user]
                         ON match.userID1 = [user].id
                         OR match.userID2 = [user].id
                         WHERE [user].email = @email;`;
        console.log("Sending SQL query to DB");
        const request = new Request(sql, (err) => {
            if (err){
                reject(err)
                console.log(err)
            }
        });

        // console.log("Testing the params now");
        request.addParameter('email', TYPES.VarChar, payload.email);
       
        request.on('requestCompleted', (row) => {
            resolve('Notification created', row)
        });
        connection.execSql(request)

    });
};
module.exports.createNotification = createNotification;

function getNotification(email){
    return new Promise((resolve, reject) => {
        const sql = `SELECT *
                     FROM notification
                     WHERE userID = (SELECT id FROM [user] WHERE [user].email = @email)
                     AND notified = 0;
                     UPDATE notification
                     SET notified = 1
                     WHERE notified = 0 AND userID = (SELECT id FROM [user] WHERE [user].email = @email);`;
        console.log("Now we have ran sql query");
        const request = new Request(sql, (err, rowcount) => {
            if(rowcount == 0) {
                reject(
                    {message: ' There are no new matches'}  
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
module.exports.getNotification = getNotification;
