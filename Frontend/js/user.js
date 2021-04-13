// ----------- localstorage for PROFILE page-------------
// Henter oplysningerne igennem id eller class fra HTML siden
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
const deleteBtn = document.querySelector('#delete'); // en Variabel for slet knappen
const likebtn = document.querySelector('#like'); // en variabel for like knappen
const viewMatch = document.querySelector('#viewMatch'); // en variabel for like knappen
var table = document.getElementById("table"); // en variabel for tabellen

// ------------------ Opretter klassen Profile--------------------
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

    //Det omdannes til array således vi kan loope igennem det og indsætte i tabel i HTML------------
for(i in newUser){
table.innerHTML += 
    "<tr><td>" + newUser[i]+ 
    "<tr><td>" + newUser[i].password+ 
    "</td><td>" + newUser[i].firstname +
    "</td><td>" + newUser[i].lastname + 
    "</td><td>" + newUser[i].dob +
    "</td><td>" + newUser[i].gender +
    "</td><td>" + newUser[i].description +
    "</td><td>" + newUser[i].ageMin +
    "</td><td>" + newUser[i].ageMax +
    "</td><td>" + newUser[i].genderPref +
    "</td></tr>";
};