const db = require('../../Storage/Admin/dbAdmEdit.js');

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
        let email = req.query.email;
    
        
        let user = await db.select(email )
        


        
        context.res = {
            body: user
        };

    } catch(error){
        context.res = {
            status: 404,
            body: `No user - ${error.message}`
        }
    } 
}