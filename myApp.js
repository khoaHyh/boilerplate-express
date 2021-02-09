var express = require('express');
var app = express();
var bodyParser = require('body-parser');
require('dotenv').config();

app.use((req, res, next) => {
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

console.log("Hello World");
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

app.use(express.static(__dirname + "/public"));

app.get('/json', (req, res) => {
    let response = { "message": "HELLO JSON" };
    if (process.env.MESSAGE_STYLE === 'uppercase') {
        response.message = response.message.toUpperCase();
    }
    res.status(200).json(response);
});

app.get('/now', (req, res, next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.status(200).json({ "time": req.time });
});

app.get('/:word/echo', (req, res) => {
    res.status(200).json({ echo: req.params.word });
});

app.route('/name')
    .get((req, res) => {
        res.status(200).json({ name: `${req.query.first} ${req.query.last}`});
    })
    .post((req, res) => {
        res.status(200).json({ name: `${req.body.first} ${req.body.last}`});
    });





























 module.exports = app;
