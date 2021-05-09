const db = require('../../Storage/Admin/dbAdmEdit.js');
const { User } = require('../Classes/User')

// Connection to DB
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.')

    try {
        await db.startDb(); //start db connection
    } catch (error) {
        console.log("Error connecting to the database", error.message )
    }
    switch (req.method) {
        case 'GET':
            await get(context, req);
            break;
        case 'PATCH':
            await patch(context, req);
            break;
        default:
            context.res = {
                body: "Please get or post"
            };
            break
    };
}


// Login function
async function get(context, req){
    try{
        // getting email from request
        let email = req.query.email;    
        // calling function from storage folder to get user from database 
        let rawUserData = await db.select(email);

        // creating an User object
        let userData = new User(rawUserData[1].value, rawUserData[2].value, rawUserData[3].value, rawUserData[4].value, 
            rawUserData[5].value, rawUserData[6].value, rawUserData[7].value, rawUserData[8].value, rawUserData[9].value, 
            rawUserData[10].value);

        // calling methods to get more data
        userData.calculateAge()
        userData.showGender()
        userData.showGenderPref()

        // sending data in body
        context.res = {
            body: userData
        };

    } catch(error){
        context.res = {
            status: 404,
            body: `No user - ${error.message}`
        }
    } 
}