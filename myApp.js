var express = require('express');
var app = express();
require('dotenv').config();

console.log("Hello World");
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

app.use(express.static(__dirname + "/public"));

app.get('/json', (req, res) => {
    let response = {"message": "Hello json"};
    if (process.env.MESSAGE_STYLE === 'uppercase') {
        response.message = response.message.toUpperCase();
    }
    res.json({response});
});
































 module.exports = app;
