const logout = document.getElementById('logout');

const countU = document.getElementById('countU');
const countM = document.getElementById('countM');

const show = document.getElementById('show');
const mail = document.getElementById('mail');



logout.addEventListener('click', function(){
    alert('loggin admin out');
    window.location.href = "../User/0frontpage.html";
});


function userStats(){
    // Get request for the count user HTTP trigger
    fetch(`http://localhost:7071/api/countUsers`)
    .then(
        function(response){
            if (response.status !== 200){
                console.log("Noget gik galt" + response.status);
                console.log(response);
                return;
            } else {  
                response.json().then(function (data){
                    // messeges logged so it is visible that it suceeded 
                    console.log('succes!');
                    console.log(data);

                    // inserting the data in the predefined place
                    countU.innerHTML = data;

                    // calling the matchStats function
                    matchStats();
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
                countM.innerHTML = data
                })
                .catch(function(err){
                    console.log(err + 'error besked fra klient siden')
                });
            };
    });
}

