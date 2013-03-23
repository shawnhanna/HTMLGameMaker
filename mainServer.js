var fs = require('fs');

var express = require('express');
var app = express();

app.use(express.bodyParser());
app.use(express['static'](__dirname + '/Engine'));

app.post('/', function(req, res) {
	console.log(req.body.filename);
	fs.writeFile("blueprints/" + req.body.filename, req.body.data, function(err) {
		if (err) {
			console.log(err);
		}
		else {
			console.log("The File was saved!");
		}
	});
	res.end();
});

app.listen(8080);
console.log("Listening on port 8080");