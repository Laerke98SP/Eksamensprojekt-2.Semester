let ageMin = 27;
let ageMax = 50;
let genderPref = 1;


function UserPref(){
    fetch(`http://localhost:7071/api/preference?ageMin=${ageMin}&ageMax=${ageMax}&genderPref=${genderPref}`)
    .then(function(response){
        return response.json(); // returnere et promise
    })
    .then(function(data){ 
        console.log(data);
     
    })
    .catch(function(err){
        //Hvis der opstår en fejl fanges den her
        console.log(err);
    }).finally((data) => {
       
    });
};

