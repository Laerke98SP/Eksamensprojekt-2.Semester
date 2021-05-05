// ---------------- DEFINING BUTTONS ------------------- //
const like = document.getElementById("like");
const dislike = document.getElementById("dislike");
const deleteBtn = document.getElementById("delete");

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

// ---------- Notification ----------- //

let note = document.getElementById('notification');

// ----------------- The logged in users mail -----------//
let email = localStorage.getItem('mail');

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
        username.innerHTML = data[1].value 
        password.innerHTML = data[2].value 
        firstname.innerHTML = data[3].value 
        lastname.innerHTML = data[4].value  
        age.innerHTML = data[5].value 
        gender.innerHTML = data[6].value 
        
        //localStorage.setItem('votedOn', data[1].value);

        descr.innerHTML = data[7].value;
    
        minage.innerHTML = data[8].value 
        maxage.innerHTML = data[9].value 
        pref.innerHTML = data[10].value  

}


// ------------- DELETE MATCH ---------- //
deleteBtn.addEventListener('click', function(){
})

function deleteMatch(){
    if(localStorage.getItem('mail')){
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
        
        localStorage.removeItem('mail');

    }
}



