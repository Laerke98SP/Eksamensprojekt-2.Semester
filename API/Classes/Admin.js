const User = require('./User')

module.exports = class Admin extends User{
    constructor(id, mail, password){
        super(id, mail, password)
    }

    updateUserProfile(profileId){

    }

    deleteUserProfile(profileId){

    }

    viewUserStats(){

    }
}