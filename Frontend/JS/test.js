var form = document.getElementById("form")

var getButton = document.getElementById("getUsers")

getButton.addEventListener("click", function(){
    var email = document.getElementById("email").value
    fetch(`http://localhost:7071/api/user?name=${email}`)
        .then(
            function(response){
                if (response.status !== 200){
                    console.log("Noget gik galt" + response.status);
                    return;
                }

                response.json().then(function (data) {
                    console.log(data);
                });
            }
        )
        .catch(function (err){
            console.log(err);
        });
})