
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var config = require('cloud-env')

var app = express();

// all environments
app.set('port', process.env.PORT || 8080);
//app.set('views', __dirname + '/views');
//app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var ipaddress ;

function initIPAdress() {
    var adr = process.env.OPENSHIFT_NODEJS_IP;
    if (typeof adr === "undefined") {
            //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
            //  allows us to run/test the app locally.
            console.warn('No OPENSHIFT_NODEJS_IP var, using localhost');
            adr = 'localhost';
    }

    ipaddress = adr;
}

//app.get('/', routes.index);
//app.get('/users', user.list);

 console.log(process.env);
http.createServer(app).listen(config.PORT,config.IP, function(){
	 console.log("Listening on "+config.IP+", port "+config.PORT);
});
