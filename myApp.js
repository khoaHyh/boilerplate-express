var express = require('express');
var app = express();
var bodyParser = require('body-parser');
require('dotenv').config();

/* 7. Implement a Root-Level Request Logger Middleware */
app.use((req, res, next) => {
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
});


/* 11. Use body-parser to Parse POST Requests */
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

/* 1. Meet the Node console */
console.log("Hello World");

/* 3. Serve an HTML File */
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

/* 4. Serve Static Assets */
app.use(express.static(__dirname + "/public"));

/* 6. Use the .env File */
app.get('/json', (req, res) => {
    let response = { "message": "HELLO JSON" };
    if (process.env.MESSAGE_STYLE === 'uppercase') {
        response.message = response.message.toUpperCase();
    }
    res.status(200).json(response);
});

/* 8. Chain Middleware to create a Timer Server */
app.get('/now', (req, res, next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.status(200).json({ "time": req.time });
});

/* 9. Get Route Parameter Input from the Client */
app.get('/:word/echo', (req, res) => {
    res.status(200).json({ echo: req.params.word });
});

/* 10. Get Query Parameter Input from the Client */
app.route('/name')
    .get((req, res) => {
        res.status(200).json({ name: `${req.query.first} ${req.query.last}`});
    })
    /* 12. Get Data from POST Requests */
    .post((req, res) => {
        res.status(200).json({ name: `${req.body.first} ${req.body.last}`});
    });





























 module.exports = app;
