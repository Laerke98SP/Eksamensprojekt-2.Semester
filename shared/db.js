const { Connection, Request, TYPES} = require('tedious');
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


// POST REQ - for create user function
function insert(payload){
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO [user] (email, password, firstName, lastName, dob, gender, description, ageMin, ageMax, genderPref)
        VALUES ('@email, @password, @firstName, @lastName, @dob, @gender, @description, @ageMin, @ageMax, @genderPref);`
        const request = new Request(sql, (err) => {
            if (err){
                reject(err)
                console.log(err)
            }
        });
        request.addParameter('email', TYPES.VarChar, payload.email)
        request.addParameter('password', TYPES.VarChar, payload.password)
        request.addParameter('firstName', TYPES.VarChar, payload.firstName)
        request.addParameter('lastName', TYPES.VarChar, payload.lastName)
        request.addParameter('dob', TYPES.Date, payload.dob)
        request.addParameter('gender', TYPES.VarChar, payload.gender)
        request.addParameter('description', TYPES.VarChar, payload.description)
        request.addParameter('ageMin', TYPES.INT, payload.min)
        request.addParameter('ageMax', TYPES.INT, payload.max)
        request.addParameter('genderPref', TYPES.INT, payload.gendPref)

        request.on('requestCompleted', (row) => {
            console.log('User inserted', row);
            resolve('user inserted', row)
        });
        connection.execSql(request)

    });
}
module.exports.insert = insert;


// Works GET req - for login function
function select(email, password){
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM [user] WHERE email = @email AND password = @password;';
        console.log("Now we have ran sql query")
        const request = new Request(sql, (err, rowcount) => {
            if(rowcount == 0) {
                reject(
                    {message: 'Hey alex - User does not exist '}  
                )
            }
            else if (err){
                reject(err)
                console.log(err + " error comming from db.js")
            } 
            else {
                console.log(" everything went fine in db.js");
            }
        });
        // column name, data type, paramname
        request.addParameter('email', TYPES.VarChar, email)
        request.addParameter('password', TYPES.VarChar, password)
        
        
        
        //A row resulting from execution of the SQL statement.
        // column consist of meta data and value
        request.on('row', (columns) => {
            resolve(columns)//'user arrived '+ columns)
            // for(i = 1; i< columns.length; i++){
            //     console.log(columns[i].value)
            // };
            // testing output in debug console
            // for( i in columns){
            //     console.log(Object.values(columns[i]))
            // };
             console.log( "testing loop in DB.js");
        });
        //Execute the SQL represented by request.
        connection.execSql(request)
    })
};
module.exports.select = select;