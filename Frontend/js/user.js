// ----------- localstorage for PROFILE page-------------
// Henter oplysningerne igennem id eller class fra HTML siden
let mail = localStorage.getItem('brugernavn');
let password = localStorage.getItem('kodeord');
let firstname = localStorage.getItem('fornavn');
let lastname = localStorage.getItem('efternavn');
let dob = localStorage.getItem('fødselsdato');
let gender = localStorage.getItem('køn');
let description = localStorage.getItem('beskrivelse');
let ageMin = localStorage.getItem('min');
let ageMax = localStorage.getItem('max');
let genderPref = localStorage.getItem('kønpræf');
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



function showGender(gender) {
    if (gender = 0) {
        return gender = "Female"
    } else if (gender = 1) {
        return gender = "Male"
    };
};

function showGenderPref(genderPref) {
    if (genderPref = 0) {
        return genderPref = "Female"
    } else if (genderPref = 1) {
        return genderPref = "Male"
    };
};

function calculateAge(dob) {
    var age = new Date(dob);
    var diffMS = Date.now() - age.getTime(); //d.d. minus 'age', dsv. differencen udregnes gemmes som ny variabel
    var ageDate = new Date(diffMS); //udregningen af differencen mellem d.d. og 'age' gemmes som ny dato
        return dob = Math.abs(ageDate.getUTCFullYear() - 1970); // getUTCFullYear = omregner til et helt år minus 1970
} //ovenstående metode udregner objekternes alder ud fra attributterne 'birthYear', 'birthMonth' og birthDate.


    //Det omdannes til array således vi kan loope igennem det og indsætte i tabel i HTML------------
for(let i = 0; i < newUser.length; i++){
table.innerHTML += 
    "<tr><td>" + newUser[i].email + 
    "</td><td>" + newUser[i].code + 
    "</td><td>" + newUser[i].fname +
    "</td><td>" + newUser[i].lname + 
    "</td><td>" + calculateAge(newUser[i].bdate) +
    "</td><td>" + showGender(newUser[i].gen) +
    "</td></tr>";
   
    info.innerHTML += newUser[i].descr;

    pref.innerHTML +=
    "<tr><td>" + newUser[i].min +
    "</td><td>" + newUser[i].max +
    "</td><td>" + showGenderPref(newUser[i].gendPref) +
    "</td></tr>";
};

