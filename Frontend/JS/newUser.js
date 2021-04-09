let password = document.getElementById("password");
let error1 = document.getElementById("error1");
let error2 = document.getElementById("error2");

// password.addEventListener("keyup", function passwordValidation() { //kører funktionen hver gang en tast trykkes 
//     if(password.value.length < 10) {
//         error1.innerHTML = "<span style='color:red'>Password must be at least 10 characters</span>"; //beskeden forsvinder, når kravet er opfyldt
//     } else {
//         error1.innerHTML = "<span style='color:green'>✓</span>";
//     };
//     if(!password.value.match(/[A-Z]/)) {
//         error2.innerHTML = "<span style='color:red'>Password must contain at least one capital letter</span>"; //beskeden forsvinder, når kravet er opfyldt
//     } else {
//         error2.innerHTML = "<span style='color:green'>✓</span>";
//     }
// });

function newUser(){
    let mail = document.getElementById("mail").value;
    let password = document.getElementById("password").value;
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let dob = document.getElementById("dob").value;
    let genderF = document.getElementById("genderF");
    let genderM = document.getElementById("genderM");
    let interestF = document.getElementById("interestF");
    let interestM = document.getElementById("interestM");
        let gender = null;
        if (genderF.checked) {
            gender = genderF.value;
            gender;
        };
        if (genderM.checked) {
            gender = genderM.value
            gender;
        };
        interest = null;
        if (interestF.checked) {
            interest = interestF.value;
            interest; 
        };
        if (interestM.checked) {
            interest = interestM.value;
            interest;
        };
    const user = { 
        mail, //flere kan oprette sig med samme mail??
        password, 
        firstName, 
        lastName, 
        dob, 
        gender, 
        interest, 
    };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    };
    fetch('http://localhost:4000/profile', options);
    window.location.href="../HTML/specificProfile.html"
    alert("Sign up successfull - WELCOME!");
};