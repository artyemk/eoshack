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
//let creator_key = '5JT7wmHHwWNXa6SegDc6wsYkk4R6xZs8dr9eYGbMoPnkuE3ZpLe';
let creator_key = '5JbCQBspuvLUVDPPL9hXSD2ZBDHC7GoCjfNU8zAjsMhAXjBHmmh';
//const httpEndpoint = 'http://10.101.2.110:8888';
const httpEndpoint = 'http://10.101.2.132:8888';
let create = {
	//name: 'newuser',
	name: 'tester',
	eos_obj: EOS({
		keyProvider: creator_key,
		httpEndpoint: httpEndpoint
	}, binaryen)
};

app.get('/', function(req, res) {
	res.send(indexHtml);
});

app.get('/wallet', function(req, res) {
	res.send(indexHtml);
});

app.use(express.static('dist/eoshack'));

router.route('/create-account').get(function(req, res) {
	Keygen.generateMasterKeys().then(keys => {
		let publicKey = keys.publicKeys.active;
		let privateKey = keys.privateKeys.active;

		create.eos_obj.transaction(tr => {
			tr.newaccount({
				creator: create.name,
				name: req.query.userName,
				owner: publicKey,
				active: publicKey
			})
		}).then(() => {
			res.json({
				publicKey: publicKey,
				privateKey: privateKey
			});
		}, json => {
			let err = JSON.parse(json);

			res.json({
				errors: err.error.details
			});
		})
	})
});

router.route('/get-balance').get(function(req, res) {
	let user = {
		name: req.query.userName,
		eos_obj: EOS({
			keyProvider: req.query.privateKey,
			httpEndpoint: httpEndpoint
		}, binaryen)
	};

	getBalance(user).then((res) => {
		console.log('SUCCESS =============');
		console.log(res);
	}, (err) => {
		res.json({
			//errors: [err.statusText]
			errors: ['There is no such account']
		});
	});
});

function getBalance(user) {
	return new Promise(function(resolve, reject) {
		user.eos_obj.getCurrencyBalance({
			'code': 'eosio.token',
			'account': user.name
		}).then(balance => {
			resolve(balance)
		}, error => {
			reject(error);
		})
	})
}


app.use('/api', router);

app.listen(port, function() {
});