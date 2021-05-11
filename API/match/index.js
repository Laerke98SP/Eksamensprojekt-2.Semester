const db = require('../../Storage/User/dbMatch');


module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.')

    try {
        await db.startDb(); //start db connection
    } catch (error) {
        console.log("Error connecting to the database", error.message)
    }
    switch (req.method) {
        case 'GET': 
            await get(context, req);
            break;
        case 'POST':
            await post(context, req);
            break;
        case 'DELETE':
            await deleteMatches(context, req);
            break;
        default:
            context.res = {
                body: "Please get or post"
            };
            break
    }
};

async function get(context, req){
    try{
        let email = req.query.email;
        console.log(email + " Checking if this user have a match");
        let matches = await db.getMatches(email)
       //console.log(matches);
    
        context.res = {
            body: matches
        };
      
    } catch(error){
        context.res = {
            status: 404,
            body: `No user - ${error.message}`
        }
    } 
}

async function post(context, req){
    try{
        let payload = req.body;
        await db.insertMatch(payload)
        context.res = {
            status: 200,
            body: {
                status: 'Success'
            }
        }
    } catch(error){
        context.res = {
            status: 404,
            body: error.message
        }
    }
}

async function deleteMatches(context, req){
    try {
        let email = req.query.email;
        let match = req.query.match
        let row = await db.deleteMatch(email, match);
        context.res = {
            body: {
                status: "succes"
            }
        }
    } catch(error){

        context.res = {
            status: 400,
            body: error.message
        }
    } 
}