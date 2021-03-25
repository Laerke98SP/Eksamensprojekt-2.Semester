import express from 'express';
import profileRoutes from './Routers/Profile.js'
import fs from 'fs';

const app = express();
const PORT = 4000;

//bodyparser no longer works, we are using express.json() instead
app.use(express.json());
app.use(express.static('../Frontend')); 

//as we go further more endpoints will be added
app.use('/profile', profileRoutes);

// app.get('/', (req, res) => { res.send('Hello, you have arrived at home page!') });
app.listen( PORT, () => console.log(`Listening to port ${PORT}. Access at: http://localhost:${PORT}`) );




// 01. Create paths
app.get('/', (req, res) => {
    fs.readFile('../Frontend/HTML/frontpage.html', 'utf8', function(err, text){
        res.send(text); // tilføj noget hvis error
    }); 
}); 

app.get('/newUser', (req, res) => {
    fs.readFile('../Frontend/HTML/newUser.html', 'utf8', function(err, text){
        res.send(text); // tilføj noget hvis error
    }); 
}); 

app.get('/login', (req, res) => {
    fs.readFile('../Frontend/HTML/login.html', 'utf8', function(err, text){
        res.send(text); // tilføj noget hvis error
    }); 
}); 

/*
OLD VERSION

const express = require('express');
const bodyParser = require('body-parser');

const profileRoutes = require('../Routers/Profile').default();


const app = express();
const PORT = 4000;
app.use(bodyParser.json()); // does it not work anymore??
app.use('/profile', profileRoutes);

app.get('/', (req, res) => { res.send('Hello, you have arrived at home page!') });
app.listen( PORT, () => console.log(`Listening to port ${PORT}. Access at: http://localhost:${PORT}`) );
*/

