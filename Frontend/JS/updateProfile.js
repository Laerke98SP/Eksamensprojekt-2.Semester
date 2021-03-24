let password = document.getElementById("password");
let error1 = document.getElementById("error1");
let error2 = document.getElementById("error2");

password.addEventListener("keyup", function passwordValidation() { //kører funktionen hver gang en tast trykkes 
    if(password.value.length < 10) {
        error1.innerHTML = "<span style='color:red'>Password must be at least 10 characters</span>"; //beskeden forsvinder, når kravet er opfyldt
    } else {
        error1.innerHTML = "<span style='color:green'>✓</span>";
    };
    if(!password.value.match(/[A-Z]/)) {
        error2.innerHTML = "<span style='color:red'>Password must contain at least one capital letter</span>"; //beskeden forsvinder, når kravet er opfyldt
    } else {
        error2.innerHTML = "<span style='color:green'>✓</span>";
    }
});
function updateProfile() {
    let mail = localStorage.getItem('mail');
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let password = document.getElementById("password").value;
    let interestM = document.getElementById("interestM");
    let interestF = document.getElementById("interestF");
    let genderM = document.getElementById("genderM");
    let genderF = document.getElementById("genderF");
    user = {};
    if(mail) {
        user.password = password;
    };
    if(password) {
        user.password = password;
    };
    if(firstName) {
        user.firstName = firstName;
    };
    if(lastName) {
        user.lastName = lastName;
    };
    gender = null;
    if(genderF.checked) {
        gender = genderF.value;
        gender;
    };
    if(genderM.checked) {
        gender = genderM.value
        gender;
    };
    interest = null;
    if(interestF.checked) {
        interest = interestF.value;
        interest; 
    };
    if(interestM.checked) {
        interest = interestM.value;
        interest;
    };
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    };
    fetch(`http://localhost:8000/profile/${id})`, options) //hvordan finder jeg id på brugeren?
        window.location.href = "../HTML/specificProfile.html";
        alert("Your changes has been saved!")
}; 