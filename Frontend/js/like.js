

// ---------------- DEFINING BUTTONS ------------------- //
const like = document.getElementById("like");
const dislike = document.getElementById("dislike");

// ---------- SHOW DIV CONTAINERS FOR INNERHTML -------- //
const table = document.getElementById("table")
const username = document.getElementById("username")
const password = document.getElementById("password")
const firstname = document.getElementById("firstname")
const lastname = document.getElementById("lastname")
const age = document.getElementById("age")
const gender = document.getElementById("gender")
const minage = document.getElementById("minage")
const maxage = document.getElementById("maxage")
const pref = document.getElementById("pref")
const descr = document.getElementById("description");
const info = document.getElementById("info");

// ----------------- The logged in users mail -----------//
let email = localStorage.getItem('mail');


function showPotentials(){
    // retrieving one user at the time // IT DOESNT CHANGE USER
    fetch(`http://localhost:7071/api/like?email=${email}`)
    .then(function(response){

        if(response.status ==  404){
            alert('There are no more users')
        } 

    return response.json(); // returnere et promise
    })
    .then(function(data){ 
        console.log(data);
        
        
        displayPotentialMatch(data); //Kunne Kalde funktionen displayData, med parametrene: storage( alle brugerne i DB & 0 der bruges som counter)
        //checkIfMatch(data); // kalder funktionen check om de matcher  
    
    })
        .catch(function(err){
        //Hvis der opstår en fejl fanges den her
        
        console.log(err);
    }).finally((data) => {
    //displayMatch(data); // viser antal matches skal vises uanset om der er fejl eller ikke / ved fejl viser den blot 0 matches
    });
};

function displayPotentialMatch(data){
        

        username.innerHTML = data[1].value 
        password.innerHTML = data[2].value 
        firstname.innerHTML = data[3].value 
        lastname.innerHTML = data[4].value  
        age.innerHTML = data[5].value 
        gender.innerHTML = data[6].value 
        
        localStorage.setItem('votedOn', data[1].value);

        descr.innerHTML = data[7].value;
    
        minage.innerHTML = data[8].value 
        maxage.innerHTML = data[9].value 
        pref.innerHTML = data[10].value       
};




like.addEventListener('click', function(){
    let votedOn = localStorage.getItem('votedOn');
    let voter = localStorage.getItem('mail');
    let vote = 1;
   userVote(votedOn, voter, vote);
   fetch(`http://localhost:7071/api/like?email=${email}`)
    .then(function(response){
        return response.json(); // returnere et promise
    })
    .then(function(data){ 
        console.log(data);
        //users.innerHTML += data;
        displayPotentialMatch(data); //Kunne Kalde funktionen displayData, med parametrene: storage( alle brugerne i DB & 0 der bruges som counter)
        //checkIfMatch(data); // kalder funktionen check om de matcher  
    })
    .catch(function(err){
        //Hvis der opstår en fejl fanges den her
        console.log(err);
    }).finally((data) => {
       
    });
})

dislike.addEventListener('click', function(){
    let votedOn = localStorage.getItem('votedOn');
    let voter = localStorage.getItem('mail');
    let vote = 0;
   userVote(votedOn, voter, vote);
   fetch(`http://localhost:7071/api/like?email=${email}`)
    .then(function(response){
        return response.json(); // returnere et promise
    })
    .then(function(data){ 
        console.log(data);
        //users.innerHTML += data;
        displayPotentialMatch(data); //Kunne Kalde funktionen displayData, med parametrene: storage( alle brugerne i DB & 0 der bruges som counter)
        //checkIfMatch(data); // kalder funktionen check om de matcher  
    })
    .catch(function(err){
        //Hvis der opstår en fejl fanges den her
        console.log(err);
    }).finally((data) => {
       
    });
})

function userVote(votedOn, voter, vote){
        // ---------------- INPUT FOR FETCH REQUEST ----------//
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
                // MISSING SOME IF ELSE STATEMENT TO CHECK FOR DIFFERENT ERRORS //
                console.log("process Succeeded")
                console.log(data)
                console.log("you have voted");
            
        
        }).catch((err) =>{
            console.log(err)
            console.log("Something went wroooong")
        })
    };


    

