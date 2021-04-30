

// ---------------- DEFINING BUTTONS ------------------- //
const like = document.getElementById("like");
const dislike = document.getElementById("dislike");

// ---------- SHOW DIV CONTAINERS FOR INNERHTML -------- //
const table = document.getElementById("table")
const descr = document.getElementById("description");
const info = document.getElementById("info");

// ----------------- The logged in users mail -----------//
let email = localStorage.getItem('mail');


<<<<<<< HEAD
// retrieving one user at the time // IT DOESNT CHANGE USER
=======
>>>>>>> 386d370f8b8ee2e2e824b490e03db4648a2091fe
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
    //displayMatch(data); // viser antal matches skal vises uanset om der er fejl eller ikke / ved fejl viser den blot 0 matches
});

function displayPotentialMatch(data){
        
        table.innerHTML += 
            "<tr><td>" + data[1].value+ 
            "</td><td>" + data[2].value+ 
            "</td><td>" + data[3].value +
            "</td><td>" + data[4].value + 
            "</td><td>" + data[5].value +
            "</td><td>" + data[6].value +
            "</td></tr>";
        
        localStorage.setItem('votedOn', data[1].value);

        descr.innerHTML += data[7].value;
        
        info.innerHTML +=
            "<tr><td>" + data[8].value +
            "</td><td>" + data[9].value +
            "</td><td>" + data[10].value +
            "</td></tr>";
        
    
};




like.addEventListener('click', function(){
    let votedOn = localStorage.getItem('votedOn');
    let voter = localStorage.getItem('mail');
    let vote = 2;
   userVote(votedOn, voter, vote);
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


    


function displayMatch(data){
    console.log("skal vise antal match")
}
