function showGender(gender) {
    if (gender = 0) {
        return gender = "Female"
    } else if (gender = 1) {
        return gender = "Male"
    };
};

function showGenderPref(genderPref) {
    if (genderPref = 0) {
        return genderPref = "Female"
    } else if (genderPref = 1) {
        return genderPref = "Male"
    };
};

function calculateAge(dob) {
    var age = new Date(dob);
    var diffMS = Date.now() - age.getTime(); //d.d. minus 'age', dsv. differencen udregnes gemmes som ny variabel
    var ageDate = new Date(diffMS); //udregningen af differencen mellem d.d. og 'age' gemmes som ny dato
        return dob = Math.abs(ageDate.getUTCFullYear() - 1970); // getUTCFullYear = omregner til et helt år minus 1970
}; //ovenstående metode udregner objekternes alder ud fra attributterne 'birthYear', 'birthMonth' og birthDate.

let note = document.getElementById('notification');

// ----------------- The logged in users mail -----------//
let userEmail = localStorage.getItem('email');

function checkIfMatch(){
    const option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset-UTF-8'
        },
        body: JSON.stringify({
            email: userEmail
        })
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
            note.innerHTML += "You have a new match"
            return getMatches();
        } else {
            note.innerHTML += "No new matches"
        };
    }).catch((err) =>{
        console.log(err)
        console.log("Something went wroooong")
    });
};

// Lærkes kode!!
function getMatches(){
    // Getting the matches inked to the user email
    fetch(`http://localhost:7071/api/match?email=${userEmail}`)
    .then(function(response) {
        return response.json();
    }).then(function(matches) {
        console.log(matches);
        // Creating a forloop that iterates through matches
        for (i in matches) {
            var age = calculateAge(matches[i][5].value);                            
            // Creating full name
            var fullName = matches[i][3].value + " " + matches[i][4].value;
            var email = matches[i][1].value
            // Calling matches function
            // Saving the matched profiles email and saving the match id
            showMatches(fullName, age, email)
        };
    });
};

function showMatches(name, age, className){
    // Creating html elements
    const holder = document.createElement('div');
    const matchName = document.createElement('h2');
    const matchAge = document.createElement('h4');
    const deleteMatch = document.createElement('button');

    // Inserting values in html elements
    const nameTxt = document.createTextNode(name);
    const ageTxt = document.createTextNode(age);
    const buttonTxt = document.createTextNode('Slet match');

    // Defining id's
    holder.className = 'matchHolder';
    matchName.className = 'matchName';
    matchAge.className = 'matchAge';
    deleteMatch.className = 'deleteMatch';

    // Defining button id as match className
    deleteMatch.id = className;

    // Creating function that runs onClick
    deleteMatch.onclick = function() {
        // Getting the id from the classname
        var match = deleteMatch.id
        var email = localStorage.getItem('mail');
        // Creating API delete request
        const options = { 
            method: 'DELETE', 
            headers: { 
                'Content-type': 'application/json'
            }
        };
        // Contacting match api with id
        fetch(`http://localhost:7071/api/match?email=${email}&match=${match}`, options)
        .then(function() {
            console.log("Match deleted"); 
            return getMatches();
        }).catch(function() {
            console.log("Match not deleted - something went wrong"); 
        });
    };

    // Inserting text into elements
    matchName.appendChild(nameTxt);
    matchAge.appendChild(ageTxt);
    deleteMatch.appendChild(buttonTxt);

    // Inserting elements into div
    holder.appendChild(matchName);
    holder.appendChild(matchAge);
    holder.appendChild(deleteMatch);

    // Insert the final match display
    document.body.appendChild(holder);
};