// ---------------- DEFINING BUTTONS ------------------- //
const like = document.getElementById("like");
const dislike = document.getElementById("dislike");

// ---------- SHOW DIV CONTAINERS FOR INNERHTML -------- //
const table = document.getElementById("table")
const email = document.getElementById("email")
const password = document.getElementById("password")
const firstName = document.getElementById("firstName")
const lastName = document.getElementById("lastName")
const dob = document.getElementById("dob")
const gender = document.getElementById("gender")
const description = document.getElementById("description");
const match = document.getElementById("match");

// ----------------- The logged in users mail -----------//
let userEmail = localStorage.getItem('email');
// let ageMin = localStorage.getItem('ageMin');
// let ageMax = localStorage.getItem('ageMax');
// let genderPref = localStorage.getItem('genderPref');

// if( genderPref == 'Female'){
//     genderPref = 0;
// } else genderPref = 1;





// ----------- functions for presenting user data --------- //

function showPotentials(){
    console.log(userEmail);
    // retrieving one user at the time // IT DOESNT CHANGE USER
    fetch(`http://localhost:7071/api/like?email=${userEmail}`)
    .then(function(response){
        if(response.status == 404){
            alert('There are no more users - come back later!');
        } else 
        return response.json(); // returnere et promise
    }).then(function(data){ 
        // console.log(data);
        checkIfMatch()
        return displayPotentialMatch(data);
      
    }).catch(function(err){
        //Hvis der opstår en fejl fanges den her
        console.log(err);
    });
};

function displayPotentialMatch(data){
        email.innerHTML = data.email 
        firstName.innerHTML = data.firstName 
        lastName.innerHTML = data.lastName   
        dob.innerHTML = data.dob
        gender.innerHTML = data.gender
        localStorage.setItem('votedOn', data.email);
        description.innerHTML = data.description;
        usersInterest(data.email);
};


// Retrieving potentiel match interests
function usersInterest(email){
    fetch(`http://localhost:7071/api/interest?email=${userEmail}`)
    .then(function(response){
        // ----------- IF 200 RESPONSE CODE IT SUCCEEDED ---------------------//
        response.json().then(function (data) {
            let user1 = [];
            for(i = 0; i < data.length; i++){
                user1.push(data[i][0].value)
            };
            // console.log(email);
        return matchInterest(email, user1);
        }).catch(function (err){
            console.log(err + " Testing err");
        });
    }); 
};


// Retrieving the logged in users interest
function matchInterest(email, user1){
    fetch(`http://localhost:7071/api/interest?email=${email}`)
    .then(function(response){
        // ----------- IF 200 RESPONSE CODE IT SUCCEEDED ---------------------//
        response.json().then(function (data) {
            let user2 = [];
            for(i = 0; i < data.length; i++){
                user2.push(data[i][0].value)
            };
            // console.log(email)
        return matching(user1, user2);
        }).catch(function (err){
            console.log(err + " Testing err");
        });
    }); 
};

// Matching algorithm
function matching( user1, user2){
 // EXAMPLE OF VOTING (o(1) tid)
        // Check om personen allerede har stemt, hvis ikke skriv dem op som stemt.
        class Preference {
            constructor(){
                this.interest = {};
                this.result = 0;
            }
            addToInterest(interest){
                this.interest[interest] = 1;
                return this.interest; 
            }
            checkifMatch(arr){
                if( this.interest[arr] == 1){ // henter ledger og sætter navn = 1, så den eksistere inde i vores hashmap
                this.result +=1;
                } return this.result;
            }
        }
        vote = new Preference()

        // console.log(user1)
        // console.log(user2)

        // Tilføjer bruger1 interesser
        for( i = 0; i< user1.length; i++){
            vote.addToInterest(user1[i]);
        }
        // console.log(vote.interest)

        // console.log(vote.checkifMatch(user3))
        // Checker bruger 2 interesser mod bruger 1
        for(i =0; i<user2.length; i++){
            vote.checkifMatch(user2[i]);
        }

        match.innerHTML = "You are matching on " + vote.result + " interests" ;

};

