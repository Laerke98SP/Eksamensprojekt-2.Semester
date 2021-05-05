// ---------------- DEFINING CREATEUSER BUTTON ------------------- //
var createUser = document.getElementById("getUser");

// ------------- DEFINING INPUT VARIABLES -----------------//  var username = document.getElementById("email")
var email = document.getElementById("email");
var password = document.getElementById("password")
var firstName = document.getElementById("firstName")
var lastName = document.getElementById("lastName")
var dob = document.getElementById("dob")
var genderF = document.getElementById("genderF")
var genderM = document.getElementById("genderM")
var description = document.getElementById("description")
var ageMin = document.getElementById("ageMin")
var ageMax = document.getElementById("ageMax")
var prefFemale = document.getElementById("genderPrefF")
var prefMale = document.getElementById("genderPrefM");


var sports = document.getElementById("sports");
var music = document.getElementById("music");
var hiking = document.getElementById("hiking");
var dancing = document.getElementById("dancing");

class User{
    constructor(email,password, firstName, lastName, dob, gender, description, ageMin, ageMax, genderPref){
        this.email = email
        this.password = password
        this.firstName = firstName 
        this.lastName = lastName
        this.dob = dob
        this.gender = gender
        this.description = description
        this.ageMin = ageMin
        this.ageMax = ageMax
        this.genderPref = genderPref
    }
};

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
     //-------------- SAVE INPUT IN LOCALSTORAGE ---------------//
    localStorage.setItem('email', email.value);
    localStorage.setItem('password', password.value);
    localStorage.setItem('firstName', firstName.value);
    localStorage.setItem('lastName', lastName.value);
    localStorage.setItem('dob', dob.value);
    // localStorage.setItem('gender', gender.value);
    localStorage.setItem('description', description.value);
    localStorage.setItem('ageMin', ageMin.value);
    localStorage.setItem('ageMax', ageMax.value);
    // localStorage.setItem('genderPref', genderPref.value);
    
    
    // TESTING STATEMENT //
    console.log(email.value);

    //-------------- CALL CREATEUSER FUNCTION ---------------------//
    saveUser()
});


// ----------------- ACTION FOR CREATEUSER FUNCTION -----------------//
function saveUser(){

    // // Making DOB SQL friendly
    // let dateOfBirth = convertDate(dob.value);

    // ------- GET VALUE OF LOCALSTORAGE ITEMS ----------//
    let email = localStorage.getItem('email');
    let password = localStorage.getItem('password');
    let firstName = localStorage.getItem('firstName');
    let lastName = localStorage.getItem('lastName');
    let dob = localStorage.getItem('dob');
    let description = localStorage.getItem('description');
    let ageMin = localStorage.getItem('ageMin');
    let ageMax = localStorage.getItem('ageMax');
    
  


    // Deciding which genders 0 = females, 1= males
    let gender1 = 0;
    if(genderF.checked ){
        gender1 = 0
    } else gender1 = 1;
    let genderPref1 = 0;
    if(genderPrefF.checked){
        genderPref1 = 0
    } else genderPref1 = 1;

    localStorage.setItem('gender', gender1);
    localStorage.setItem('genderPref',genderPref1 );
    let gender = localStorage.getItem('gender');
    let genderPref = localStorage.getItem('genderPref');

    let newUser = new User( email, password, firstName.value, lastName.value, dob.value , gender, description.value, ageMin.value, ageMax.value, genderPref)


    console.log(newUser);
    

    // Interest and vote 0 = no , 1 = yes
    let sVote = 0;
    let mVote = 0;
    let hVote = 0;
    let dVote = 0;
    if (sports.checked) {
        sVote = 0;
    } else sVote = 1;
    if (music.checked) {
        mVote = 0;
    } else mVote = 1;
    if (hiking.checked) {
        hVote = 0;
    } else hVote = 1;
    if (dancing.checked) {
        dVote = 0;
    } else dVote = 1;

    let userInterest = new Interest(email, sports.value ,sVote, music.value, mVote, hiking.value, hVote,  dancing.value, dVote)
    
   console.log(userInterest);



    // ---------------- INPUT FOR POST USER IN DB ----------//
    const option1 = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset-UTF-8'
        },
        body: JSON.stringify(
            newUser)
    };
        fetch("http://localhost:7071/api/user", option1)
        
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        inputInterest(userInterest);
            // MISSING SOME IF ELSE STATEMENT TO CHECK FOR DIFFERENT ERRORS //
            console.log("process Succeeded")
            console.log("Done in user transfer")
    
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
        body: JSON.stringify(
            userInterest)
    };
    fetch("http://localhost:7071/api/interest", option2) 
    .then((response) => {
        return response.json();
    })
    .then((data) => {
            // MISSING SOME IF ELSE STATEMENT TO CHECK FOR DIFFERENT ERRORS //
            console.log("Done in Interest transfer")
            alert('We will direct you to your profile')
            window.location.href = "./user.html"; 
    
    }).catch((err) =>{
        console.log(err)
        console.log("Something went wroooong")
    })
}
