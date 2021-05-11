const db = require('../../Storage/User/dbInterest');
const { Interest } = require('../Classes/Interest')

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
        case 'POST':
            await post(context, req);
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
        let email = req.query.email;
        
        let rawInterestData = await db.showInterest(email)
       
        context.res = {
            body: rawInterestData
        };

    } catch(error){
        context.res = {
            status: 404,
            body: `No user - ${error.message}`
        }
    } 
}

// Insert User Interest POST
async function post(context, req){
    try{
        let payload = req.body;
        await db.insertInterest(payload)
        context.res = {
            status: 200,
            body: {
                status: 'Success'
            }
        }
    } catch(error){
        context.res = {
            status: 400,
            body: error.message
        }
    }
}


