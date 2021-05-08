// -----------  DEFINING VARIABLES ------------- //


// 01. Variables for buttons
const edit = document.getElementById('edit');

// 02. Variables to display user in
var table = document.getElementById("table"); 
var info = document.getElementById("description"); 
var pref = document.getElementById("info"); 


 
function showEdit(){
    // henter email og password fra storage, så vi kan få brugeren via et fetch request 
    let email = localStorage.getItem('email');

    fetch(`http://localhost:7071/api/admEditUser?email=${email}`)
    .then((resp) => resp.json()).then(function(data){

        console.log(data)
        // Dataen bliver direkte indsadt som defailt values 
        //document.getElementById('email').defaultValue = data[1].value;
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






edit.addEventListener('click', function(){
    editUser();
})



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
        window.location.href = "../Admin/2admUpd.html"; 
    }).catch(function() {            
        // lykkedes det ikke 
        console.log("error");
    }); // Kunne indsætte window.location.href her - efter en finally blok
}   

