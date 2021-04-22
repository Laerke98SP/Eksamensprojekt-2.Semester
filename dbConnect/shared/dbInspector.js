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
}

module.exports.sqlConnection = connection;
module.exports.startDb = startDb;

function selectAdmin(email, password){
    return new Promise((resolve, reject) => {
        const sql = 'SELECT id FROM [admin] WHERE email = @email AND password = @password';
        console.log("Now we have ran sql query")

        const request = new Request(sql, (err, rowcount) => {
            if(rowcount == 0) {
                reject(
                    {message: 'User does not exist '}  
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
        // column name, data type, paramname
        request.addParameter('email', TYPES.VarChar, email)
        request.addParameter('password', TYPES.VarChar, password)
        
        
        
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
module.exports.selectAdmin = selectAdmin;

