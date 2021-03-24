// function login() {
//     var mail = document.getElementById("mail").value;
//     var password = document.getElementById("password").value;
//     fetch(`http://localhost:4000/profile`)
//     .then((response) => response.json())
//     .then((data) => {
//         for(let i = 0; i < data.length; i++) {
//             if(data[i].mail == mail && data[i].password == password) {
//                 rememberProfile(data.id, mail, password); //se nedenfor
//                 window.location.href="../HTML/specificProfile.html"
//                 alert("Log in successful!") 
//                 break;
//             } else {
//             window.location.href="../HTML/login.html"
//             alert("Looks like the e-mail or password is incorret. Please try again or sign up to create an account.")
//             }
//         }
//     });
// };

// function rememberProfile(id, mail, password){
//     localStorage.setItem('id', id);
//     localStorage.setItem('mail', mail);
//     localStorage.setItem('password', password);
// }; //virker af en eller anden grund ikke??


function login() {
    var mail = document.getElementById("mail").value;
    var password = document.getElementById("password").value;
    fetch(`http://localhost:4000/profile`)
    .then((response) => response.json())
    .then((data) => {
        for(let i in data) {
            if(data[i].mail == mail && data[i].password == password) {
                rememberMe(data[i].id, data[i].mail, data[i].password);
                window.location.href = "../HTML/specificProfile.html";
                alert("Log in succesful!")
            }
        alert("Looks like the e-mail or password is incorret. Please try again or sign up to create an account.");
        }
    });
};

function rememberMe(id, mail, password){
    localStorage.setItem('id', id);
    localStorage.setItem('mail', mail);
    localStorage.setItem('password', password);
}; 