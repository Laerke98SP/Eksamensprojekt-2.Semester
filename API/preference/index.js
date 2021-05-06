const db = require('../../Storage/User/dbPreference');

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
        let ageMin = req.query.ageMin;
        let ageMax = req.query.ageMax;
        let genderPref = req.query.genderPref;
        
        let users = await db.potential(ageMin, ageMax, genderPref);
        console.log(users);
        context.res = {
            body: users
        };

    } catch(error){
        context.res = {
            status: 404,
            body: `No user - ${error.message}`
        }
    } 
}




