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

var table = document.getElementById("table"); // en variabel for tabellen
var info = document.getElementById("description"); // en variabel for beskrivelses divv
var pref = document.getElementById("info"); // en variabel for info div

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

