var express = require('express');
var expresshbs = require('express-handlebars');
var app = express();
var router = express.Router();

app.engine('handlebars', expresshbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

var server = app.listen(3000,function(){
    var port = server.address().port;
    console.log('Im listening at port %s', port);
});


//Send all requests to our main router
var router = require('./router');
app.use('/', router);






