/**
 * @fileOverview Server file that handles all the requests
 * @author Hozaifa Abdalla
 * @version 1.0.0
 * @module server js
 */

/* LIBRARY IMPORTS */
var express = require('express');
var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var fs = require('fs');
var app = express();
var bodyParser = require("body-parser");
var server = require('http').createServer(app);
var gpio = require('rpi-gpio');
var pin = 18;
var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var signal = new Gpio(pin, 'out'); //use GPIO pin 4, and specify that it is output
//var path = require('path');
//var root = path.dirname(require.main.filename);

var root = '/home/pi/Desktop/DoorServerHoz';
/* Express Body Parser*/
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

/* Serving static files*/
app.use(express.static(root + '/DoorComps'));

app.get('/', function(req, res) {
    fs.readFile(root + '/DoorComps/index.html', 'utf8', function(err, data) {
        if (!err) res.send(data);
        else return console.log(err);
    });
});

app.post('/door', function(req, res) {
    console.log("received request!");
    console.log(req.connection.remoteAddress);
    signal.writeSync(1);
    sleep(1000);
    signal.writeSync(0);
    res.send("Successful");
});

/**
 * Server function for listening for request on the port 8080
 * @function
 * @param {string} - The string url for the port
 * @param {callback} - The callback function
 * @module beacon js
 */
var server = app.listen(process.env.PORT || '8080', '0.0.0.0', function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('running at http://' + host + ':' + port + "/");
});

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
