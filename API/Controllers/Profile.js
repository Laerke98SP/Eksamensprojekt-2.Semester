import { v4 as uuidv4 } from 'uuid'
import { Profile } from '../Classes/Profile.js';

// temporary solution untill we get connected with the database
let data = []


export const getProfiles = ( req, res ) => {
    // do we need to send all profiles?
    res.send(data)
}

export const getProfile = ( req, res ) => {
    const { id } = req.params;

    for (let i = 0; i < data.length; i++){
        if (data[i].id = id){
            let userProfile = new Profile(data[i].id, data[i].mail, data[i].password, data[i].firstName, data[i].lastName, data[i].dob, data[i].gender, data[i].description, data[i].interest)
            // when responding, we will call all the methods that is relevant (ex userProfile.calculateAge())
            res.send(userProfile)
            break
        }
    }
}

export const postProfile = ( req, res ) => {
    const profileInfo = req.body;

    const usersProfile = { ...profileInfo, id: uuidv4()}

    //let usersProfile = Profile(id, profileInfo.mail, profileInfo.password, profileInfo.firstName, profileInfo.lastName, profileInfo.dob, profileInfo.gender, profileInfo.description, profileInfo.interest);
    // is it nessecary to create the class here, or should it only be done when getting the user

    data.push(usersProfile);
    res.send(usersProfile.id);
}

export const updateProfile = ( req, res ) => {

}

export const deleteProfile = ( req, res ) => {

}