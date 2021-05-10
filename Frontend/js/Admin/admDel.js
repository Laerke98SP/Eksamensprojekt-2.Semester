
function getUsers(){
    // Getting the uses linked to the user email
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
    });
};

function showUsers(name, mail){
    // Creating html elements
    const holder = document.createElement('div');
    const username = document.createElement('h2');
    
    const deleteMatch = document.createElement('button');

    // Inserting values in html elements
    const nameTxt = document.createTextNode(name);
    const buttonTxt = document.createTextNode('Delete user');

    // Defining id's
    holder.className = 'Holder';
    username.className = 'Name';
    deleteMatch.className = 'deleteMatch';

    // Defining button id as match className
    deleteMatch.id = mail;

    // Creating function that runs onClick
    deleteMatch.onclick = function() {
        // Getting the id from the classname
        var email = deleteMatch.id
       
        // Creating API delete request
        const options = { 
            method: 'DELETE', 
            headers: { 
                'Content-type': 'application/json'
            }
        };
        // Contacting api with email
        fetch(`http://localhost:7071/api/display?email=${email}`, options)
        .then(function() {
            console.log("User deleted"); 
            location.reload();
            return getUsers();
        }).catch(function() {
            console.log("User not deleted - something went wrong"); 
        });
    };

    // Inserting text into elements
    username.appendChild(nameTxt);
    deleteMatch.appendChild(buttonTxt);

    // Inserting elements into div
    holder.appendChild(username);
    holder.appendChild(deleteMatch);

    // Insert the final to display
    document.body.appendChild(holder);
};