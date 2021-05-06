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
const minAge = document.getElementById("minAge")
const maxAge = document.getElementById("maxAge")
const genderPref = document.getElementById("genderPref")
const description = document.getElementById("description");

// ----------------- The logged in users mail -----------//
let userEmail = localStorage.getItem('email');

// ----------- functions for presenting user data --------- //

function showGender(gender) {
    if (gender = 0) {
        return gender = "Female"
    } else if (gender = 1) {
        return gender = "Male"
    };
};
function showGenderPref(genderPref) {
    if (genderPref = 0) {
        return genderPref = "Female"
    } else if (genderPref = 1) {
        return genderPref = "Male"
    };
};
function calculateAge(dob) {
    var age = new Date(dob);
    var diffMS = Date.now() - age.getTime(); //d.d. minus 'age', dsv. differencen udregnes gemmes som ny variabel
    var ageDate = new Date(diffMS); //udregningen af differencen mellem d.d. og 'age' gemmes som ny dato
        return dob = Math.abs(ageDate.getUTCFullYear() - 1970); // getUTCFullYear = omregner til et helt år minus 1970
}; //ovenstående metode udregner objekternes alder ud fra attributterne 'birthYear', 'birthMonth' og birthDate.

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
        email.innerHTML = data[1].value
        password.innerHTML = data[2].value 
        firstName.innerHTML = data[3].value 
        lastName.innerHTML = data[4].value  
        dob.innerHTML = calculateAge(data[5].value)
        gender.innerHTML = showGender(data[6].value)
        localStorage.setItem('votedOn', data[1].value);
        description.innerHTML = data[7].value;
        minAge.innerHTML = data[8].value 
        maxAge.innerHTML = data[9].value 
        genderPref.innerHTML = showGenderPref(data[10].value)    
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


    

