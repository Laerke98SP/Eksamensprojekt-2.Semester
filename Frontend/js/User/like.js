// ---------------- DEFINING BUTTONS ------------------- //
// const like = document.getElementById("like");
// const dislike = document.getElementById("dislike");

// ---------- SHOW DIV CONTAINERS FOR INNERHTML -------- //
class Preference {
    constructor(){
        this.interest = {};
        this.result = 0;
    }
    addToInterest(interest){ // Hvis interessen er tilføjet gives værdien 1
        this.interest[interest] = 1;
        return this.interest; 
    }
    checkifMatch(arr){ 
        if( this.interest[arr] == 1){ // Hvis interessen eksistere i {}, tilføjes 1 til resultat
        this.result +=1;
        } return this.result;
    }
}
// ----------------- The logged in users mail -----------//
let userEmail = localStorage.getItem('email');


// ----------- functions for presenting user data --------- //

function showPotentials(){
    console.log(userEmail);
    // retrieving one user at the time // IT DOESNT CHANGE USER
    fetch(`http://localhost:7071/api/like?email=${userEmail}`)
    .then(function(response){
        if(response.status == 404){
            alert('There are no more users');
        } else 
        return response.json(); // returnere et promise
    }).then(function(data){ 
        // console.log(data);
        // checkIfMatch()
        return displayPotentialMatch(data);
    }).catch(function(err){
        //Hvis der opstår en fejl fanges den her
        console.log(err);
    });
};

function displayPotentialMatch(data){
    document.getElementById("email").innerHTML = data.email 
    document.getElementById("firstName").innerHTML = data.firstName 
    document.getElementById("lastName").innerHTML = data.lastName 
    document.getElementById("dob").innerHTML = data.age  
    document.getElementById("gender").innerHTML = data.genderWritten
    document.getElementById("desc").innerHTML = data.description;;
       
    localStorage.setItem('votedOn', data.email);

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
    // Hashtabel (o(1) tid)
    vote = new Preference() // invoker en tom klasse

    // Tilføjer bruger1 interesser O(n) tid
    for( i = 0; i< user1.length; i++){
        vote.addToInterest(user1[i]);
    }
      
    // Checker bruger 2 interesser mod bruger 1, O(n) tid
    for(i =0; i<user2.length; i++){
        vote.checkifMatch(user2[i]);
    }

    document.getElementById("match").innerHTML = "You are matching on " + vote.result + " interests" ;
};

function like(){
    var votedOn = localStorage.getItem('votedOn');
    var voter = localStorage.getItem('email');
    var vote = 1;
    return userVote(votedOn, voter, vote); 
};


function dislike(){
    var votedOn = localStorage.getItem('votedOn');
    var voter = localStorage.getItem('email');
    var vote = 0;
    return userVote(votedOn, voter, vote);
};


function userVote(votedOn, voter, vote){
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
        return response.json()
    })
    .then((data) => {            
        showPotentials();
        location.reload();
    }).catch((err) => {
        console.log(err)
        console.log("Something went wroooong")
    });
};