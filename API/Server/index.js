import express from 'express';

import profileRoutes from '../Routers/Profile.js'


const app = express();
const PORT = 4000;

//bodyparser no longer works, we are using express.json() instead
app.use(express.json());

//as we go further more endpoints will be added
app.use('/profile', profileRoutes);

app.get('/', (req, res) => { res.send('Hello, you have arrived at home page!') });
app.listen( PORT, () => console.log(`Listening to port ${PORT}. Access at: http://localhost:${PORT}`) );





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

