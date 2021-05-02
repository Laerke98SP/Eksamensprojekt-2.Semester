// ---------------- DEFINING CREATEUSER BUTTON ------------------- //
var createUser = document.getElementById("getUser");

  // ------------- DEFINING INPUT VARIABLES -----------------//
  var username = document.getElementById("email")
  var code = document.getElementById("password")
  var firstN = document.getElementById("firstName")
  var lastN = document.getElementById("lastName")
  var dateOfBirth = document.getElementById("dob")
  var gend = document.getElementById("gender")
  var descr = document.getElementById("description")
  var min = document.getElementById("min")
  var max = document.getElementById("max")
  var gendPref = document.getElementById("gendPref")

//   var dance = document.getElementById("dance")
//   var football = document.getElementById("football")
//   var technology = document.getElementById("technology")
//   var hiking = document.getElementById("hiking")




// ---------------- CREATEUSER ACTION WHEN CLICK ON BUTTON ---------// 
createUser.addEventListener('click', function(){
    
     //-------------- SAVE INPUT IN LOCALSTORAGE ---------------//
    localStorage.setItem('mail', username.value);
    localStorage.setItem('kodeord', code.value);
    localStorage.setItem('fornavn', firstN.value);
    localStorage.setItem('efternavn', lastN.value);
    localStorage.setItem('dob', dateOfBirth.value);
    localStorage.setItem('køn', gend.value);
    localStorage.setItem('beskrivelse', descr.value);
    localStorage.setItem('min', min.value);
    localStorage.setItem('max', max.value);
    localStorage.setItem('kønPr', gendPref.value);
    // TESTING STATEMENT //
    console.log(username);

    //-------------- CALL CREATEUSER FUNCTION ---------------------//
    saveUser()
});


// ----------------- ACTION FOR CREATEUSER FUNCTION -----------------//
function saveUser(){

    // ------- GET VALUE OF LOCALSTORAGE ITEMS ----------//
    let email = localStorage.getItem('mail');
    let password = localStorage.getItem('kodeord');
    let firstName = localStorage.getItem('fornavn');
    let lastName = localStorage.getItem('efternavn');
    let dob = localStorage.getItem('dob');
    let gender = localStorage.getItem('køn');
    let description = localStorage.getItem('beskrivelse');
    let ageMin = localStorage.getItem('min');
    let ageMax = localStorage.getItem('max');
    let genderPref = localStorage.getItem('kønPr');

   

    // TEST STATEMENT //
    console.log(email);

    // ---------------- INPUT FOR FETCH REQUEST ----------//
    const option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset-UTF-8'
        },
        body: JSON.stringify({
            email: email,
            password: password,
            firstName: firstName,
            lastName:lastName,
            dob: dob,
            gender: gender,
            description: description,
            ageMin: ageMin,
            ageMax: ageMax,
            genderPref: genderPref
        })
    };
    fetch("http://localhost:7071/api/user", option)   
    .then((response) => {
        return response.json()
    })
    .then((data) => {
            // MISSING SOME IF ELSE STATEMENT TO CHECK FOR DIFFERENT ERRORS //
            console.log("process Succeeded")
            console.log(data)
            alert("You will be directed to your profile")
            window.location.href = "./user.html"; 
    
    }).catch((err) =>{
        console.log(err)
        console.log("Something went wroooong")
    })
};
