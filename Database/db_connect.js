// LINK : https://docs.microsoft.com/en-us/sql/connect/node-js/step-3-proof-of-concept-connecting-to-sql-using-node-js?view=sql-server-ver15 

// config filen connecter til database og den skal IKKE pushes til GIT

// VIGTIGT! Lav jeres config fil om til js i stedet for json. Den skal inkludere "export default" i toppen
import config from './config.js'; 

// Impoterer klasserne var tideous
import { Connection, Request } from 'tedious'; 


// Skaber en ny connection objekt
var connection = new Connection(config)


// når alle input er connected i config filen til databasen
// Kan vi teste om den consoler connected - 
connection.on('connect', function(err){ // .ON function og kalder en callback funktion som triggers på err
    if(err){
        console.log(err)
    } else {
        console.log("connected"); // Console logger connected
        const response = executeSQL(); // ved connectionen act på vores SQL statement
        console.log(response); // Giver os et tomt objekt i console 
    }
});

// kalder funktionen connect og console logger connected , som viser vi er på databasen
connection.connect();

// funktion til at eksekvere statement til sql, bruger Request klassen.
function executeSQL(){
    // All SQL queries are executed using the new Request() function
    var request = new Request("SELECT * FROM Profile", function(err){ // Input til request klassen skal være SQL
        if(err){
            console.log(err) // Hvis fejl hvis i konsollen
        }
    })
    connection.execSql(request) // execSQL er funktionen man bruger til at execute SQL på REQUEST
    var counter = 1 // første object hedder 1 
    var response = {};

    //If the statement returns rows, such as a select statement, you can retrieve them using the request.on() function. If there are no rows, the request.on() function returns empty lists
    request.on('row', function(columns){ // skal ske når vi for rows ud , det gør vi på kolonner
        response[counter] = {};
        columns.forEach(function(column){ // Løber igennem alle kolonner
            response[counter][column.metadata.colName] = column.value // Henter værdien 
        });
        counter += 1; // stiger counter
    })
    return response;
};

//execureSQL();


// --------- METODE MED REQUIRE, SKAL STÅ I TOPPEN HVIS DEN SKAL BRUGES -----------
// Bibliotek der hedder tedious 
//var Connection = require('tedious').Connection; // installer npm tedious

// hvordan vi sender en sql query
//var Request = require('tedious').Request; // klasse der hedder request

// Vi reqiuire vores CONFIG fil 
//const config = require('./config.json') // Kan testes om den virker vi at console logge filen :D
// New connection - connect to database



// var connection = new Connection(config); // Det er en klasse, og vi loader vores connection med vores config
// Nu har vi en connection etableret til vores db