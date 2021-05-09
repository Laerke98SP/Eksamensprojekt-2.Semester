const { Profile } = require('./Profile');

class User extends Profile {
    constructor(email, password, firstName, lastName, dob, gender, description, ageMin, ageMax, genderPref){
        super(email, password);
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = dob;
        this.gender = gender;
        this.description = description;
        this.ageMin = ageMin;
        this.ageMax= ageMax;
        this.genderPref = genderPref;
    }
    showGender() {
        // converting data to readable information
        if (this.gender == 0) {
            this.genderWritten = "Female";
        } else if (this.gender == 1) {
            this.genderWritten = "Male";
        };
    };

    showGenderPref() {
        // converting data to readable information
        if (this.genderPref == 0) {
            this.prefWritten = "Female";
        } else if (this.genderPref == 1) {
            this.prefWritten = "Male";
        };
    };

    calculateAge() {
        let age = new Date(this.dob);
        let diffMS = Date.now() - age.getTime(); //d.d. minus 'age', difference is calculated and saved
        let ageDate = new Date(diffMS); //calculation of difference and birthday
        this.age = Math.abs(ageDate.getUTCFullYear() - 1970); //convertion to whole year
    };

    binaryGenderPref(){
        if (this.genderPref == 'Male'){
            this.genderPref = 1;
        } else if (this.genderPref == 'Female'){
            this.genderPref = 0;
        }
    }

    binaryGender(){
        if (this.gender == 'Male'){
            this.gender = 1;
        } else if (this.gender == 'Female'){
            this.gender = 0;
        }
    }
}; 

module.exports.User = User;