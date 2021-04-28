
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
            };
        })
        connection.connect();
    })
}

module.exports.sqlConnection = connection;
module.exports.startDb = startDb;

function selectAll(email){
    console.log("checking if first line in DB function works")
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM [user] WHERE email != @email';
        console.log("Now we have ran sql query for potential matches")
        const request = new Request(sql, (err, rowcount) => {
            if(rowcount == 0) {
                reject(
                    {message: 'There are no users to get'}  
                )
            }
            else if (err){
                reject(err)
                console.log(err + " error comming from db.js")
            } 
            else {
                console.log(" everything went fine in db.js " + rowcount);
            }
        });
        // column name, data type, paramname
        request.addParameter('email', TYPES.VarChar, email)
        
        //A row resulting from execution of the SQL statement.
        // column consist of meta data and value        
        request.on('row', (columns) => {
            // test in console
            let result = "";
            let count = 1;
            for( i of columns){
                result += i.value;
                count++;
                if(result == ""){
                    console.log("no info")
                } 
                // count++
                 
            }; console.log({result});
        
            resolve({result})
            // for( i of columns){
            //     console.log(i.value);
                
            // }resolve(i.value + 'another test');
           
            // resolving columns for API
            //console.log({columns})
            //resolve({columns});


            

           // Måske prøv at lave en klasse aleX den kan sende som json til front end
        });
        console.log(request)
        //Execute the SQL represented by request.
        connection.execSql(request) // A Request Object represent the request
    });
};
module.exports.selectAll = selectAll;


function userVote(payload){
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO userEdge (userID2, userID1, vote) VALUES (@userID2, @userID1, @vote);`

        
        console.log("Sending SQL query to DB");
        const request = new Request(sql, (err) => {
            if (err){
                reject(err)
                console.log(err)
            }
        });

        console.log("Testing the params now");
        request.addParameter('userID2', TYPES.Int, payload.userID2)
        request.addParameter('userID1', TYPES.Int, payload.userID1)
        request.addParameter('vote', TYPES.Int, payload.vote)
  
       
        console.log("Checking if the parameters exist " + payload.userID2);

        request.on('requestCompleted', (row) => {
            console.log('User inserted', row);
            resolve('user inserted', row)
        });
        connection.execSql(request)

    });
}
module.exports.userVote = userVote;