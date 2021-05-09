// -----------  DEFINING VARIABLES ------------- //
// 01. Variables for buttons
const deleteBtn = document.getElementById('delete');
const edit = document.getElementById('edit');

// 02. Variables to display user in


   
// -------- SHOW USER AND EDIT INPUT ---------//
function showEdit(){
    // henter email og password fra storage, så vi kan få brugeren via et fetch request 
    let email = localStorage.getItem('email');
    //let password = localStorage.getItem('password');

    fetch(`http://localhost:7071/api/admEditUser?email=${email}`)
    .then((resp) => resp.json()).then(function(data){
        // Dataen bliver direkte indsadt som defailt values 
        // document.getElementById('email').defaultValue = data.email;
        document.getElementById('password').defaultValue = data.password;
        document.getElementById('firstname').defaultValue = data.firstName;
        document.getElementById('lastname').defaultValue = data.lastName;
        document.getElementById('dob').defaultValue = data.dob;
        document.getElementById('gender').defaultValue = data.genderWritten;
        // document.getElementById('description').innerHTML = data.description;
        document.getElementById('min').defaultValue = data.ageMin;
        document.getElementById('max').defaultValue = data.ageMax;
        document.getElementById('pref').defaultValue = data.prefWritten;
    });
};



// ------------- DELETE USER ---------------//

    // 01. Action for click on delete button
deleteBtn.addEventListener('click', function(){ 
    alert("Warning - Your profile will be deleted"); 
    deleteUser(); 
});
    
    // 02. Function to delete user
function deleteUser(){
    if(localStorage.getItem('email')){


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
        
        
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        
        
        window.location.href = "./frontpage.html"; 
    };
};

//------------ EDIT USER FUNCTION -------------//
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

    let editedUser = { email, password, firstName, lastName, dob, gender, description, ageMin, ageMax, genderPref };
    localStorage.setItem('password', password)

    console.log(editedUser);
    
    const option = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(editedUser)// Konvertere klassen til en json string
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

