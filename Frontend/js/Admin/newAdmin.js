// ---------------- DEFINING CREATEUSER BUTTON ------------------- //
var createUser = document.getElementById("getUser");



class Admin{
    constructor(email,password){
        this.email = email
        this.password = password
    }
};



// ---------------- CREATEUSER ACTION WHEN CLICK ON BUTTON ---------// 
createUser.addEventListener('click', function(){

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;


     //-------------- SAVE INPUT IN LOCALSTORAGE ---------------//
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
 

    //-------------- CALL CREATEUSER FUNCTION ---------------------//
    saveUser()

});

// ----------------- ACTION FOR CREATEUSER FUNCTION -----------------//
function saveUser(){



    // ------- GET VALUE OF LOCALSTORAGE ITEMS ----------//
    let email = localStorage.getItem('email');
    let password = localStorage.getItem('password');
 
    let newAdm = new Admin( email, password)

    // ---------------- INPUT FOR POST USER IN DB ----------//
    const option1 = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset-UTF-8'
        },
        body: JSON.stringify(newAdm)
        };
        fetch("http://localhost:7071/api/inspector", option1)
        
    .then((response) => {
        return response.json();
    })
    .then((data) => {
     console.log(data)
     window.location.href = "./1statistic.html"; 
    
    }).catch((err) =>{
        console.log(err)
        console.log("Something went wroooong")
    })
};


