import { User } from './User.js';

export class Admin extends User{
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