// ----------- localstorage for PROFILE page-------------
// ------------------ Opretter klassen Profile--------------------
class User {
    constructor(email, password, firstName, lastName, dob, gender, desc, ageMin, ageMax, genderPref){
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = dob;
        this.gender = gender;
        this.desc = desc;
        this.ageMin = ageMin;
        this.ageMax = ageMax;
        this.genderPref = genderPref;
    }
}; 

// Henter oplysningerne igennem id eller class fra HTML siden
let email = localStorage.getItem('Email');
let password = localStorage.getItem('Password');
let firstname = localStorage.getItem('Fornavn');
let lastname = localStorage.getItem('Efternavn');
let dob = localStorage.getItem('Fødselsdato');
let gender = localStorage.getItem('Køn');
let desc = localStorage.getItem('Beskrivelse');
let ageMin = localStorage.getItem('Minimumsalder');
let ageMax = localStorage.getItem('Maximumsalder');
let genderPref = localStorage.getItem('Kønspræference');
const deleteBtn = document.querySelector('#delete'); // en Variabel for slet knappen
const likebtn = document.querySelector('#like'); // en variabel for like knappen
const viewMatch = document.querySelector('#viewMatch'); // en variabel for like knappen
var potential = document.getElementById("potential"); // en variabel for tabellen
var potentialDesc = document.getElementById("desc"); // en variabel for tabellen
var potentialPref = document.getElementById("pref"); // en variabel for tabellen

//Opretter en instans af klassen Profile - med oplysninger fra local storage
const user = new User(email, password, firstName, lastName, dob, gender, desc, ageMin, ageMax, genderPref);
let newUser = [user]; // indsætte instansen profile i et array

console.log(newUser);

    //Det omdannes til array således vi kan loope igennem det og indsætte i tabel i HTML------------
for(let i = 0; i< newUser.length; i++){
    potential.innerHTML += 
    "<tr><td>" + newUser[i].email + 
    "</td><td>" + newUser[i].password + 
    "</td><td>" + newUser[i].firstName +
    "</td><td>" + newUser[i].lastName + 
    "</td><td>" + newUser[i].dob +
    "</td><td>" + newUser[i].gender +
    "</td></tr>";
    
    potentialDesc.innerHTML += newUser[i].desc;

    potentialPref.innerHTML += 
    "<tr><td>" + newUser[i].ageMin +
    "</td><td>" + newUser[i].ageMax +
    "</td><td>" + newUser[i].genderPref +
    "</td></tr>";
};

