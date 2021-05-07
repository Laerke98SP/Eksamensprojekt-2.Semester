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


// POST REQ - for create user function 
function insert(payload){
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO [user] (email, password, firstName, lastName, dob, gender, description, ageMin, ageMax, genderPref)
        VALUES (@email, @password, @firstName, @lastName, @dob, @gender, @description, @ageMin, @ageMax, @genderPref);`

        const request = new Request(sql, (err) => {
            if (err){
                reject(err)
                console.log(err)
            }
        });

        // Defining params for SQL query
        request.addParameter('email', TYPES.VarChar, payload.email)
        request.addParameter('password', TYPES.VarChar, payload.password)
        request.addParameter('firstName', TYPES.VarChar, payload.firstName)
        request.addParameter('lastName', TYPES.VarChar, payload.lastName)
        request.addParameter('dob', TYPES.VarChar, payload.dob)
        request.addParameter('gender', TYPES.VarChar, payload.gender)
        request.addParameter('description', TYPES.VarChar, payload.description)
        request.addParameter('ageMin', TYPES.Int, payload.ageMin)
        request.addParameter('ageMax', TYPES.Int, payload.ageMax)
        request.addParameter('genderPref', TYPES.Int, payload.genderPref)
       
        // When inserted , return to API
        request.on('requestCompleted', (row) => {
            resolve('user inserted')
        });
        connection.execSql(request)
    });
}
module.exports.insert = insert;


//  GET req - for login function - DONE
function select(email, password){
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM [user] WHERE email = @email AND password = @password;';
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
        request.on('row', (columns) => {
            resolve(columns)
            
        });
        //Execute the SQL represented by request.
        connection.execSql(request)
    })
};
module.exports.select = select;



// PATCH REQ - for update user function
function updateUser(payload){
    return new Promise((resolve, reject) => {
        const sql = `UPDATE [user]
        SET password = @password, firstName = @firstName, lastName = @lastName, dob = @dob, gender = @gender, description = @description, ageMin = @ageMin, ageMax = @ageMax, genderPref = @genderPref
        WHERE email = @email;`

        console.log("Sending SQL query to DB");
        const request = new Request(sql, (err) => {
            if (err){
                reject(err)
                console.log(err)
            }
        });

        console.log("Testing the params now");
        request.addParameter('email', TYPES.VarChar, payload.email)
        request.addParameter('password', TYPES.VarChar, payload.password)
        request.addParameter('firstName', TYPES.VarChar, payload.firstName)
        request.addParameter('lastName', TYPES.VarChar, payload.lastName)
        request.addParameter('dob', TYPES.Date, payload.dob)
        request.addParameter('gender', TYPES.VarChar, payload.gender)
        request.addParameter('description', TYPES.VarChar, payload.description)
        request.addParameter('ageMin', TYPES.Int, payload.ageMin)
        request.addParameter('ageMax', TYPES.Int, payload.ageMax)
        request.addParameter('genderPref', TYPES.Int, payload.genderPref)
       
        console.log("Checking if the parameters exist " + payload.email);

        request.on('requestCompleted', (row) => {
            console.log('User updated', row);
            resolve('user updated', row)
        });
        connection.execSql(request)

    });
};
module.exports.updateUser = updateUser;

// DELETE REQ - for delete user function
function deleteUser(email){
    return new Promise((resolve, reject) => {
        const sql =`BEGIN TRANSACTION;
        DELETE FROM match
        WHERE userID1 = (SELECT id FROM [user] WHERE [user].email = @email) OR userID2 = (SELECT id FROM [user] WHERE [user].email = @email);
        DELETE FROM userEdge
        WHERE userID1 = (SELECT id FROM [user] WHERE [user].email = @email) OR userID2 = (SELECT id FROM [user] WHERE [user].email = @email);
        DELETE FROM userInterest
        WHERE userID = (SELECT id FROM [user] WHERE [user].email = @email);
        DELETE FROM [user]
        WHERE id = (SELECT id FROM [user] WHERE [user].email = @email);
COMMIT TRANSACTION;`;   

        
        console.log("Sending SQL query to DB");
        const request = new Request(sql, (err) => {
            if (err){
                reject(err)
                console.log(err)
            }
        });

        console.log("Testing the params now");
        request.addParameter('email', TYPES.VarChar, email)
       
       
        console.log("Checking if the parameters exist " + email);

        request.on('requestCompleted', (row) => {
            console.log('User deleted', row);
            resolve('user deleted')
        });
        connection.execSql(request)

    });
}
module.exports.deleteUser = deleteUser;