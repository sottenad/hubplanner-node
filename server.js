var _ = require('underscore');
var express = require('express');
var expresshbs = require('express-handlebars');
var request = require('request');
var config = require('./config.js');
var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.get('/', function(req,res){
    res.render('home'); 
});

app.get('/projects', function(req,res){
    res.format({
        'application/json': function(){
            var json = getProjects();
            return json
        }        
    })
});

var server = app.listen(3000,function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('Im listening at http://%s:%s', host, port);
});

var getReqOptions = function(endpoint){ 
   var options =  {
    url: config.hubplanner_endpoint + endpoint,
    headers:{
        'User-Agent': config.hubplanner_user_agent,
        'Authorization': config.hubplanner_api_key,
        'Accept': 'application/json',
        'Content-type': 'application/json'
    }
   };
  return options;
} 

var getProjects = function(){
    var projectReq = getReqOptions('project');
    request(projectReq,function(err, resp, body){
        if (!err && resp.statusCode == 200) {
            var json = JSON.parse(body);
            var projects = [];
            _.each(json, function(el,ind){
                if(el.status == 'STATUS_ACTIVE'){
                    projects.push(el);
                }
            });
        }else{
            console.log(err);   
        }
    });
}


        