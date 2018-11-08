// imports
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');

var app = express();

app.use(bodyparser.json());

const route = require('./route');

var port = 3000;

app.use(cors());

app.use('/api', route);

mongoose.connect('mongodb://Qwerty1234:Qwerty1234@ds131329.mlab.com:31329/meancontactsdb', function(err){
    if(err) {
        console.log(err);
    }
    else {
        console.log('Connected to DB');
    }
});


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send('Server listens!');
});

app.listen(port, () => {
    console.log("Server listening on port - " + port);
});