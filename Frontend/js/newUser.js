var form = document.getElementsByClassName("form");
form.addEventListener('submit', function(e) {
    e.preventDefault()

    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    var firstName = document.getElementById("firstName").value
    var lastName = document.getElementById("lastame").value
    var dob = document.getElementById("dob").value
    var gender = document.getElementById("gender").value
    var description = document.getElementById("description").value
    var min = document.getElementById("min").value
    var max = document.getElementById("max").value
    var gendPref = document.getElementById("gendPref").value

    fetch("http://localhost:7071/api/user", {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName ,
            dob: dob,
            gender: gender,
            description: description,
            ageMin: min,
            ageMax: max,
            genderPref: gendPref
        }), 
        headers: {
            "Content-Type": "application/json; charset-UTF-8"
        }
    })
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data)
    }).catch((err) =>{
        console.log(err)
    })
})