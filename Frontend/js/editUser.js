// -----------  DEFINING VARIABLES ------------- //


// 01. Variables for buttons
const logout = document.getElementById("logout")
const deleteBtn = document.getElementById('delete');
const edit = document.getElementById('edit');

// 02. Variables to display user in
var table = document.getElementById("table"); 
var info = document.getElementById("description"); 
var pref = document.getElementById("info"); 

// ------------------ CREATE CLASS USER -------------------- //
class User {
    constructor(email, password, firstName, lastName, dob, gender, description, minAge, maxage, genderPref){
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = dob;
        this.gender = gender;
        this.description = description;
        this.minAge = minAge;
        this.maxage = maxage;
        this.genderPref = genderPref;
    }
}; 

   //Opretter en instans af klassen Profile - med oplysninger fra local storage
   //const user = new User(mail, password, firstname, lastname, dob, gender, description, ageMin, ageMax, genderPref);
   //let newUser = [user]; // indsætte instansen profile i et array
 
   

function showEdit(){
    // henter email og password fra storage, så vi kan få brugeren via et fetch request 
    let email = localStorage.getItem('email');
    let password = localStorage.getItem('password');

    fetch(`http://localhost:7071/api/user?email=${email}&password=${password}`)
    .then((resp) => resp.json()).then(function(data){
        // Dataen bliver direkte indsadt som defailt values 
        document.getElementById('email').defaultValue = data[1].value;
        document.getElementById('password').defaultValue = data[2].value;
        document.getElementById('firstname').defaultValue = data[3].value;
        document.getElementById('lastname').defaultValue = data[4].value;
        document.getElementById('dob').defaultValue = data[5].value;
        document.getElementById('gender').defaultValue = data[6].value;
        document.getElementById('desc').defaultValue = data[7].value;
        document.getElementById('min').defaultValue = data[8].value;
        document.getElementById('max').defaultValue = data[9].value;
        document.getElementById('pref').defaultValue = data[10].value;
    });
};



// ----------- LOG OUT FUNCITON ------------- //
logout.addEventListener('click', function(){
    // ---------- Remove values from localstorage ----------------------
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('dob');
    localStorage.removeItem('gender');
    localStorage.removeItem('description');
    localStorage.removeItem('minAge');
    localStorage.removeItem('maxAge');
    localStorage.removeItem('genderPref');
    

    // ----------- Send user back to frontpage --------------------
    window.location.href = "./0frontpage.html"; 
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
// edit.addEventListener('click', function(){
//      editUser();
// })

    //--------------------- 03. Funktionen edit(user) -------------------------
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
    let genderPref = document.getElementById('pref').value

    // let editedUser = new User(email, password, firstName, lastName, dob, gender, description, ageMin, ageMax, genderPref);

    let editedUser = {email, password, firstName, lastName, dob, gender, description, ageMin, ageMax, genderPref}

    console.log(editUser)
    
    const option = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(editedUser),// Konvertere klassen til en json string
    };    
        
    // --------- Her benyttes fetch til at kontakte API og dermed indsætte bruger i DB
     fetch(`http://localhost:7071/api/user`, option).then(function() {
        console.log("ok");
        alert("Succes!")
        alert("You will be directed back to your profile");
        // Naviger til brugerens profil hvis alt ovenstående lykkes
        window.location.href = "./1user.html"; 
    }).catch(function() {            
        // lykkedes det ikke 
        console.log("error");
    }); // Kunne indsætte window.location.href her - efter en finally blok
}   

