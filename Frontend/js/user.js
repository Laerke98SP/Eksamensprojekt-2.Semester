// -----------  DEFINING VARIABLES ------------- //

// 01. Variables for localstorage
let email = localStorage.getItem('email');
let password = localStorage.getItem('password');

console.log(email);

// 02. Variables for buttons
const logout = document.getElementById("logout");
const deleteBtn = document.getElementById('delete');

// 03. Variables to display user in
var table = document.getElementById("table"); // en variabel for tabellen
var info = document.getElementById("description"); // en variabel for beskrivelses divv
var pref = document.getElementById("info"); // en variabel for info div
var interest = document.getElementById("interest");

// ------------------ CREATE CLASS USER -------------------- //
class User {
    constructor(email, password, firstName, lastName, dob, gender, description, ageMin, ageMax, genderPref){
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = dob;
        this.gender = gender;
        this.description = description;
        this.ageMin = ageMin;
        this.ageMax= ageMax;
        this.genderPref = genderPref;
    }
}; 

function showUser(){
    let firstName = localStorage.getItem('firstName');
    let lastName = localStorage.getItem('lastName');
    let dob = localStorage.getItem('dob');
    let gender = localStorage.getItem('gender');
    let description = localStorage.getItem('description');
    let ageMin = localStorage.getItem('ageMin');
    let ageMax = localStorage.getItem('ageMax');
    let genderPref = localStorage.getItem('genderPref');

    console.log(ageMin + " test")

    const user = new User(email, password, firstName, lastName, dob, gender, description, ageMin, ageMax, genderPref);
    console.log(user);

    table.innerHTML += 
    "<tr><td>" + email + 
    "</td><td>" + password + 
    "</td><td>" + firstName +
    "</td><td>" + lastName + 
    "</td><td>" + dob +
    "</td><td>" + gender +
    "</td></tr>";
   
    info.innerHTML += description;

    pref.innerHTML +=
    "<tr><td>" + ageMin +
    "</td><td>" + ageMax+
    "</td><td>" + genderPref+
    "</td></tr>";
}

function showInterest(email){
    // ---------- RETRIEVE IN DB A PERSON WITH FOLLOWING MAIL AND PASSWORD ---------//
    fetch(`http://localhost:7071/api/interest?email=${email}`)
    .then(
        function(response){
                // ----------- IF 200 RESPONSE CODE IT SUCCEEDED ---------------------//
                response.json().then(function (data) {
                    console.log(data);
                    interest.innerHTML += data;
                })
                .catch(function (err){
                    console.log(err + " Testing err");
                });
    }); 



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
        
    if(localStorage.getItem('mail')){
    
    
        const option = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(user)
        };    
           
           
        fetch(`http://localhost:7071/api/user?email=${mail}`, option)
        .then(function() {
            console.log("ok"); 
        }).catch(function() {
            console.log("error"); 
        });
            
            
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
            
            
        window.location.href = "./0frontpage.html"; 
    };
};