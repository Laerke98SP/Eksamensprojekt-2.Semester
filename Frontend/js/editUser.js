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
const edit = document.getElementById('edit');

// 03. Variables to display user in
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

function showEdit(){
    
 
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
    

    // ----------- Send user back to frontpage --------------------
    window.location.href = "./frontpage.html"; 
})


// ------------- DELETE USER ---------------//

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




    // -------------------- 02. Ved klik på submit ændringer---------------------------
edit.addEventListener('click', function(){
    
    //Henter værdierne der er blevet indtastet i redigeringsfelterne
    let password = document.getElementById('kodeord').value
    let firstName = document.getElementById('fornavn').value
    let lastName = document.getElementById('efternavn').value
    let dob = document.getElementById('dob').value
    let gender = document.getElementById('køn').value
    let descr = document.getElementById('descr').value
    let min = document.getElementById('min').value
    let max = document.getElementById('max').value
    let genderPref = document.getElementById('kønPr').value

   

    // Opretter ny instans af Profile klassen
    let updUser = new User(mail, password, firstName, lastName, dob, gender, descr, min, max, genderPref);
    let update = [updUser]; //indsætter denne i arr

    //Kalder funktionen edit(user)
    editUser(update);
    
})

    //--------------------- 03. Funktionen edit(user) -------------------------
function editUser(user){
    //Hvis email/brugernavn eksistere - lav gammel info om til opdateret info
    if(localStorage.getItem('mail')){
        if(password) {
            newUser.password = user.password;
        }
        if(firstname) {
            newUser.firstname = user.firstName;
        };
        if(lastname) {
            newUser.lastname = user.lastName;
        };
        if(dob) {
            newUser.dob = user.dob;
        };
        if(gender){
            newUser.gender = user.gender;
        };
        if(description) {
            newUser.description = user.descr;
        };
        if(ageMin) {
            newUser.ageMin = user.min;
        };
        if(ageMax) {
            newUser.ageMax = user.max;
        };
        if(genderPref) {
            newUser.genderPref = user.genderPref;
        };
        // Tester hvordan bruger ser ud nu
        //console.log("After update " + newUser);
        

        // Opretter en instans af klassen Profile som består af de nye værdier
        //const finish = new Profile(mail, fornavn, efternavn, aar, beskrivelse, kodeord)
        const option = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(user),// Konvertere klassen til en json string
        };    
        
        // --------- Her benyttes fetch til at kontakte API og dermed indsætte bruger i DB
         fetch(`http://localhost:7071/api/user`, option).then(function() {
            console.log("ok");
            alert("Succes!")
            alert("You will be directed back to your profile");
            // Naviger til brugerens profil hvis alt ovenstående lykkes
            window.location.href = "./user.html"; 
        }).catch(function() {
            // lykkedes det ikke 
            console.log("error");
        }); // Kunne indsætte window.location.href her - efter en finally blok
    }   
}
