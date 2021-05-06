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
function potential(ageMin, ageMax, genderPref){
    return new Promise((resolve, reject) => {
        const sql = `SELECT firstName, lastName, dob, gender, description
        FROM [user]
            WHERE ( DATEDIFF(YEAR , dob, GETDATE()) BETWEEN @ageMin AND @ageMax) And gender = @genderPref`;
        console.log("Now we have ran sql query")
        const request = new Request(sql, (err, rowcount) => {
            console.log(rowcount)
            if (rowcount == 0) {
                reject(
                    { message: 'Could not find any users with the age requirements'}  
                )
            }
            else if (err){
                reject(err)
                console.log(err + " error comming from db.js")
            } 
            else {
                console.log(" everything went fine in dbPreferences");
                console.log(rowcount + " logging rowcount");
            }
        });
        // column name, data type, paramname
        request.addParameter('ageMin', TYPES.Int, ageMin);
        request.addParameter('ageMax', TYPES.Int, ageMax);
        request.addParameter('genderPref', TYPES.Int, genderPref);
        
        
        
        //A row resulting from execution of the SQL statement.
        // column consist of meta data and value
        request.on('doneInProc', function (rowCount, more, rows) { 
            
            for( i in rows){
                console.log(i.rows)
            }

            console.log(rows);
            resolve(rows)
        });
        //Execute the SQL represented by request.
        connection.execSql(request)
    })
};
module.exports.potential = potential;