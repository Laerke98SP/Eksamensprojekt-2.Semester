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
        });
        connection.connect();
    })
}

module.exports.sqlConnection = connection;
module.exports.startDb = startDb;


function insertMatch(payload){
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO match (userID2, userID1)
                    VALUES ((SELECT id FROM [user] WHERE [user].email =  @email1), 
                    (SELECT id FROM [user] WHERE [user].email = @email2))`

        
        console.log("Sending SQL query to DB");
        const request = new Request(sql, (err) => {
            if (err){
                reject(err)
                console.log(err)
            }
        });

        console.log("Testing the params now");
        request.addParameter('email1', TYPES.VarChar, payload.email1);
        request.addParameter('email2', TYPES.VarChar, payload.email2);
       
        console.log("Checking if the parameters exist " + payload.userID1);

        request.on('requestCompleted', (row) => {
            console.log('User inserted', row);
            resolve('user inserted', row)
        });
        connection.execSql(request)

    });
}
module.exports.insertMatch = insertMatch;

function getMatches(email){
    return new Promise((resolve, reject) => {
        const sql =`SELECT match.userID1, match.userID2 
                    FROM match WHERE (SELECT id FROM [user] 
                    WHERE [user].email = @email) = match.userID1 
                    OR 
                    (SELECT id FROM [user] 
                    WHERE [user].email = @email) = match.userID2;`;
        
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
        request.addParameter('email', TYPES.Char, email);

        //A row resulting from execution of the SQL statement.
        // column consist of meta data and value
        request.on('row', (columns) => {
            // console.log(columns)
            resolve(columns)
        })

        //Execute the SQL represented by request.
        connection.execSql(request)
    })
};
module.exports.getMatches = getMatches;


function deleteMatch(payload){
    return new Promise((resolve, reject) => {
        const sql = `DELETE
                    FROM match
                    OUTPUT deleted.*
                    WHERE match.userID1 = (SELECT id FROM [user] WHERE [user].email = @email1)
                    AND match.userID2 = (SELECT id FROM [user] WHERE [user].email = @email2)
                    OR match.userID1 = (SELECT id FROM [user] WHERE [user].email = @email2)
                    AND match.userID2 = (SELECT id FROM [user] WHERE [user].email = @email1)`

        console.log("Sending SQL query to DB");
        const request = new Request(sql, (err) => {
            if (err){
                reject(err)
                console.log(err)
            }
        });

        console.log("Testing the params now");
        request.addParameter('email1', TYPES.VarChar, payload.email1);
        request.addParameter('email2', TYPES.VarChar, payload.email2);
       
        console.log("Checking if the parameters exist");

        request.on('requestCompleted', (row) => {
            resolve(row)
        });
        connection.execSql(request)

    });
}
module.exports.deleteMatch = deleteMatch;



function deleteAllMatches(email){
    return new Promise((resolve, reject) => {
        const sql = `DELETE m FROM match as m INNER JOIN [user] as u ON u.id = m.userID1 OR u.id = m.userID2 WHERE u.email = @email;`

        console.log("Sending SQL query to DB");
        const request = new Request(sql, (err) => {
            if (err){
                reject(err)
                console.log(err)
            }
        });

        console.log("Testing the params now");
        request.addParameter('email', TYPES.VarChar, email);
       
        console.log("Checking if the parameters exist " + email);

        request.on('requestCompleted', (row) => {
            console.log('User inserted', row);
            resolve('user inserted', row)
        });
        connection.execSql(request)

    });
}
module.exports.deleteAllMatches = deleteAllMatches;