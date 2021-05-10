//test API by running server, splitting terminal, accessing the test-folder and running "npm test"
const request = require('request'); //module making it possible to make requests from the commandline
const expect = require('chai').expect; //importing expect from the chai test-library. Is used for comparing test result with expected output
const testURL = 'http://localhost:7071/api'; //API URL
const chai = require('chai');

//testing GET-request on user endpoint
describe("GET-request to db", function() {
    it("Shows Jacob's user details", function(done) {
        //testing GET-request on user endpoint (used for login)
        request.get({ url: testURL + '/user?email=jacobrindsig@hotmail.com&password=1234'},
            function(error, response, body) {
                var user = JSON.parse(body); //saves body
                var status = JSON.parse(response.statusCode) //saves response status code
                console.log(user)
                console.log(status)
                expect(status).to.equal(200);
                expect(user.firstName).to.equal("Jacob"); 
                expect(user.lastName).to.equal("Rindsig");
                expect(user.description).to.equal("Jeg er høj"); 
                expect(user.password).to.equal("1234"); 
                expect(user.email).to.equal("jacobrindsig@hotmail.com"); 
                expect(user.dob).to.equal(24); 
                expect(user.gender).to.equal("Male");
                expect(user.ageMin).to.equal(22); 
                expect(user.ageMax).to.equal(25); 
                expect(user.genderPref).to.equal("Female"); 
                done();
            }
        );
    });
});

//testing DELETE-request on match endpoint
describe("DELETE-request to db", function(){
    it("Deletes profile", function(done){
        request.delete({url: testURL + '/match?email=emilie@l.dk'},
            function(error, response, body){
                    var user = JSON.parse(body);
                    var status = JSON.parse(response.statusCode)     
                    expect(user).to.deep.equal( {status: 'succes'} );
                    expect(status).to.equal(200);
                    done();
            });
    });
});