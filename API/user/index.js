const db = require('../../Storage/User/dbUser');
const { User } = require('../Classes/User');

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
        case 'PATCH':
            await patch(context, req);
            break;
        case 'DELETE':
            await deleteUser(context, req);
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
        let password = req.query.password;
        
        let rawUserData = await db.select(email, password)
        


        let user = new User(rawUserData[1].value, rawUserData[2].value, rawUserData[3].value, rawUserData[4].value, rawUserData[5].value,  
            rawUserData[6].value, rawUserData[7].value, rawUserData[8].value, rawUserData[9].value, rawUserData[10].value);
        user.calculateAge()
        user.showGender()
        user.showGenderPref()
        
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

// Create user function
async function post(context, req){
    try{
        let rawUserData = req.body;

        let userData = new User(rawUserData.email, rawUserData.password, rawUserData.firstName, rawUserData.lastName, rawUserData.dob , 
            rawUserData.gender, rawUserData.description, rawUserData.ageMin, rawUserData.ageMax, rawUserData.genderPref)

        await db.insert(userData)

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

// delete user function
async function deleteUser(context, req){
    try{
        let email = req.query.email;
        console.log(email);
        let user = await db.deleteUser(email);
        
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
