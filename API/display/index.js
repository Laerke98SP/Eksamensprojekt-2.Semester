const db = require('../../Storage/Admin/dbDisplay');
const { User } = require('../Classes/User');


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
        case 'PATCH':
            await patch(context, req);
            break
        case 'DELETE':
            await deleteUser(context, req);
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
        let rawUserData = await db.displayAll()

        context.res = {
            body: rawUserData
        };

    } catch(error){
        context.res = {
            status: 400,
            body: `No users - ${error.message}`
        }
    } 
}


async function deleteUser(context, req){
    try {
        let email = req.query.email;
        await db.admDelete(email);
        context.res = {
            body: {
                status: "succes"
            }
        };
        console.log("also send the context to client side");
    } catch(error){
        context.res = {
            status: 400,
            body: error.message
        }
    } 
}

// Update user function
async function patch(context, req){
    try{
        let payload = req.body;

        // making at user object
        let userData = new User(payload.email, payload.password, payload.firstName, payload.lastName, 
            payload.dob, payload.gender, payload.description, payload.ageMin, payload.ageMax, 
            payload.genderPref);
        
        // making sure the gender related inputs are either 0 or 1
        userData.binaryGender()
        userData.binaryGenderPref()

        // calling the function for updating a user from Storage folder
        await db.updateUser(userData)


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
