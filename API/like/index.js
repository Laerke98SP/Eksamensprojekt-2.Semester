const db = require('../../Storage/dbLike');

// Connection to DB
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.')

    try {
        await db.startDb(); //start db connection
    } catch (error) {
        console.log("Error connecting to the database from like API", error.message)
    }
    switch (req.method) {
        case 'GET': 
            await get(context, req);
            break;
        case 'POST':
            await post(context, req);
            break
        default:
            context.res = {
                body: "Please get or post"
            };
            break
    }
}

// Show potential matches
async function get(context, req){
    console.log("checking if first line in like API function works")
    try{
        let email = req.query.email;
        //console.log(email);
        let users = await db.selectAll(email)
        console.log("Executed to line 32 in azure function")
        console.log(users);
        context.res = {
            body: users 
        };
        //console.log(users + " testing what users are");
        //console.log("also send the context to client side")
    } catch(error){
        context.res = {
            status: 404,
            body: `No users - ${error.message}`
        }
    } 
}


//  Like or dislike User
async function post(context, req){
    try{
        let payload = req.body;
        await db.userVote(payload)
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
