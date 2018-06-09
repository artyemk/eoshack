EOS = require('eosjs')
let {Keystore, Keygen} = require('eosjs-keygen')
binaryen = require('binaryen')
creator_key = '5K4BykXAwP6HzhCq9kVJ8Y8VRCpxLhajE9z1DYoRbv4VoghCNRp'
creator_public = 'EOS7JwDx3We4JmbcXC7UDL3hU2LM26GfYzwtkiRy7HmQEpoAM8oqX'
create = {'name':'test1',
          'eos_obj':EOS({keyProvider: creator_key}, binaryen)}

function createAccount(name){
  return new Promise(function(resolve,reject){
    create.getKeyAccounts({'public_key': creator_public}).then(user_name =>
    {
      Keygen.generateMasterKeys().then(keys => {
      pubkey = keys.publicKeys.active
      privkey = keys.privateKeys.active
      create.transaction(tr => {
        tr.newaccount({
          creator: user_name.account_names[0],
          name: name,
          owner: pubkey,
          active: pubkey
        })
      }).then(function(){resolve({'pubkey':pubkey,
                 'privkey':privkey})})
  })
 })
})
}

function initializeUser(name){
  return new Promise(function(resolve,reject){
     createAccount(name).then(keys => {
       resolve({'name':name,
                'eos_obj': EOS({keyProvider: keys.privkey}, binaryen)})
     })
  })
}

function getBalance(obj, token_contract){
  return new Promise(function(resolve,reject){
    obj.eos_obj.getCurrencyBalance({
      'code':token_contract,
      'account':obj.name
    }).then(balance => {resolve(balance)})
})}


function transfer(obj, to, amount, currency, memo){
  return new Promise(function(resolve,reject){
    obj.eos_obj.transfer(obj.name, to, amount +' '+ currency, memo).then(tx => {resolve(tx)})
  }
  )
}
