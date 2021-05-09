const db = require('../../Storage/User/dbLike');
const { User } = require('../Classes/User');
const { Vote } = require('../Classes/Vote');

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
};

// Show potential matches
async function get(context, req){
    try{
        let email = req.query.email;
    
        let rawUserData = await db.selectAll(email)
        
        // creating a user object
        let userData = new User(rawUserData[1].value, rawUserData[2].value, rawUserData[3].value, rawUserData[4].value, 
            rawUserData[5].value, rawUserData[6].value, rawUserData[7].value, rawUserData[8].value, rawUserData[9].value, 
            rawUserData[10].value);
        // calling relevant methods
        userData.calculateAge();
        userData.showGender();
        userData.showGenderPref();
        
        context.res = {
            body: userData
        };
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

        let vote = new Vote(payload.voter, payload.votedOn, payload.vote);

        await db.userVote(vote)
        context.res = {
            status: 200,
            body: {
                status: 'Success'
    
            }
        }
    } catch(error){
        context.res = {
            status: 404,
            body: error.message
        }
    }
}
