// ---------------- DEFINING CREATEUSER BUTTON ------------------- //
var createUser = document.getElementById("getUser");

// TEST STATEMENT //
console.log("test in first line in frontend");

// ----------------- ACTION FOR CREATEUSER FUNCTION -----------------//
function saveUser(){
    // ------- GET VALUE OF LOCALSTORAGE ITEMS ----------//
    var email = localStorage.getItem('Email');
    var password = localStorage.getItem('Password');
    var firstName = localStorage.getItem('Fornavn');
    var lastName = localStorage.getItem('Efternavn');
    var dob = localStorage.getItem('Fødselsdato');
    var gender = localStorage.getItem('Køn');
    var desc = localStorage.getItem('Beskrivelse');
    var ageMin = localStorage.getItem('Minimumsalder');
    var ageMax = localStorage.getItem('Maximumsalder');
    var genderPref = localStorage.getItem('Kønspræference');
    // TEST STATEMENT //
    console.log(ageMin);
    console.log(ageMax);
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
            lastName: lastName,
            dob: dob,
            gender: gender,
            desc: desc,
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
        window.location.href = "/Frontend/user.html"; 
    }).catch((err) =>{
        console.log(err)
        console.log("Something went wroooong")
    });
};

function convert(dobBefore){
    var dobArray = dobBefore.split("/");
    var dobAfter = dobArray[2] + '/' + dobArray[1] + '/' + dobArray[0];
    return dobAfter; 
};

// ---------------- CREATEUSER ACTION WHEN CLICK ON BUTTON ---------// 
createUser.addEventListener('click', function(){
    // ------------- DEFINING INPUT VARIABLES -----------------//
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var dob = document.getElementById("dob").value;
    var genderF = document.getElementById("genderF");
    var genderM = document.getElementById("genderM");
    var desc = document.getElementById("desc").value;
    var ageMin = document.getElementById("ageMin").value;
    var ageMax = document.getElementById("ageMax").value;
    var genderPrefF = document.getElementById("genderPrefF");
    var genderPrefM = document.getElementById("genderPrefM");
    console.log("so far");
    convert(dob);
    var gender = null;
    if (genderM.checked) { //tjekker hvilken gender-værdi der er tjekket af
        gender = genderM.value;
        console.log(genderM);
        gender;
    };
    if (genderF.checked) {
        gender = genderF.value;
        gender;
    };
    var genderPref = null;
    if (genderPrefM.checked) { //tjekker hvilken gender-værdi der er tjekket af
        genderPref = genderPrefM.value;
        genderPref;
    };
    if (genderPrefF.checked) {
        genderPref = genderPrefF.value;
        genderPref;
    };
    console.log("so good");
    // TESTING STATEMENT //
    console.log("Testing add eventlistener in frontend");
    //-------------- SAVE INPUT IN LOCALSTORAGE ---------------//
    localStorage.setItem('Email', email);
    localStorage.setItem('Password', password);
    localStorage.setItem('Fornavn', firstName);
    localStorage.setItem('Efternavn', lastName);
    localStorage.setItem('Fødselsdato', dob);
    localStorage.setItem('Køn', gender);
    localStorage.setItem('Beskrivelse', desc);
    localStorage.setItem('Minimumsalder', ageMin);
    localStorage.setItem('Maksimumsalder', ageMax);
    localStorage.setItem('Kønspræference', genderPref);
    // TEST STATEMENTS //
    console.log(lastName);
    console.log(ageMin);
    //-------------- CALL CREATEUSER FUNCTION ---------------------//
    saveUser();
    // TEST STATEMENT //
    console.log("Done executing submit button");
});