like.addEventListener('click', function(){

        var votedOn = localStorage.getItem('votedOn');
        var voter = localStorage.getItem('email');
        var vote = 1;
        return userVote(votedOn, voter, vote); 

    //     // retrieving one user at the time // IT DOESNT CHANGE USER
    // fetch(`http://localhost:7071/api/like?email=${userEmail}&ageMin=${ageMin}&ageMax=${ageMax}&genderPref=${genderPref}`)
    // .then((response) => {
    //     return response.json(); // returnere et promise
    // }).then((data) => { 
    //     var votedOn = localStorage.getItem('votedOn');
    //     var voter = localStorage.getItem('email');
    //     var vote = 1;
    //     return userVote(votedOn, voter, vote); 
  
    // }).catch((err) => {
    //     //Hvis der opstår en fejl fanges den her
    //     console.log(err);
    // });
});

dislike.addEventListener('click', function(){
 
    // fetch(`http://localhost:7071/api/like?email=${userEmail}&ageMin=${ageMin}&ageMax=${ageMax}&genderPref=${genderPref}`)
    // .then((response) => {
    //     return response.json(); // returnere et promise
    // }).then((data) => {

        var votedOn = localStorage.getItem('votedOn');
        var voter = localStorage.getItem('email');
        var vote = 0;
        return userVote(votedOn, voter, vote);
    
    // }).catch((err) => {
    //     //Hvis der opstår en fejl fanges den her
    //     console.log(err);
    // });
});

function userVote(votedOn, voter, vote){
    // ---------------- INPUT FOR FETCH REQUEST ----------//
    // console.log(votedOn, voter, vote);
    const option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset-UTF-8'
        },
        body: JSON.stringify({
            votedOn: votedOn,
            voter: voter,
            vote: vote
        })
    };
    fetch("http://localhost:7071/api/like", option)   
    .then((response) => {
        // console.log(response);
        return response.json()
    })
    .then((data) => {
            // MISSING SOME IF ELSE STATEMENT TO CHECK FOR DIFFERENT ERRORS //
            // console.log("Process succeeded");
            // console.log(data);
            // console.log("You have voted");
            
            showPotentials();
            location.reload();
    }).catch((err) => {
        console.log(err)
        console.log("Something went wroooong")
    });
};


function checkIfMatch(){
    const option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset-UTF-8'
        },
        body: JSON.stringify({
            email: userEmail
        })
    };
    // Insert match if both user like eachother
    fetch(`http://localhost:7071/api/match`, option)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
    // MISSING SOME IF ELSE STATEMENT TO CHECK FOR DIFFERENT ERRORS //
        console.log("Process succeeded")
        console.log(data)
        if( data.status == 'Success' ){
           
            message();
        };
    }).catch((err) =>{
        console.log(err)
        console.log("Something went wroooong")
    });
};


function message(){
    let result = 0;
    // document.getElementById("badge").style.display = "block"; // uncover
    
     // Getting the matches inked to the user email
     fetch(`http://localhost:7071/api/match?email=${userEmail}`)
        .then(function(response) {
            return response.json();
        }).then(function(matches) {
            if(localStorage.getItem("counter") !== null){
                var counter = localStorage.getItem("counter");
            } else var counter = 0;
            // console.log(matches);
            //Creating a forloop that iterates through matches
            for (i in matches) {
                result++;
            }; 
            if(result > counter) {
                // console.log(counter)
                document.getElementById("badge").style.display = "block"; // Element will  be displayed
                counter = result;
                localStorage.setItem('counter', counter)
                //console.log(counter + " if there are more in match than counter")
            } else if(result <= counter) {
                document.getElementById("badge").style.display = "none"; // Element will not be displayed
                //console.log(result + " + " + counter); 
                counter = result;
                localStorage.setItem('counter', counter)
               // console.log(counter + " if there are less in match than counter")
            }
        });
    };
