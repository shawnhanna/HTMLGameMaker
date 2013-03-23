var fs = require('fs');

var express = require('express');
var app = express();

app.use(express.bodyParser());
app.use(express['static'](__dirname));

app.post('/', function(req, res) {
	fs.writeFile("blueprints/" + req.body.filename, req.body.data, function(err) {
		if (err) {
			console.log(err);
		}
	});
	res.end();
});

app.get('/getBP', function(req, res) {
	var allfiles = [];
	fs.readdir("blueprints/", function(err, files)
	{
		res.send(JSON.stringify(files));
	});
});

app.get('/delete', function(req, res) {
	file = req.query["filename"];
	fs.unlink("blueprints/"+file);
	res.send("deleted " + file);
});

app.listen(8080);
console.log("Listening on port 8080");