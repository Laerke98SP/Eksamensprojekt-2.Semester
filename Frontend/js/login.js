// ---------------- DEFINING LOGIN BUTTON ------------------- //
var getButton = document.getElementById("getUser")


// ---------------- LOGIN ACTION WHEN CLICK ON BUTTON ---------// 
getButton.addEventListener("click", function(){
    //  01. DEFINING INPUT VARIABLES 
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value

    // 02. SAVE INPUT IN LOCALSTORAGE 
    localStorage.setItem('mail', email);
    localStorage.setItem('kodeord', password);

    // 03. CALL LOGING FUNCTION 
    login(email, password);
});
    

// ----------------- ACTION FOR LOGIN FUNCTION -----------------//
function login(email, password){
    // ---------- RETRIEVE IN DB A PERSON WITH FOLLOWING MAIL AND PASSWORD ---------//
    fetch(`http://localhost:7071/api/user?email=${email}&password=${password}`)
    .then(
        function(response){
            
            // ------------  403 RESPONSE FOR KLIENT TYPING SOMETHING WRONG---------//
            if( response.status == 403) {
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
                    for(i = 1; i< data.length; i++){
                        console.log(data[i].value)
                        console.log(i);

                        //------------ RETRIEVING THE REST OF USER INFO FROM DB-----------// 
                        localStorage.setItem('fornavn', data[3].value);
                        localStorage.setItem('efternavn', data[4].value);
                        localStorage.setItem('dob', data[5].value);
                        localStorage.setItem('køn', data[6].value);
                        localStorage.setItem('beskrivelse', data[7].value);
                        localStorage.setItem('min', data[8].value);
                        localStorage.setItem('max', data[9].value);
                        localStorage.setItem('kønPr', data[10].value);
                    };

                    // TEST statement
                    console.log( "it should work if you reach here script.js client side")

                    // TEST statement
                    console.log(data[3].value)

                    // ------------- IF EVERYTHING SUCCEEDED - PASS YOU TO YOUR PROFILE -------//
                    alert("You will be directed to your profile")
                    window.location.href = "./user.html"; 
                })
                .catch(function (err){
                    console.log(err + " Testing err");
                });
            };
        });
};