//test API by running server, splitting terminal, accessing the test-folder and running "npm test"
const request = require('request'); //module making it possible to make requests from the commandline
const expect = require('chai').expect; //importing expect from the chai test-library. Is used for comparing test result with expected output
const testURL = 'http://localhost:7071/api'; //API URL
const chai = require('chai');

//testing GET-request on user endpoint
describe("GET-request to db", function() {
    it("Shows Jacob's first match", function(done) {
        //testing GET-request on user endpoint (used for login)
        request.get({ url: testURL + '/match?email=jacob@test.dk'},
            function(error, response, body) {
                var user = JSON.parse(body); //saves body
                var status = JSON.parse(response.statusCode); //saves response status code
                var email = user[0][1].value;
                var dob = user[0][5].value;
                var fullName = user[0][3].value + " " + user[0][4].value;
                expect(status).to.equal(200);
                expect(email).to.equal("laura@test.dk"); 
                expect(dob).to.deep.equal("1999-05-23T00:00:00.000Z");
                expect(fullName).to.equal("Laura Bøjer"); 
                done();
            }
        );
    });
});


//testing DELETE-request on match endpoint
describe("DELETE-request to db", function(){
    it("Deletes specific match", function(done){
        request.delete({url: testURL + '/match?email=jacob@test.dk&match=laura@test.dk'},
            function(error, response, body){
                    var user = JSON.parse(body);
                    var status = JSON.parse(response.statusCode)     
                    expect(user).to.deep.equal( {status: 'succes'} );
                    expect(status).to.equal(200);
                    done();
            });
    });
});