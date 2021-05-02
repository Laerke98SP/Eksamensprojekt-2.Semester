// -----------  DEFINING VARIABLES ------------- //

// 01. Variables for localstorage
let mail = localStorage.getItem('mail');
let password = localStorage.getItem('kodeord');
let firstname = localStorage.getItem('fornavn');
let lastname = localStorage.getItem('efternavn');
let dob = localStorage.getItem('dob');
let gender = localStorage.getItem('køn');
let description= localStorage.getItem('beskrivelse');
let ageMin = localStorage.getItem('min');
let ageMax = localStorage.getItem('max');
let genderPref = localStorage.getItem('kønPr');

// 02. Variables for buttons
const logout = document.getElementById("logout")
const deleteBtn = document.getElementById('delete');

// 03. Variables to display user in
var table = document.getElementById("table"); // en variabel for tabellen
var info = document.getElementById("description"); // en variabel for beskrivelses divv
var pref = document.getElementById("info"); // en variabel for info div

// ------------------ CREATE CLASS USER -------------------- //
class User {
    constructor(email, code, fname, lname, bdate, gen, descr, min, max, gendPref){
        this.email = email;
        this.code = code;
        this.fname = fname;
        this.lname = lname;
        this.bdate = bdate;
        this.gen = gen;
        this.descr = descr;
        this.min = min;
        this.max = max;
        this.gendPref = gendPref;
    }
}; 

//Opretter en instans af klassen Profile - med oplysninger fra local storage
const user = new User(mail, password, firstname, lastname, dob, gender, description, ageMin, ageMax, genderPref);
let newUser = [user]; // indsætte instansen profile i et array

console.log(newUser)

    //Det omdannes til array således vi kan loope igennem det og indsætte i tabel i HTML------------
for(let i = 0; i< newUser.length; i++){
table.innerHTML += 
    "<tr><td>" + newUser[i].email+ 
    "</td><td>" + newUser[i].code+ 
    "</td><td>" + newUser[i].fname +
    "</td><td>" + newUser[i].lname + 
    "</td><td>" + newUser[i].bdate +
    "</td><td>" + newUser[i].gen +
    "</td></tr>";
    info.innerHTML += newUser[i].descr;

    pref.innerHTML +=
    "<tr><td>" + newUser[i].min +
    "</td><td>" + newUser[i].max +
    "</td><td>" + newUser[i].gendPref +
    "</td></tr>";
    console.log(newUser[i].gen);
};



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
    window.location.href = "./frontpage.html"; 
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
            
            
        window.location.href = "./frontpage.html"; 
    };
};