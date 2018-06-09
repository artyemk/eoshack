const fs = require('fs');
const port = 3000;
let indexHtml = fs.readFileSync(__dirname + `/dist/eoshack/index.html`, 'utf8', function(err, html) {
});
let express = require('express');
let app = express();
let router = express.Router();
let EOS = require('eosjs');
let {Keystore, Keygen} = require('eosjs-keygen');
let binaryen = require('binaryen');
let creator_key = '5JT7wmHHwWNXa6SegDc6wsYkk4R6xZs8dr9eYGbMoPnkuE3ZpLe';
let creator_public = 'EOS6RD7NYcU1pGyYAt8Gb1wLwRkAqxbJA66oBDPKZahnyHftBonZc';
let create = {
	'name': 'newuser',
	'eos_obj': EOS({
		keyProvider: creator_key,
		httpEndpoint: `http://10.101.2.110:8888`}, binaryen)
};

app.get('/', function(req, res) {
	res.send(indexHtml);
});

app.use(express.static('dist/eoshack'));

router.route('/create-account').get(function(req, res) {
		return new Promise(function(resolve, reject) {
			Keygen.generateMasterKeys().then(keys => {
				let pubkey = keys.publicKeys.active;
				let privkey = keys.privateKeys.active;

				create.eos_obj.transaction(tr => {
					tr.newaccount({
						creator: create.name,
						name: req.query.userName,
						owner: pubkey,
						active: pubkey
					})
				}).then(() => {
					res.json({
						pubkey: pubkey,
						privkey: privkey
					});
				}, json => {
					let err = JSON.parse(json);

					res.json({
						errors: err.error.details
					});
				})
			})
		})
});

app.use('/api', router);

app.listen(port, function() {
});