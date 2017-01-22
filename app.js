'use strict';

let express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path');

const app = express();

//Setting up MiddleWare for body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Setitng up middleware for public folders - setting static path
app.use(express.static(path.join(__dirname, 'public')));


//setting up home route
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(3000, () => {
    console.log('Server started on port 3000..');
});
