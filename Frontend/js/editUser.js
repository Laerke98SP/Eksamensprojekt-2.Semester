// ------- GET VALUE OF LOCALSTORAGE ITEMS ----------//
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

// ---------------- DEFINING BUTTONS ------------------- //
const deleteBtn = document.querySelector('#delete'); // en Variabel for slet knappen
const acceptEditBtn = document.querySelector('#submitChanges'); // en variabel for at ændre bruger knappen

// ---------------- DEFINING TABLE OR DIVS FOR INNERHTML --------//
var table = document.getElementById("table"); 
var info = document.getElementById("description"); 
var pref = document.getElementById("info"); 


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
        };
    
    // --------------------- Opretter felter som kan redigeres i -------------------
for(i in newUser){ // Looper igennem 
    table.innerHTML += // Tilføjer i html filen redigerings felterne
    "<tr><td><input id='mail'>" + 
    "</td><td><input id='kodeord'>"  +
    "</td><td><input id='fornavn'>" + 
    "</td><td><input id='efternavn'>" + 
    "</td><td><input id='dob'>" + 
    "</td><td><input id='køn'>" + 
    "</td></tr>"

    info.innerHTML += "<input id='descr'>"

    pref.innerHTML +=
    "<tr><td><input id='min'>" + 
    "</td><td><input id='max'>" + 
    "</td><td><input id='kønPr'>" + 
    "</td></tr>"

};

        

// -------------------- SLET BRUGER ---------------------

    //----------------- 01. Knap der starter slet bruger--------------------
deleteBtn.addEventListener('click', function(){ // Ved klik på knappen delete user
    alert("Warning - Your profile will be deleted"); //Sender advarsel ud til brugeren
    deleteUser(); //køre funktionen deleteUser hver gang knappen trykkes på
});
    
    // ---------------- 02. Funktion der sletter brugeren--------------------
function deleteUser(){
    // ------------ 01. hvis brugernavn/ mail er at finde i localstorage -----------------------------------
    if(localStorage.getItem('brugernavn')){

        // -------- 02. Denne instans profile af klassen Profile  bruges til at sende en delete request til databasen ved hjælp af HTTP req DELETE
        const option = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(profile), // Konvertere klassen til en json string - det er denne instans der skal fjernes fra DB
        };    
       
        // --------- 03. Her benyttes fetch til at kontakte API og dermed fjerne bruger i DB--------------
        fetch(`http://localhost:4000/profile/${mail}`, option)
        .then(function() {
            console.log("ok"); // Hvis det lykkes console logges ok i browser konsol
        }).catch(function() {
            console.log("error"); // Ellers vil outputtet i browser kontrol være error
        });
        
        // ---------- 04. Her fjernes den information om brugeren gemt i localstorage----------------------
        localStorage.removeItem('brugernavn');
        localStorage.removeItem('fornavn');
        localStorage.removeItem('efternavn');
        localStorage.removeItem('alder');
        localStorage.removeItem('beskrivelse');
        localStorage.removeItem('kodeord');
        
        // ----------- 05. Bruger vidersendes til forside------------------------------
        window.location.href = "/frontpage.html";
    };
};




    // -------------------- 02. Ved klik på submit ændringer---------------------------
acceptEditBtn.addEventListener('click', function(){
    
    //Henter værdierne der er blevet indtastet i redigeringsfelterne
    let fName = document.getElementById('fname').value
    let lName = document.getElementById('lname').value
    let alder = document.getElementById('alder').value
    let descr = document.getElementById('descr').value
    let code = document.getElementById('code').value
    
    // Sætter de værdier i localstorage
    localStorage.setItem('fornavn', fName);
    localStorage.setItem('efternavn',lName);
    localStorage.setItem('alder', alder);
    localStorage.setItem('beskrivelse', descr);
    localStorage.setItem('kodeord', code);

    // Opretter ny instans af Profile klassen
    let updUser = new Profile(mail, fName, lName, alder, descr, code);
    let update = [updUser]; //indsætter denne i arr

    //Kalder funktionen edit(user)
    edit(update);
    
})

    //--------------------- 03. Funktionen edit(user) -------------------------
function edit(user){
    //Hvis email/brugernavn eksistere - lav gammel info om til opdateret info
    if(localStorage.getItem('brugernavn')){
        if(mail) {
            newUser.mail = user.mail;
        }
        if(firstname) {
            newUser.firstname = user.fName;
        };
        if(lastname) {
            newUser.lastname = user.lName;
        };
        if(age) {
            newUser.age = user.alder;
        };
        if(description) {
            newUser.description = user.descr;
        };
        if(password) {
            newUser.password = user.code;
        };
        // Tester hvordan bruger ser ud nu
        //console.log("After update " + newUser);
        
        
        // Henter nye oplysninger om bruger fra localstorage sætter det li en ny variabel
        let fornavn = localStorage.getItem('fornavn');
        let efternavn = localStorage.getItem('efternavn');
        let aar = localStorage.getItem('alder');
        let beskrivelse = localStorage.getItem('beskrivelse');
        let kodeord = localStorage.getItem('kodeord');

        // Opretter en instans af klassen Profile som består af de nye værdier
        const finish = new Profile(mail, fornavn, efternavn, aar, beskrivelse, kodeord)
        const option = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(finish),// Konvertere klassen til en json string
        };    
        
        // --------- Her benyttes fetch til at kontakte API og dermed indsætte bruger i DB
         fetch(`http://localhost:4000/edit/${mail}`, option).then(function() {
            console.log("ok");
            alert("Succes!")
            alert("You will be directed back to your profile");
            // Naviger til brugerens profil hvis alt ovenstående lykkes
            window.location.href = "/profile"; 
        }).catch(function() {
            // lykkedes det ikke 
            console.log("error");
        }); // Kunne indsætte window.location.href her - efter en finally blok
    }   
}
