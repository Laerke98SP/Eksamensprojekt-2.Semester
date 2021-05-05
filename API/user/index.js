const db = require('../../Storage/User/dbUser');

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
    try {
        let email = req.query.email;
        let password = req.query.password;
        let user = await db.select(email, password);
        context.res = {
            body: user
        };
    } catch(error){
        context.res = {
            status: 404,
            body: `No user - ${error.message}`
        };
    };
};

// Create user function
async function post(context, req){
    try {
        let payload = req.body;
        await db.insert(payload);
        context.res = {
            status: 200,
            body: {
                status: 'Success'
            }
        };
    } catch(error){
        context.res = {
            status: 400,
            body: error.message
        };
    };
};


// Update user function
async function patch(context, req){
    try {
        let payload = req.body;
        await db.updateUser(payload)
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
