const db = require('../../Storage/Admin/dbStatistics');


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
        default:
            context.res = {
                body: "Please get or post"
            };
            break
    }
};

async function get(context, req){
    try{
        // getting data from storage by calling function from storage folder
        let users = await db.countUsers()

        // making data readable
        let userCounts = users[0].value;

        // sending the data in body
        context.res = {
            body: userCounts
        };
        console.log("also send the context to client side")
    } catch(error){
        context.res = {
            status: 404,
            body: `No admin - ${error.message}`
        }
    } 
}