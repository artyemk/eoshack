const fs = require('fs');
const port = 3000;
let indexHtml = fs.readFileSync(__dirname + `/index.html`, 'utf8', function(err, html) {});
let express = require('express');
let app = express();

app.get('/', function (req, res) {
	res.send(indexHtml);
});

app.use(express.static('dist'));

app.listen(port, function () {

});