const db = require('../../Storage/User/dbLike');

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

class User {
    constructor(email, password, firstName, lastName, dob, gender, description, ageMin, ageMax, genderPref){
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = dob;
        this.gender = gender;
        this.description = description;
        this.ageMin = ageMin;
        this.ageMax= ageMax;
        this.genderPref = genderPref;
    }
    showGender(gender) {
        if (gender == 0) {
            return gender = "Female"
        } else if (gender == 1) {
            return gender = "Male"
        };
    };
    showGenderPref(genderPref) {
        if (genderPref == 0) {
            return genderPref = "Female"
        } else if (genderPref == 1) {
            return genderPref = "Male"
        };
    };
    calculateAge(dob) {
        var age = new Date(dob);
        var diffMS = Date.now() - age.getTime(); //d.d. minus 'age', dsv. differencen udregnes gemmes som ny variabel
        var ageDate = new Date(diffMS); //udregningen af differencen mellem d.d. og 'age' gemmes som ny dato
            return dob = Math.abs(ageDate.getUTCFullYear() - 1970); // getUTCFullYear = omregner til et helt år minus 1970
    }; //ovenstående metode udregner objekternes alder ud fra attributterne 'birthYear', 'birthMonth' og birthDate.
}; 

let profile = new User();

// Show potential matches
async function get(context, req){
    
    try{
        let email = req.query.email;
    
        let users = await db.selectAll(email)

       
        let getUser = new User( 
            users[1].value,  
            users[2].value,  
            users[3].value,  
            users[4].value,  
            profile.calculateAge(users[5].value),  
            profile.showGender(users[6].value),
            users[7].value,  
            users[8].value,  
            users[9].value,  
            profile.showGenderPref(users[10].value)
        );
        console.log(getUser)

        // console.log(users[1].value)
        // console.log(users)
        
        context.res = {
            body: getUser
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
        await db.userVote(payload)
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
