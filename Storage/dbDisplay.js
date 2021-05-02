
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
    });
}

module.exports.sqlConnection = connection;
module.exports.startDb = startDb;


function displayAll(){
    return new Promise((resolve, reject) => {
        const sql = 'SELECT email FROM [user]';
        console.log("Asking for all users in DB")

        const request = new Request(sql, (err, rowcount, rows) => {
            if(rowcount == 0) {
                reject(
                    { message: 'There are no users'}  
                )
            }
            else if (err){
                reject(err)
                console.log(err + " error comming from db.js")
            } 
            else {
                console.log("everything went fine in dbDisplay");
            }
        });
        request.on('doneInProc', function (rowCount, more, rows) { 
            

            resolve(rows)
        });
    
        
        //Execute the SQL represented by request.
        connection.execSql(request)
    })
};
module.exports.displayAll = displayAll;