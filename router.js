var express = require('express');
var router = express.Router();
var api = require('./api.js');

/*===================== API Endpoints ====================*/
//Timesheet endpoint - Send the project id and we'll get the timesheets
router.get('/timesheets/:projectId', function(req,res){
    api.getTimesheets(req.params.projectId).then(function(result){
        res.json(result);
    });
});

//Project endpoint, just list out all projects
router.get('/projects', function(req,res){
    api.getProjects().then(function(result){
        res.send(result);
    });
});


/*===================== Page Endpoints =====================*/
router.get('/', function(req,res){
    res.render('home'); 
});

module.exports = router;