const db = require('../../Storage/Admin/dbInspector');
const { Admin } = require('../Classes/Admin');


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
            await erase(context, req);
            break
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
        let password = req.query.password;

        // creating an admin object
        let adminData = new Admin(email, password)
       
        // inserting adminData object into function from storage folder
        let response = await db.selectAdmin(adminData)

        context.res = {
            body: response
        };
    } catch(error){
        context.res = {
            status: 404,
            body: `No admin - ${error.message}`
        }
    } 
}

async function post(context, req){
    try{
        let adminData = req.body;

        // creating a new admin object
        let admin = new Admin(adminData.email, adminData.password)

        // inserting admin into db by function from storage folder
        await db.insertAdmin(admin)

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

async function erase(context, req){
    // named erase since delete is a reserved word
    try{
        let email = req.query.email;
        await db.deleteAdmin(email)
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

