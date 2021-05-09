const { Profile } = require('./Profile');


class Admin extends Profile{
    constructor(email, password){
        super(email, password);
    }
}

module.exports.Admin = Admin;