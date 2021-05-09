// ---------------- DEFINING LOGIN BUTTON ------------------- //
var getButton = document.getElementById("getUser")


// ---------------- LOGIN ACTION WHEN CLICK ON BUTTON ---------// 
getButton.addEventListener("click", function(){
    //  01. DEFINING INPUT VARIABLES 
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value

    // 02. SAVE INPUT IN LOCALSTORAGE 
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);

    // 03. CALL LOGING FUNCTION 
    login(email, password);
});
    

// ----------------- ACTION FOR LOGIN FUNCTION -----------------//
function login(email, password){
    // ---------- RETRIEVE IN DB A PERSON WITH FOLLOWING MAIL AND PASSWORD ---------//
    fetch(`http://localhost:7071/api/user?email=${email}&password=${password}`)
    .then(
        function(response){
            // ------------  404 RESPONSE FOR KLIENT TYPING SOMETHING WRONG---------//
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
                    console.log(data)
                    
                       

                        //------------ RETRIEVING THE REST OF USER INFO FROM DB-----------//
                        localStorage.setItem('email', data.email );
                        localStorage.setItem('password', data.password );
                   

                    // ------------- IF EVERYTHING SUCCEEDED - PASS YOU TO YOUR PROFILE -------//
                    // alert("You will be directed to your profile")
                    window.location.href = "./1user.html"; 
                })
            }
        })
    .catch(function (err){
        console.log(err + " Testing err");
    });
};