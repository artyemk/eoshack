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
let creator_key = '5J2w7H3fyPTSRH8UiHKGWBsW8BEBxLFSZqL1Zf1Bu4KT9Gv5b5F';
//const httpEndpoint = 'http://10.101.2.110:8888';
const httpEndpoint = 'http://10.101.2.132:8888';
let create = {
	name: 'authorizer',
	eos_obj: EOS({
		keyProvider: creator_key,
		httpEndpoint: httpEndpoint
	}, binaryen)
};

function returnPage(req, res) {
	res.send(indexHtml);
}

app.get('/', returnPage);
app.get('/wallet', returnPage);
app.get('/crowdfunding', returnPage);
app.get('/transfer', returnPage);

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

	getBalance(user).then((data) => {
		res.json(data);
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
			'code': 'tokenizer',
			'account': user.name
		}).then(balance => {
			resolve(balance);
		}, error => {
			reject(error);
		})
	})
}

router.route('/transfer').get(function(req, res) {
	let user = {
		name: req.query.userName,
		eos_obj: EOS({
			keyProvider: req.query.privateKey,
			httpEndpoint: httpEndpoint
		}, binaryen)
	};

	transfer(user, req.query.receiver, req.query.amount, req.query.currency, req.query.memo).then((data) => {
		res.json(data);
	}, (err) => {
		console.log('===================');
		console.log(err);
		/*res.json({
			//errors: [err.statusText]
		});*/
	});
});

function transfer(obj, to, amount, currency, memo) {
	console.log(to, amount, currency, memo);

	return new Promise(function(resolve, reject) {
		obj.eos_obj.transfer(obj.name, to, amount + ' ' + currency, memo).then(tx => {
			resolve(tx)
		}, error => {
			reject(error);
		});
	})
}

app.use('/api', router);

app.listen(port, function() {});