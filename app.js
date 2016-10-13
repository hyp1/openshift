var express = require('express');
var fs      = require('fs');
var parser  = require('body-parser');

var app = express();

//Setup ip adress and port
var ipaddress ;

function initIPAdress() {
    var adr = process.env.OPENSHIFT_NODEJS_IP;
    if (typeof adr === "undefined") {
            //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
            //  allows us to run/test the app locally.
            console.warn('No OPENSHIFT_NODEJS_IP var, using localhost');
            adr = '127.0.0.1';
    }

    ipaddress = adr;
}

var port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;


app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/admin', function (req, res) {
        res.setHeader('Content-Type', 'text/html'); 
        res.send( fs.readFileSync('./index_admin.html') );
})

initIPAdress(); //Setup IP adress before app.listen()

console.log(process.env);
app.listen(port, ipaddress, function() {
        console.log('%s: Node server started on %s:%d ...',
                        Date(Date.now() ), ipaddress, port);
});