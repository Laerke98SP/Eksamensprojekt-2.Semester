const logout = document.getElementById('logout');

const countU = document.getElementById('countU');
const countM = document.getElementById('countM');

const show = document.getElementById('show');
const mail = document.getElementById('mail');
const edit = document.getElementById('edit');



logout.addEventListener('click', function(){
    alert('loggin admin out');
    window.location.href = "../User/0frontpage.html";
});


function showStats(){
    userStats();
    matchStats();
};
function userStats(){
    fetch(`http://localhost:7071/api/countUsers`)
    .then(
        function(response){
            if (response.status !== 200){
                console.log("Noget gik galt" + response.status);
                console.log(response);
                return;
            } else {  
                response.json().then(function (data) {
                console.log('succes!')
                console.log(data)
                console.log(data[0].value)
                countU.innerHTML = data[0].value
                })
                .catch(function(err){
                    console.log(err + 'error besked fra klient siden')
                });
            };
    });
};
function matchStats(){
    fetch(`http://localhost:7071/api/countMatches`)
    .then(
        function(response){
            if (response.status !== 200){
                console.log("Noget gik galt" + response.status);
                console.log(response);
                return;
            } else {  
                response.json().then(function (data) {
                console.log('succes!')
                console.log(data)
                countM.innerHTML = data[0].value
                })
                .catch(function(err){
                    console.log(err + 'error besked fra klient siden')
                });
            };
    });
}

function showUsers(){
    
    displayU();
    
};

function displayU(){
    console.log("test0")
    fetch(`http://localhost:7071/api/display`)
    .then(
        function(response){
            console.log("test1")
            // ------------  403 RESPONSE FOR KLIENT TYPING SOMETHING WRONG---------//
            if( response.status == 400) {
                alert( "Der er ingen brugere");
            }
            // --------------- IF NOT 200 RESONSE CODE & NOT 404 SOMETHING ELSE WENT WRONG --//
            else if (response.status !== 200){
                console.log("Noget gik galt i script.js client side. " + response.status);
                console.log(response);
                return;
            } else {    
                // ----------- IF 200 RESPONSE CODE IT SUCCEEDED ---------------------//
                response.json().then(function (data) {
                    console.log(data)
                    let result = [] 
                    for( i = 0; i< data.length; i++){

                        result.push(data[i][0]);
                        
                    } 
                    for(i=0; i<result.length; i++){
                        console.log(result[i].value)
                        show.innerHTML += 
                        "<p>"+ result[i].value + "</p>";
                    }
                    console.log()
                })
                .catch(function (err){
                    console.log(err + " dette er err");
                });
            };
        });
};

edit.addEventListener('click', function(){
    editUser();
})

function editUser(){
   
    localStorage.setItem('mail', mail.value)

    let email = localStorage.getItem('mail');
    fetch(`http://localhost:7071/api/admEditUser?email=${email}`)
    .then(
        function(response){
            
            // ------------  403 RESPONSE FOR KLIENT TYPING SOMETHING WRONG---------//
            if( response.status == 404) {
                alert( "Kodeord eller brugernavn er forkert - har du ikke en bruger opret gerne en");
            }
            // --------------- IF NOT 200 RESONSE CODE & NOT 404 SOMETHING ELSE WENT WRONG --//
            else if (response.status !== 200){
                console.log("Noget gik galt i script.js client side. " + response.status);
                console.log(response);
                return;
            } else {    
                // ----------- IF 200 RESPONSE CODE IT SUCCEEDED ---------------------//
                response.json().then(function (data) {
                    

                        //------------ RETRIEVING THE REST OF USER INFO FROM DB-----------//
                        
                        localStorage.setItem('password', data[2].value);
                        localStorage.setItem('firstName', data[3].value);
                        localStorage.setItem('lastName', data[4].value);
                        localStorage.setItem('dob', data[5].value);
                        localStorage.setItem('gender', data[6].value);
                        localStorage.setItem('description', data[7].value);
                        localStorage.setItem('ageMin', data[8].value);
                        localStorage.setItem('ageMax', data[9].value);
                        localStorage.setItem('genderPref', data[10].value);
                    

                    // TEST statement
                    console.log( "it should work if you reach here script.js client side")

                  

                    // ------------- IF EVERYTHING SUCCEEDED - PASS YOU TO YOUR PROFILE -------//
                    alert("You will be directed to the users profile")
                    window.location.href = "./editUser.html"; 
                })
                .catch(function (err){
                    console.log(err + " Testing err");
                });
            };
        });
}