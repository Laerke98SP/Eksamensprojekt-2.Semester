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
    let mail = document.getElementById('mail');
    let password = document.getElementById('password');
    let fname = document.getElementById('firstname');
    let lname = document.getElementById('lastname');
    let age = document.getElementById('age');
    let gender = document.getElementById('gender');
    let decr = document.getElementById('desc');
    let min = document.getElementById('min');
    let max = document.getElementById('max');
    let pref = document.getElementById('pref');
    //----- Al data indsættes i tabel------------
    for(let i = 0; i< newUser.length; i++){
            mail.innerHTML = newUser[i].email;
            password.defaultValue = newUser[i].code 
            fname.defaultValue = newUser[i].fname 
            lname.defaultValue = newUser[i].lname 
            age.defaultValue = newUser[i].bdate
            gender.defaultValue = newUser[i].gen 

            decr.defaultValue = newUser[i].descr;
        
            
            min.defaultValue = newUser[i].min;
            max.defaultValue = newUser[i].max;
            pref.defaultValue = newUser[i].gendPref;
        
        };

   
    
    // ---- Opretter felter som kan redigeres i --------
    // for(i in newUser){ // Looper igennem 
    //     password.innerHTML  += // Tilføjer i html filen redigerings felterne
    //         "<tr><td>" + 
    //         "</td><td><input id='kodeord'>"  +
    //         "</td><td><input id='fornavn'>" + 
    //         "</td><td><input id='efternavn'>" + 
    //         "</td><td><input id='dob'>" + 
    //         "</td><td><input id='køn'>" + 
    //         "</td></tr>"

    //     info.innerHTML += "<input id='descr'>"

    //     pref.innerHTML +=
    //         "<tr><td><input id='min'>" + 
    //         "</td><td><input id='max'>" + 
    //         "</td><td><input id='kønPr'>" + 
    //         "</td></tr>"
    // };
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
    
    // //Henter værdierne der er blevet indtastet i redigeringsfelterne
    // let psw = document.getElementById('kodeord').value
    // let firstName = document.getElementById('fornavn').value
    // let lastName = document.getElementById('efternavn').value
    // let date = document.getElementById('dob').value
    // let gend = document.getElementById('køn').value
    // let descr = document.getElementById('descr').value
    // let min = document.getElementById('min').value
    // let max = document.getElementById('max').value
    // let gendPref = document.getElementById('kønPr').value


   
    // Opretter ny instans af Profile klassen
    let updUser = new User(mail, psw, firstName, lastName, date, gend, descr, min, max, gendPref);
    let update = [updUser]; //indsætter denne i arr

    console.log(update)
    //Kalder funktionen edit(user)
     editUser(update);
    
})

    //--------------------- 03. Funktionen edit(user) -------------------------
function editUser(user){
    //Hvis email/brugernavn eksistere - lav gammel info om til opdateret info
    
            
    
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

