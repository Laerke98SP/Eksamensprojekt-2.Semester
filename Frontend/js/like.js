

// ---------------- DEFINING BUTTONS ------------------- //
const like = document.getElementById("like");
const dislike = document.getElementById("dislike");

// ---------- SHOW DIV CONTAINERS FOR INNERHTML -------- //
const seeUsers = document.getElementById("likes")
const seeMatch = document.getElementById("Seematch");
const users = document.getElementsByClassName("notification");

let email = localStorage.getItem('mail');


fetch(`http://localhost:7071/api/like?email=${email}`)
.then(function(response){
    return response.json(); // returnere et promise
})
.then(function(data){ 
    console.log(data);
    users.innerHTML += data;
    //displayPotentialMatch(data); //Kunne Kalde funktionen displayData, med parametrene: storage( alle brugerne i DB & 0 der bruges som counter)
    //checkIfMatch(data); // kalder funktionen check om de matcher  
    
})
.catch(function(err){
    //Hvis der opstår en fejl fanges den her
    console.log(err);
}).finally((data) => {
    //displayMatch(data); // viser antal matches skal vises uanset om der er fejl eller ikke / ved fejl viser den blot 0 matches
});

function displayPotentialMatch(data){
   
        // table.innerHTML += 
        //     "<tr><td>" + data[1].value+ 
        //     "</td><td>" + data[2].value+ 
        //     "</td><td>" + data[3].value +
        //     "</td><td>" + data[4].value + 
        //     "</td><td>" + data[5].value +
        //     "</td><td>" + data[6].value +
        //     "</td></tr>";
        users.innerHTML += data;

        // description.innerHTML += data[7].value;
        
        // info.innerHTML +=
        //     "<tr><td>" + data[8].value +
        //     "</td><td>" + data[9].value +
        //     "</td><td>" + data[10].value +
        //     "</td></tr>";
        // console.log(Object.values(data));
    
};

like.addEventListener('click', function(){
    displayPotentialMatch();
   //userVote();
})

function userVote(){
        // ---------------- INPUT FOR FETCH REQUEST ----------//
        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset-UTF-8'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                firstName: firstName,
                lastName:lastName,
                dob: dob,
                gender: gender,
                description: description,
                ageMin: ageMin,
                ageMax: ageMax,
                genderPref: genderPref
            })
        };
        fetch("http://localhost:7071/api/users", option)   
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
    


// function displayMatch(data){
//     console.log("skal vise antal match")
// }
