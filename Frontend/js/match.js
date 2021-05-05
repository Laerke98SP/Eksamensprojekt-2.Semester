// ---------------- DEFINING BUTTONS ------------------- //
const like = document.getElementById("like");
const dislike = document.getElementById("dislike");
const deleteBtn = document.getElementById("delete");

// ---------- SHOW DIV CONTAINERS FOR INNERHTML -------- //
const table = document.getElementById("table")
const email = document.getElementById("email")
const password = document.getElementById("password")
const firstName = document.getElementById("firstName")
const lastName = document.getElementById("lastName")
const dob = document.getElementById("dob")
const gender = document.getElementById("gender")
const minAge = document.getElementById("minAge")
const maxAge = document.getElementById("manAge")
const genderPref = document.getElementById("genderPref")
const description = document.getElementById("description");

// ---------- Notification ----------- //

let note = document.getElementById('notification');

// ----------------- The logged in users mail -----------//
let email = localStorage.getItem('email');

function checkIfMatch(){
    const option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset-UTF-8'
        },
        body: JSON.stringify({
            email: email
        })
    };

    // Insert match if both user like eachother
    fetch(`http://localhost:7071/api/match`, option)
     .then((response) => {
            
            return response.json()
        })
        .then((data) => {
                // MISSING SOME IF ELSE STATEMENT TO CHECK FOR DIFFERENT ERRORS //
                console.log("process Succeeded")
                console.log(data)
                if( data.status == 'Success' ){
                    note.innerHTML += "You have a new match"
                }
            
        
        }).catch((err) =>{
            console.log(err)
            console.log("Something went wroooong")
        })
}

// ------------ SHOW MATCHES ------------ //
function displayMatch(data){
        email.innerHTML = data[1].value 
        password.innerHTML = data[2].value 
        firstName.innerHTML = data[3].value 
        lastName.innerHTML = data[4].value  
        dob.innerHTML = data[5].value 
        gender.innerHTML = data[6].value 
        
        //localStorage.setItem('votedOn', data[1].value);

        description.innerHTML = data[7].value;
    
        minAge.innerHTML = data[8].value 
        maxAge.innerHTML = data[9].value 
        genderPref.innerHTML = data[10].value  
};

function displayMatches(){
    // Getting email from local storage
    var email = localStorage.getItem("email");
    // Getting the matches inked to the user email
    fetch(`http://localhost:7071/api/match${email}`).then((resp) => resp.json())
    .then(function(match){
        console.log(match)
    });
};

// ------------- DELETE MATCH ---------- //
deleteBtn.addEventListener('click', function(){
})

function deleteMatch(){
    if(localStorage.getItem('email')){
        const option = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(user)
        };    
           
           
        fetch(`http://localhost:7071/api/match?email=${mail}`, option)
        .then(function() {
            console.log("ok"); 
            displayMatch(data);
        }).catch(function() {
            console.log("error"); 
        });
        
        localStorage.removeItem('email');
    };
};



