function calculateAge(dob) {
    var age = new Date(dob);
    var diffMS = Date.now() - age.getTime(); //d.d. minus 'age', dsv. differencen udregnes gemmes som ny variabel
    var ageDate = new Date(diffMS); //udregningen af differencen mellem d.d. og 'age' gemmes som ny dato
        return dob = Math.abs(ageDate.getUTCFullYear() - 1970); // getUTCFullYear = omregner til et helt år minus 1970
}; //ovenstående metode udregner objekternes alder ud fra attributterne 'birthYear', 'birthMonth' og birthDate.

// -----------  DEFINING VARIABLES ------------- //
// 01. Variables for buttons
//const logout = document.getElementById("logout")
const deleteBtn = document.getElementById('delete');
const edit = document.getElementById('edit');

// 02. Variables to display user in
var table = document.getElementById("table"); 
var info = document.getElementById("description"); 
var pref = document.getElementById("info"); 
   
// -------- SHOW USER AND EDIT INPUT ---------//
function showEdit(){
    // henter email og password fra storage, så vi kan få brugeren via et fetch request 
    let email = localStorage.getItem('email');
    //let password = localStorage.getItem('password');

    fetch(`http://localhost:7071/api/admEditUser?email=${email}`)
    .then((resp) => resp.json()).then(function(data){
        // Dataen bliver direkte indsadt som defailt values 
        document.getElementById('email').defaultValue = data[1].value;
        document.getElementById('password').defaultValue = data[2].value;
        document.getElementById('firstName').defaultValue = data[3].value;
        document.getElementById('lastName').defaultValue = data[4].value;
        document.getElementById('dob').defaultValue = calculateAge(data[5].value);
        document.getElementById('gender').defaultValue = data[6].value;
        document.getElementById('descr').defaultValue = data[7].value;
        document.getElementById('ageMin').defaultValue = data[8].value;
        document.getElementById('ageMax').defaultValue = data[9].value;
        document.getElementById('genderPref').defaultValue = data[10].value;
    }).then(()=> {
        return checkIfMatch();
    });
};

// ----------- LOG OUT FUNCITON ------------- //
// logout.addEventListener('click', function(){
//     // ---------- Remove values from localstorage ----------------------
//     localStorage.removeItem('email');
//     localStorage.removeItem('password');
//     localStorage.removeItem('firstName');
//     localStorage.removeItem('lastName');
//     localStorage.removeItem('dob');
//     localStorage.removeItem('gender');
//     localStorage.removeItem('description');
//     localStorage.removeItem('minAge');
//     localStorage.removeItem('maxAge');
//     localStorage.removeItem('genderPref');
    

//     // ----------- Send user back to frontpage --------------------
//     window.location.href = "./0frontpage.html"; 
// })

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
        localStorage.removeItem('firstName');
        localStorage.removeItem('lastName');
        localStorage.removeItem('dob');
        localStorage.removeItem('gender');
        localStorage.removeItem('description');
        localStorage.removeItem('ageMin');
        localStorage.removeItem('ageMax');
        localStorage.removeItem('genderPref');
        window.location.href = "./0frontpage.html"; 
    };
};

//------------ EDIT USER FUNCTION -------------//
function editUser(){
    let email = localStorage.getItem('email');
    let password = document.getElementById('password').value
    let firstName = document.getElementById('firstName').value
    let lastName = document.getElementById('lastName').value
    //let dob = document.getElementById('dob').value
    let gender = document.getElementById('gender').value
    let description = document.getElementById('descr').value
    let ageMin = document.getElementById('ageMin').value
    let ageMax = document.getElementById('ageMax').value
    let genderPref = document.getElementById('genderPref').value

    let editedUser = {email, password, firstName, lastName, gender, description, ageMin, ageMax, genderPref };
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

function checkIfMatch(){
    let email = localStorage.getItem('email');
    const option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset-UTF-8'
        },
        body: JSON.stringify({email: email})
    };
    // Insert match if both user like eachother
    fetch(`http://localhost:7071/api/match`, option)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
    // MISSING SOME IF ELSE STATEMENT TO CHECK FOR DIFFERENT ERRORS //
        console.log("Process succeeded")
        console.log(data)
        if( data.status == 'Success' ){
           
            message();
        };
    }).catch((err) =>{
        console.log(err)
        console.log("Something went wroooong")
    });
};


function message(){
    let result = 0;
    // document.getElementById("badge").style.display = "block"; // uncover
    
     // Getting the matches inked to the user email
     fetch(`http://localhost:7071/api/match?email=${email}`)
        .then(function(response) {
            return response.json();
        }).then(function(matches) {
            if(localStorage.getItem("counter") !== null){
                var counter = localStorage.getItem("counter");
            } else var counter = 0;
            // console.log(matches);
            //Creating a forloop that iterates through matches
            for (i in matches) {
                result++;
            }; 
            if(result > counter) {
                // console.log(counter)
                document.getElementById("badge").style.display = "block"; // Element will  be displayed
                counter = result;
                localStorage.setItem('counter', counter)
                //console.log(counter + " if there are more in match than counter")
            } else if(result <= counter) {
                document.getElementById("badge").style.display = "none"; // Element will not be displayed
                //console.log(result + " + " + counter); 
                counter = result;
                localStorage.setItem('counter', counter)
               // console.log(counter + " if there are less in match than counter")
            }
        });
    };
