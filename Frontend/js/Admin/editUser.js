// -----------  DEFINING VARIABLES ------------- //
// 01. Variables for buttons
const edit = document.getElementById('edit');

// 02. Variables to display user in
var table = document.getElementById("table"); 
var info = document.getElementById("description"); 
var pref = document.getElementById("info"); 

function showEdit(){
    // get email from localstorage to use with in a fetch 
    let email = localStorage.getItem('email');
    fetch(`http://localhost:7071/api/admEditUser?email=${email}`)
    .then((resp) => resp.json()).then(function(data){

        // data is inserted in the predefined spots
        document.getElementById('email').defaultValue = data.email;
        document.getElementById('password').defaultValue = data.password;
        document.getElementById('firstname').defaultValue = data.firstName;
        document.getElementById('lastname').defaultValue = data.lastName;
        document.getElementById('dob').defaultValue = data.dob;
        document.getElementById('gender').defaultValue = data.genderWritten;
        document.getElementById('desc').defaultValue = data.description;
        document.getElementById('min').defaultValue = data.ageMin;
        document.getElementById('max').defaultValue = data.ageMax;
        document.getElementById('pref').defaultValue = data.prefWritten;
    });
};

edit.addEventListener('click', function(){
    editUser();
})

    //--------------------- 03. Function edit(user) -------------------------
function editUser(){
    let email = localStorage.getItem('email');
    let password = document.getElementById('password').value
    let firstName = document.getElementById('firstname').value
    let lastName = document.getElementById('lastname').value
    let dob = document.getElementById('dob').value
    let gender = document.getElementById('gender').value
    let description = document.getElementById('desc').value
    let ageMin = document.getElementById('min').value
    let ageMax = document.getElementById('max').value
    let genderPref = document.getElementById('pref').value;

    let editedUser = { email, password, firstName, lastName, dob, gender, description, ageMin, ageMax, genderPref }
    
    const option = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(editedUser),// Convert object to JSON string
    };    
        
    // ---------  Sending updated info with PATCH request
     fetch(`http://localhost:7071/api/display`, option).then(function() {
        console.log("ok");
        window.location.href = "../Admin/2admUpd.html"; 
    }).catch(function() {            
        console.log("error");
    }); 
}   

