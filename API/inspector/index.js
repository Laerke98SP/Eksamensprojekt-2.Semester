const db = require('../Storage/dbInspector.js');

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
        // case 'POST':
        //     await post(context, req);
        //     break
        default:
            context.res = {
                body: "Please get or post"
            };
            break
    }
}

async function get(context, req){
    try{
        let email = req.query.email;
        let password = req.query.password;
        console.log(email);
        console.log(password);
        let admin = await db.selectAdmin(email, password)
        console.log("Executed to line 31 in azure function")

        context.res = {
            body: admin
        };
        console.log("also send the context to client side")
    } catch(error){
        context.res = {
            status: 404,
            body: `No admin - ${error.message}`
        }
    } 
}

// async function post(context, req){
//     try{
//         let payload = req.body;
//         await db.insert(payload)
//         context.res = {
//             status: 200,
//             body: {
//                 status: 'Success'
//             }
//         }
//     } catch(error){
//         context.res = {
//             status: 400,
//             body: error.message
//         }
//     }
// }

