// -----------  DEFINING VARIABLES ------------- //


// 01. Variables for buttons
const logout = document.getElementById("logout");
const deleteBtn = document.getElementById('delete');

// 02. Variables to display user in
var table = document.getElementById("table"); // en variabel for tabellen
var info = document.getElementById("description"); // en variabel for beskrivelses divv
var pref = document.getElementById("info"); // en variabel for info div
var interest = document.getElementById("match");


// 03. Get users information and display
function showUser(){
    let email = localStorage.getItem('email');
    let password = localStorage.getItem('password');

    // fetch data from api
    fetch(`http://localhost:7071/api/user?email=${email}&password=${password}`)
    .then((resp) => resp.json()).then(function(data) {

        // fixing dataflow from API, sent as a class
        table.innerHTML += 
        "<tr><td>" + data.email + 
        "</td><td>" + data.firstName +
        "</td><td>" + data.lastName + 
        "</td><td>" + data.dob+
        "</td><td>" + data.gender +
        "</td></tr>";
       
        info.innerHTML += data.description;
    
        pref.innerHTML +=
        "<tr><td>" + data.ageMin +
        "</td><td>" + data.ageMax +
        "</td><td>" + data.genderPref +
        "</td></tr>";
        
        showInterest();
        
    }).catch(function() {            
        // If it doesnt work
        console.log("error");
    }); 

}

// 04. Get users Interests
function showInterest(){
    let email = localStorage.getItem('email');
    fetch(`http://localhost:7071/api/interest?email=${email}`)
    .then(function(response){
        // -----------  Put data in array ---------------------//
        response.json().then(function (data) {
            let arr = [];
            for(i=0; i<data.length; i++){
                arr.push(data[i][0].value)
            }
           return displayInt(arr);

        }).catch(function (err){
            console.log(err + " Testing err");
        });
    }); 
}

// 05. Display interests
function displayInt(arr){
    interest.innerHTML = arr;
}

// ----------- LOG OUT FUNCITON ------------- //
logout.addEventListener('click', function(){
    // ---------- Remove values from localstorage ----------------------
    localStorage.removeItem('mail');
    localStorage.removeItem('kodeord');
    localStorage.removeItem('fornavn');
    localStorage.removeItem('efternavn');
    localStorage.removeItem('dob');
    localStorage.removeItem('køn');
    localStorage.removeItem('beskrivelse');
    localStorage.removeItem('min');
    localStorage.removeItem('max');
    localStorage.removeItem('kønPr');
    

    // ----------- Sent user back to frontpage --------------------
    window.location.href = "./0frontpage.html"; 
})


// -------------- DELETE USER ---------------//
    // 01. Action for click on delete button
deleteBtn.addEventListener('click', function(){ 
    alert("Warning - Your profile will be deleted"); 
    deleteUser(); 
});
        
    // 02. Function to delete user
function deleteUser(){
        
  
    let email = localStorage.getItem('email');
    
        const option = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        };    
           
           
        fetch(`http://localhost:7071/api/user?email=${email}`, option)
        .then(function() {
            console.log("ok"); 
                 
            localStorage.clear();
            
            
            window.location.href = "./0frontpage.html"; 
        }).catch(function() {
            console.log("error"); 
        });
            
       
};
