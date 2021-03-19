const { v4: uuidv4 } = require('uuid');
const Profile = require('../Classes/Profile')

// var id = uuidv4(): how to call it


let data = []


const getProfiles = ( req, res ) => {
    // do we need this?
    res.send(data)
}

const getProfile = ( req, res ) => {
    const { id } = req.params;

    for (i in data){
        if (data[i].id = id){
            let userProfile = Profile(data[i].id, data[i].mail, data[i].password, data[i].firstName, data[i].lastName, data[i].dob, data[i].gender, data[i].description, data[i].interest)
            // userProfile.calculageAge()
            res.send(userProfile)
        }
    }
}

const postProfile = ( req, res ) => {
    const { profileInfo } = req.body;
    let id = uuidv4();

    let usersProfile = { ...id, profileInfo }

    //let usersProfile = Profile(id, profileInfo.mail, profileInfo.password, profileInfo.firstName, profileInfo.lastName, profileInfo.dob, profileInfo.gender, profileInfo.description, profileInfo.interest);
    // is it nessecary to create the class here, or should it only be done when getting the user

    data.push(usersProfile);
    res.send(id);
}

const updateProfile = ( req, res ) => {

}

const deleteProfile = ( req, res ) => {

}