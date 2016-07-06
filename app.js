var express  = require('express');
var app = express();
var fs =require('jsonfile');
var bp = require('body-parser')
app.use(bp.urlencoded({extend: false}));
app.use(bp.json());

var TASK_FILE = __dirname + "/"  + "tasks.json";
var MERRIT_FILE = __dirname + "/"  + "merrits.json";

app.get('/getTasks', function(req, resp) {
	fs.readFile(TASK_FILE, "utf8", function(err, data){
		console.log(data);
		resp.end(JSON.stringify(data));
	});
});

app.get('/getMerrits', function(req, resp) {
	fs.readFile(MERRIT_FILE, "utf8", function(err, data){
		console.log(data);
		resp.end(JSON.stringify(data));
	});
});

app.post('/taskDone', function(req, resp){
	fs.readFile(MERRIT_FILE, "utf8", function(err, data){
		console.log('All rq ' + JSON.stringify(req.body));
		
		var kid = req.body.kid;
		var grId = req.body.taskGrID;
		var taskID = req.body.taskID;

		console.log(kid);
		console.log(grId);
		console.log(taskID);

		if (typeof(data[kid]) !== 'undefined')		
		{		
			data[kid]['done'].forEach(function(el){
				if (el['taskGroupID'] == grId && el['taskID'] == taskID){
					el['noOfTimes']++;
				}
			});	
			console.log(data[kid]);
			fs.writeFile(MERRIT_FILE, data, function(err, wdata){
				if (err) console.log(err);
				console.log('writen');
			});	
		
		}
		resp.end();
	});	
})

var server = app.listen(8081, function(){
	console.log('started');
});

	
