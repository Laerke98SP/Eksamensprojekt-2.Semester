// ---------------- DEFINING CREATEUSER BUTTON ------------------- //
var createUser = document.getElementById("getUser");

// ------------- DEFINING INPUT VARIABLES -----------------//  
var genderF = document.getElementById("genderF");
var genderM = document.getElementById("genderM");

var prefFemale = document.getElementById("genderPrefF");
var prefMale = document.getElementById("genderPrefM");

var sports = document.getElementById("sports");
var music = document.getElementById("music");
var hiking = document.getElementById("hiking");
var dancing = document.getElementById("dancing");

class Interest{
    constructor(email, sports, sVote, music, mVote, hiking, hVote, dancing, dVote){
        this.email = email
        this.sports = sports
        this.sVote = sVote
        this.music = music
        this.mVote = mVote
        this.hiking = hiking
        this.hVote = hVote
        this.dancing = dancing
        this.dVote = dVote
    }

};

// ---------------- CREATEUSER ACTION WHEN CLICK ON BUTTON ---------// 
createUser.addEventListener('click', function(){
    saveUser()
});

function convertDate(dobBefore){
    var dobArray = dobBefore.split("/");
    var dobAfter = dobArray[2] + '-' + dobArray[1] + '-' + dobArray[0];
    return dobAfter; 
};

// ----------------- ACTION FOR CREATEUSER FUNCTION -----------------//
function saveUser(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var dob = document.getElementById("dob").value;
    var description = document.getElementById("description").value;
    var ageMin = document.getElementById("ageMin").value;
    var ageMax = document.getElementById("ageMax").value;


    localStorage.setItem('email', email);
    localStorage.setItem('password', password);

    // 02. Defining gender and gender preference 0 = female , 1= male
    let gender = 0;
    if(genderF.checked ){
        gender = 0;
    } else {
        gender = 1;
    }

    let genderPref = 0;
    if(genderPrefF.checked){
        genderPref = 0;
    } else {
        genderPref = 1;
    }

    // 03. Set gender and genderPref in localstorage
    // localStorage.setItem('gender', gender1);
    // localStorage.setItem('genderPref',genderPref1 );

    // let gender = localStorage.getItem('gender');
    // let genderPref = localStorage.getItem('genderPref');

    // 04. Create a new class
    let newUser = { email, password, firstName, lastName, dob , gender, description, ageMin, ageMax, genderPref }
    

    // 05. Interest and vote 0 = no , 1 = yes
    let sVote = 0;
    let mVote = 0;
    let hVote = 0;
    let dVote = 0;
    if (sports.checked) {
        sVote = 1;
    } else sVote = 0;
    if (music.checked) {
        mVote = 1;
    } else mVote = 0;
    if (hiking.checked) {
        hVote = 1;
    } else hVote = 0;
    if (dancing.checked) {
        dVote = 1;
    } else dVote = 0;

    // 06. Create new interest class
    let userInterest = new Interest( email, sports.value ,sVote, music.value, mVote, hiking.value, hVote,  dancing.value, dVote )
    

    // ---------------- INPUT FOR POST USER IN DB ----------//
    const option1 = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset-UTF-8'
        },
        body: JSON.stringify(newUser)
    };
    
    fetch("http://localhost:7071/api/user", option1)   
    .then((response) => {
         return response.json();
    })
    .then((data) => {
        // MISSING SOME IF ELSE STATEMENT TO CHECK FOR DIFFERENT ERRORS //
        console.log("process Succeeded")
        console.log("Done in user transfer")
        inputInterest(userInterest);    
    }).catch((err) =>{
        console.log(err)
        console.log("Something went wroooong")
    })
};

function inputInterest(userInterest){
    const option2 = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset-UTF-8'
        },
        body: JSON.stringify(userInterest)
    };
    
    fetch("http://localhost:7071/api/interest", option2) 
    .then((response) => {
        return response.json();
    })
    .then((data) => {
            // MISSING SOME IF ELSE STATEMENT TO CHECK FOR DIFFERENT ERRORS //
            console.log("Done in Interest transfer")
            alert('We will direct you to your profile')
            window.location.href = "./1user.html"; 
    
    }).catch((err) =>{
        console.log(err)
        console.log("Something went wroooong")
    })
}
