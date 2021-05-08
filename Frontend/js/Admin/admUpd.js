


// Lærkes kode!!
function getUsers(){
    // Getting the matches inked to the user email
    fetch(`http://localhost:7071/api/display`)
    .then(function(response) {
        return response.json();
    }).then(function(users) {
        console.log(users);
            for(i = 0; i < users.length; i++){
            console.log(users[i][0].value)
            var email = users[i][0].value
           
            showUsers(email, email)
            }
            // Calling matches function
            // Saving the matched profiles email and saving the match id
            
    });
};

function showUsers(name, mail){
    // Creating html elements
    const holder = document.createElement('div');
    const username = document.createElement('h2');
    
    const updUser = document.createElement('button');

    // Inserting values in html elements
    const nameTxt = document.createTextNode(name);
   
    const buttonTxt = document.createTextNode('Update user');

    // Defining id's
    holder.className = 'Holder';
    username.className = 'Name';
    // matchAge.className = 'matchAge';
    updUser.className = 'updUser';

    // Defining button id as match className
    updUser.id = mail;

    // Creating function that runs onClick
    updUser.onclick = function() {
        // Getting the id from the classname
        localStorage.setItem('email', name)
     
        window.location.href = "../Admin/editUser.html"; 
    }
    // Inserting text into elements
    username.appendChild(nameTxt);
    updUser.appendChild(buttonTxt);

    // Inserting elements into div
    holder.appendChild(username);
    // holder.appendChild(matchAge);
    holder.appendChild(updUser);

    // Insert the final match display
    document.body.appendChild(holder);
};