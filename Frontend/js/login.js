// Defining variables
var getButton = document.getElementById("getUsers")
// var email = document.getElementById("email").value
// var password = document.getElementById("password").value

// Login 
getButton.addEventListener("click", function(){
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    localStorage.setItem('mail', email);
    localStorage.setItem('kodeord', password);
    login(email, password);
});
    
function login(email, password){
    fetch(`http://localhost:7071/api/user?email=${email}&password=${password}`)
    .then(
        function(response){
            if( response.status == 404){
                console.log( "Brugeren eksistere ikke")
                    //alert("Prøv igen med en anden bruger");
            }
            else if (response.status !== 200){
                console.log("Noget gik galt i script.js client side. " + response.status);
                console.log(response);
                return;
            } else {    
                response.json().then(function (data) {
                    // for(i of data){
                    //     let inc = 1;
                        
                    //     console.log(` ${i.value}`);
                    //     //console.log(i);
                    //     inc++;
                        
                    //     //console.log("test");
                    // };
                    for(i = 1; i< data.length; i++){
                        console.log(data[i].value)

                        //03. Så sættes resten af brugeroplysninger i localstorage så de kan hentes og bruges i profilen
                        localStorage.setItem('fornavn', data[i].value);
                        localStorage.setItem('efternavn', data[i].lastName);
                        localStorage.setItem('dob', data[i].dob);
                        localStorage.setItem('køn', data[i].gender);
                        localStorage.setItem('beskrivelse', data[i].description);
                        localStorage.setItem('min', data[i].ageMin);
                        localStorage.setItem('max', data[i].ageMax);
                        localStorage.setItem('kønPr', data[i].genderPref);
                    // console.log(data);

                    };
                    console.log( "it should work if you reach here script.js client side")
                    alert("You will be directed to your profile")
                    window.location.href = "http://127.0.0.1:5500/cbs_fullstack_example/Frontend/user.html"; 
                })
                .catch(function (err){
                    console.log(err + " Testing err");
                });
            };
        })
};