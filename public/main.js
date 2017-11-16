var tc = require('truffle-contract')
var data = require('../build/contracts/Goodwill.json')

var $ = document

var donateForm = $.querySelector('#donateForm')
var receiveForm = $.querySelector('#receiveForm')

var instance = null

var contract = tc(data)

contract.setProvider(web3.currentProvider)

contract.deployed()
.then(function(_instance) {
  instance = _instance
})

donateForm.addEventListener('submit', function(event) {
  event.preventDefault()
  var target = event.target

  instance.donate({
    from: web3.eth.accounts[0],
    value: web3.toWei(target.donate.value, 'ether')
  })
  .then(function() {
    alert('donated')
  })
  .catch(function(error) {
    alert(error)
  })
})

receiveForm.addEventListener('submit', function(event) {
  event.preventDefault()
  var target = event.target

  instance.receive(web3.toWei(target.receive.value, 'ether'), {from: web3.eth.accounts[0]})
  .then(function() {
    alert('done')
  })
  .catch(function(error) {
    alert(error)
  })
})
