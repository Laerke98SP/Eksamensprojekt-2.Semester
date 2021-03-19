const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4000;
app.use(bodyParser.json()); // does it not work anymore??

app.get('/', (req, res) => { res.send('Hello, you have arrived at home page!') });
app.listen( PORT, () => console.log(`Listening to port ${PORT}. Access at: http://localhost:${PORT}`) );

