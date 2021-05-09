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
        // using function from storage folder
        let matches = await db.countMatches()

        // making data readable
        let matchCount = matches[0].value

        // sending data in body
        context.res = {
            body: matchCount
        };
        console.log("also send the context to client side")
    } catch(error){
        context.res = {
            status: 404,
            body: `No admin - ${error.message}`
        }
    } 
}