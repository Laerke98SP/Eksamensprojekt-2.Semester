const db = require('../shared/db');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    try {
        await db.startDb(); //start db connection
    } catch (error) {
        console.log("Error connecting to the database", error.message);
    }
    switch (req.method) {
        case 'GET':
            await get(context, req);
            break;
        default:
            context.res = {
                body: "Please get"
            };
            break;
    };
};


async function get(context, req){
    try{
        let email = req.query.email;
        let userData = await db.selectUser(email);

        let user = {
            'email': userData[1].value,
            'password': userData[2].value,
            'firstName': userData[3].value,
            'lastName': userData[4].value,
            'dob': userData[5].value,
            'gender': userData[6].value,
            'description': userData[7].value,
            'ageMin': userData[8].value,
            'ageMax': userData[9].value,
            'genderPref': userData[10].value
        }
        
        context.res = {
            body: user
        };

        // let returnUser = {
        //     email: user.email
        // }
        // context.res.json(returnUser)

    } catch(error){
        context.res = {
            status: 400,
            body: `No user - ${error.message}`
        };
    };
};