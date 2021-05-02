

const logout = document.getElementById('logout');

const countU = document.getElementById('countU');
const countM = document.getElementById('countM');

const show = document.getElementById('show');

logout.addEventListener('click', function(){
    alert('loggin admin out');
    window.location.href = "../User/frontpage.html";
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
                        show.innerHTML += result[i].value
                    }
                })
                .catch(function (err){
                    console.log(err + " dette er err");
                });
            };
        });
};