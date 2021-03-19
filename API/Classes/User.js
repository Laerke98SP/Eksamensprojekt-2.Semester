
module.exports = class User{
    constructor(id, mail, password){
        this._id = id;
        this._mail = mail;
        this._password = password;
    }

    createProfile(){

    }

    deleteProfile(){

    }

    login(){

    }

    logout(){

    }

    get id(){
        return this._id;
    }

    get mail(){
        return this._mail;
    }

    get password(){
        return this._password;
    }
}