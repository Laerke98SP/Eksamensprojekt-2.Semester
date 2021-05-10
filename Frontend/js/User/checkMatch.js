// 01. Function that check if ther
function checkIfMatch(){
    let email = localStorage.getItem('email');
    const option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset-UTF-8'
        },
        body: JSON.stringify({
            email: email
        })
    };
    // Insert match if both user like eachother
    fetch(`http://localhost:7071/api/match`, option)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
    // MISSING SOME IF ELSE STATEMENT TO CHECK FOR DIFFERENT ERRORS //
        console.log("Process succeeded")
        console.log(data)
        if( data.status == 'Success' ){
           
            message();
        };
    }).catch((err) =>{
        console.log(err)
        console.log("Something went wroooong")
    });
};


// 09. function for notification
function message(){
    let result = 0;
    let email = localStorage.getItem('email');
    
     // Getting the matches inked to the user email
     fetch(`http://localhost:7071/api/match?email=${email}`)
        .then(function(response) {
            return response.json();
        }).then(function(matches) {
            if(localStorage.getItem("counter") !== null){
                var counter = localStorage.getItem("counter");
                console.log(counter);
            } else var counter = 0;
            // console.log(matches);
            //Creating a forloop that iterates through matches
            for (i in matches) {
                result++;
            }; 
            if(result > counter) {
                // console.log(counter)
                document.getElementById("badge").style.display = "block"; // Element will  be displayed
                counter = result;
                localStorage.setItem('counter', counter)
                //console.log(counter + " if there are more in match than counter")
            } else if(result <= counter) {
                document.getElementById("badge").style.display = "none"; // Element will not be displayed
                //console.log(result + " + " + counter); 
                counter = result;
                localStorage.setItem('counter', counter)
               // console.log(counter + " if there are less in match than counter")
            }
        });
    };