function newUser(){
    var mail = document.getElementById("mail").value;
    var password = document.getElementById("password").value;
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var dob = document.getElementById("dob").value;
    var genderF = document.getElementById("genderF");
    var genderM = document.getElementById("genderM");
    var interestF = document.getElementById("interestF");
    var interestM = document.getElementById("interestF");
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
        mail, 
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
    alert("You have now created an account.");
};