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


// Login function
async function get(context, req){
    try{
        let email = req.query.email;
        let password = req.query.password;
        
        let user = await db.select(email, password)
        


        let getUser = new User( 
            user[1].value,  
            user[2].value,  
            user[3].value,  
            user[4].value,  
            profile.calculateAge(user[5].value),  
            profile.showGender(user[6].value),
            user[7].value,  
            user[8].value,  
            user[9].value,  
            profile.showGenderPref(user[10].value)
        );

        console.log(getUser);
        
        context.res = {
            body: getUser
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
        let payload = req.body;
        await db.insert(payload)
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
