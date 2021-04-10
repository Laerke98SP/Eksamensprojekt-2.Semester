const { Connection, Request, TYPES} = require('tedious');
const config = require('./config.json');

var connection = new Connection(config);

function startDb(){
    return new Promise((resolve, reject) => {
        connection.on('connect', (err) => {
            if (err) {
                console.log("Connection failed");
                reject(err);
                throw err;
            } else {
                console.log("Connected");
                resolve();
            }
        })
        connection.connect();
    })
}

module.exports.sqlConnection = connection;
module.exports.startDb = startDb;

function insertUser(payload){
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO [dbo].[user] (email, password, firstName, lastName, dob, gender, description, ageMin, ageMax, genderPref) VALUES (@email, @password, @firstName, @lastName, @dob, @gender, @description, @ageMin, @ageMax, @genderPref)`
        const request = new Request(sql, (err) => {
            if (err){
                reject(err);
                console.log(err);
            }
        });
        request.addParameter('email', TYPES.VarChar, payload.email);
        request.addParameter('password', TYPES.VarChar, payload.password);
        request.addParameter('firstName', TYPES.VarChar, payload.firstName);
        request.addParameter('lastName', TYPES.VarChar, payload.lastName);
        request.addParameter('dob', TYPES.Date, payload.dob);
        request.addParameter('gender', TYPES.VarChar, payload.gender);
        request.addParameter('description', TYPES.VarChar, payload.description);
        request.addParameter('ageMin', TYPES.Int, payload.ageMin);
        request.addParameter('ageMax', TYPES.Int, payload.ageMax);
        request.addParameter('genderPref', TYPES.Int, payload.genderPref);



        request.on('requestCompleted', (row) => {
            console.log('User inserted', row);
            resolve('user inserted', row);
        });
        connection.execSql(request);

    });
}
module.exports.insertUser = insertUser;

function selectUser(email){
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM [user] where email = @email'
        const request = new Request(sql, (err, rowcount) => {
            if (err){
                reject(err);
                console.log(err);
            } else if (rowcount == 0) {
                reject({message: 'User does not exist'});
            }
        });
        request.addParameter('email', TYPES.VarChar, email);
    
        request.on('row', (columns) => {
            resolve(columns);
        });
        connection.execSql(request);
    })

}
module.exports.selectUser = selectUser;