// ---------------- DEFINING CREATEUSER BUTTON ------------------- //
var createUser = document.getElementById("getUser");

// TEST STATEMENT //
console.log("test in first line in frontend");


// ---------------- CREATEUSER ACTION WHEN CLICK ON BUTTON ---------// 
createUser.addEventListener('click', function(){
    // ------------- DEFINING INPUT VARIABLES -----------------//
    var username = document.getElementById("email").value
    var code = document.getElementById("password").value
    var firstN = document.getElementById("firstName").value
    var lastN = document.getElementById("lastName").value
    var dateOfBirth = document.getElementById("dob").value
    var gend = document.getElementById("gender").value
    var descr = document.getElementById("description").value
    var min = document.getElementById("min").value;
    var max = document.getElementById("max").value;
    var gendPrefF = document.getElementById("genderPrefF");
    var gendPrefM = document.getElementById("genderPrefM")
    var intSports = document.getElementById("sports");
    var intMusic = document.getElementById("music");
    var intHiking = document.getElementById("hiking");
    var intDancing = document.getElementById("dancing");
    convertDate(dateOfBirth);
    console.log(dateOfBirth);
    var gend = null;
    if (gendM.checked) { //tjekker hvilken gender-vÃ¦rdi der er tjekket af
        gend = gendM.value;
        console.log(gendM);
        gend;
    };
    if (gende.checked) {
        gend = gendF.value;
        gend;
    };
    var gendPref = null;
    if (gendPrefM.checked) { //tjekker hvilken gender-vÃ¦rdi der er tjekket af
        gendePef = gendPrefM.value;
        gendPref;
    };
    if (gendPrefF.checked) {
        gendPref = gendPrefF.value;
        gendPref;
    var interests = {};
    if (intSports.checked) {
        interests += intSports.value;
        interests;
    };
    if (intMusic.checked) {
        interests += intMusic.value;
        interests;
    };
    if (intHiking.checked) {
        interests += intHiking.value;
        interests;
    };
    if (intDancing.checked) {
        interests += intDancing.value;
        interests;
    };
    console.log(interests);

    // TESTING STATEMENT //
    console.log("Testing add eventlistener in frontend");
    //-------------- SAVE INPUT IN LOCALSTORAGE ---------------//
    localStorage.setItem('brugernavn', username);
    localStorage.setItem('kodeord', code);
    localStorage.setItem('fornavn', firstN);
    localStorage.setItem('efternavn', lastN);
    localStorage.setItem('fødselsdato', dateOfBirth);
    localStorage.setItem('køn', gend);
    localStorage.setItem('beskrivelse', descr);
    localStorage.setItem('min', min);
    localStorage.setItem('max', max);
    localStorage.setItem('kønpræf', gendPref);

    // TEST STATEMENTS //
    console.log(lastN);
    console.log(min);

    //-------------- CALL CREATEUSER FUNCTION ---------------------//
    saveUser();

    // TEST STATEMENT //
    console.log("Done executing submit button")
});


// ----------------- ACTION FOR CREATEUSER FUNCTION -----------------//
function saveUser(){

    // ------- GET VALUE OF LOCALSTORAGE ITEMS ----------//
    let email = localStorage.getItem('brugernavn');
    let password = localStorage.getItem('kodeord');
    let firstName = localStorage.getItem('fornavn');
    let lastName = localStorage.getItem('efternavn');
    let dob = localStorage.getItem('fødselsdato');
    let gender = localStorage.getItem('køn');
    let description = localStorage.getItem('beskrivelse');
    let ageMin = localStorage.getItem('min');
    let ageMax = localStorage.getItem('max');
    let genderPref = localStorage.getItem('kønpræf');

    // TEST STATEMENT //
    console.log(ageMin);

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
