// ---------------- DEFINING BUTTONS ------------------- //
const like = document.getElementById("like");
const dislike = document.getElementById("dislike");

// ---------- SHOW DIV CONTAINERS FOR INNERHTML -------- //
const seeUsers = document.getElementById("likes")
const seeMatch = document.getElementById("Seematch");

let email = localStorage.getItem('mail');

fetch(`http://localhost:7071/api/users?email=${email}`)
.then(function(response){
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

function displayPotentialMatch(data){
   
    for(let i = 0; i< data.length; i++){       
        
            let div = document.createElement("div");
            seeUsers.innerHTML = "Name: " + data[i].value + "<br>" + 
            " Age: " + data[i].value + "<br>" + 
            " Gender " + data[i].value + "<br>" + 
            " Description: " + data[i].value;
            seeUsers.appendChild(div)
            break;
            
        
    };   
};

function displayMatch(data){
    console.log("skal vise antal match")
}