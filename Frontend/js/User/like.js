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
//const minAge = document.getElementById("minAge")
//const maxAge = document.getElementById("maxAge")
//const genderPref = document.getElementById("genderPref")
const description = document.getElementById("description");
const match = document.getElementById("match");

// ----------------- The logged in users mail -----------//
let userEmail = localStorage.getItem('email');

// ----------- functions for presenting user data --------- //


function showPotentials(){
    // retrieving one user at the time // IT DOESNT CHANGE USER
    fetch(`http://localhost:7071/api/like?email=${userEmail}`)
    .then(function(response){
        if(response.status == 404){
            alert('There are no more users');
        };
    return response.json(); // returnere et promise
    }).then(function(data){ 
        console.log(data);
        displayPotentialMatch(data); //Kunne Kalde funktionen displayData, med parametrene: storage( alle brugerne i DB & 0 der bruges som counter)
        //checkIfMatch(data); // kalder funktionen check om de matcher  
    }).catch(function(err){
        //Hvis der opstår en fejl fanges den her
        console.log(err);
    //displayMatch(data); // viser antal matches skal vises uanset om der er fejl eller ikke / ved fejl viser den blot 0 matches
    });
};

function displayPotentialMatch(data){
        email.innerHTML = data.email 
        //password.innerHTML = data.password
        firstName.innerHTML = data.firstName 
        lastName.innerHTML = data.lastName   
        dob.innerHTML = data.dob
        gender.innerHTML = data.gender
        localStorage.setItem('votedOn', data.email);
        description.innerHTML = data.description;
        //minAge.innerHTML = data.ageMin; 
        //maxAge.innerHTML = data.ageMax;
        //genderPref.innerHTML = data.genderPref;
        usersInterest(data.email);
};

like.addEventListener('click', function(){
    fetch(`http://localhost:7071/api/like?email=${userEmail}`)
    .then((response) => {
        return response.json(); // returnere et promise
    }).then((data) => { 
        //users.innerHTML += data;
        var votedOn = localStorage.getItem('votedOn');
        var voter = localStorage.getItem('email');
        var vote = 1;
        return userVote(votedOn, voter, vote); 
        //checkIfMatch(data); // kalder funktionen check om de matcher  
    }).catch((err) => {
        //Hvis der opstår en fejl fanges den her
        console.log(err);
    });
});

dislike.addEventListener('click', function(){
     // currently only working while debugging?
    fetch(`http://localhost:7071/api/like?email=${userEmail}`)
    .then((response) => {
        return response.json(); // returnere et promise
    }).then((data) => {
        //users.innerHTML += data;
        var votedOn = localStorage.getItem('votedOn');
        var voter = localStorage.getItem('email');
        var vote = 0;
        return userVote(votedOn, voter, vote);
        //checkIfMatch(data); // kalder funktionen check om de matcher  
    }).catch((err) => {
        //Hvis der opstår en fejl fanges den her
        console.log(err);
    });
});

function userVote(votedOn, voter, vote){
    // ---------------- INPUT FOR FETCH REQUEST ----------//
    console.log(votedOn, voter, vote);
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
        console.log(response);
        return response.json()
    })
    .then((data) => {
            // MISSING SOME IF ELSE STATEMENT TO CHECK FOR DIFFERENT ERRORS //
            console.log("Process succeeded");
            console.log(data);
            console.log("You have voted");
            location.reload();
    }).catch((err) => {
        console.log(err)
        console.log("Something went wroooong")
    });
};

function usersInterest(email){
    fetch(`http://localhost:7071/api/interest?email=${userEmail}`)
    .then(function(response){
        // ----------- IF 200 RESPONSE CODE IT SUCCEEDED ---------------------//
        response.json().then(function (data) {
            let user1 = [];
            for(i = 0; i < data.length; i++){
                user1.push(data[i][0].value)
            };
        return matchInterest(email, user1);
        }).catch(function (err){
            console.log(err + " Testing err");
        });
    }); 
};

function matchInterest(email, user1){
    fetch(`http://localhost:7071/api/interest?email=${email}`)
    .then(function(response){
        // ----------- IF 200 RESPONSE CODE IT SUCCEEDED ---------------------//
        response.json().then(function (data) {
            let user2 = [];
            for(i = 0; i < data.length; i++){
                user2.push(data[i][0].value)
            };
        return matching(user1, user2);
        }).catch(function (err){
            console.log(err + " Testing err");
        });
    }); 
};

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

        console.log(user1)
        console.log(user2)

        // Tilføjer bruger1 interesser
        for( i = 0; i< user1.length; i++){
            vote.addToInterest(user1[i]);
        }
        console.log(vote.interest)

        // console.log(vote.checkifMatch(user3))
        // Checker bruger 2 interesser mod bruger 1
        for(i =0; i<user2.length; i++){
            vote.checkifMatch(user2[i]);
        }

        match.innerHTML = "You are matching on " + vote.result + " interests" ;

};