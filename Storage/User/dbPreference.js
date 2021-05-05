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



//  GET req - for login function - DONE
function potential(email, password){
    return new Promise((resolve, reject) => {
        const sql = 'SELECT firstName, lastName, dob, gender, description FROM [user] WHERE ageMin < @ageMin AND ageMax > @ageMax AND gender = @gender';
        console.log("Now we have ran sql query")
        const request = new Request(sql, (err, rowcount) => {
            console.log(rowcount)
            if (rowcount == 0) {
                reject(
                    { message: 'We couldnt log you in'}  
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
        request.addParameter('password', TYPES.VarChar, password)
        
        
        
        //A row resulting from execution of the SQL statement.
        // column consist of meta data and value
        request.on('doneInProc', function (rowCount, more, rows) { 
            
            console.log(rows);
            resolve(rows)
        });
        //Execute the SQL represented by request.
        connection.execSql(request)
    })
};
module.exports.potential = potential;