var _ = require('underscore');
var q = require('q');
var request = require('request');
var config = require('./config.js');
var api = {};

var commonHeaders = {
    'User-Agent': config.hubplanner_user_agent,
    'Authorization': config.hubplanner_api_key,
    'Accept': 'application/json',
    'Content-type': 'application/json'
};

api.getProjects = function(){
    var defered = q.defer(); 
    var options =  {
        url: config.hubplanner_endpoint + 'project',
        json: true,
        headers:commonHeaders
    };
    request(options, function(err, resp, body){
        if (!err && resp.statusCode == 200) {
            var projects = [];
            _.each(body, function(el,ind){
                if(el.status == 'STATUS_ACTIVE'){
                    projects.push(el);
                }
            });
            defered.resolve({'projects':projects});            
        }else{
            defered.reject();
        }
    });
    return defered.promise;
}

api.getTimesheets = function(projectId){
    var defered = q.defer(); 
    var options =  {
        method: 'POST',
        url: config.hubplanner_endpoint + 'timeentry/search',
        json: true,
        headers:commonHeaders,
        body: {"project": "5480a5394bcb73f606dfaff3"}
    };
    request(options, function(err, resp, body){
        if (!err && resp.statusCode == 200) { 
            defered.resolve({'timesheets':body});            
        }else{
            console.log(err, resp);
            defered.reject();
        }
    });
    return defered.promise;
}

module.exports = api;