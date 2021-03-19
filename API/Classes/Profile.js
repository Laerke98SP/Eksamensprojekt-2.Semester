const User = require('./User')

module.exports = class Profile extends User{
    constructor(id, mail, password, firstName, lastName, dob, gender, description, interest){
        // Not private since the user should be able to change it (may change to private later)
        super(id, mail, password);
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = dob;
        this.gender = gender;
        this.description = description;
        this.interest = interest;
    }

    viewMatches(){
        
    }

    viewUsers(){
        // Not sure exactly what this should do...
        // Should it just be an API endpoint instead?

    }

    calculateAge(){
        // creating a this.age so we have easy access to it when it gets send to frontpage
        // we do it this way, since in theory the profile can exist in more than a year, maning the predefined age wrong

    }

    getFullName(){
        // creating this.fullName for easier access in the front page

    }

    editProfile(){

    }
}