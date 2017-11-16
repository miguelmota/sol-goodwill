const Goodwill = artifacts.require('./Goodwill.sol')
const BN = require('bn.js')

const big = (n) => new BN(n.toString(10))
const tenToTheNinth = big(10).pow(big(9))
const tenToTheEighteenth = big(10).pow(big(18))

contract('Goodwill', (accounts) => {
  it('should accept ether donations', async () => {
    const instance = await Goodwill.deployed()

    const result = await instance.donate({
      from: accounts[0],
      value: web3.toWei(5, 'ether')
    })

    const bal = await instance.getBalance.call()
    assert.equal(bal.toNumber(), web3.toWei(5, 'ether'))
  })

  it('should give ether gift', async () => {
    const instance = await Goodwill.deployed()

    const limit = await instance.limit.call()
    assert.equal(limit.toNumber(), web3.toWei(1, 'ether'))

    const prevBal = await web3.eth.getBalance(accounts[1])

    const tx = await instance.receive(web3.toWei(1, 'ether'), {from: accounts[1]})

    const {gasUsed} = tx.receipt

    const newBal = await web3.eth.getBalance(accounts[1])

    const bal = parseFloat(web3.fromWei(newBal.sub(prevBal).toNumber(), 'ether')) + (gasUsed/1e7)

    assert.equal(bal, 1)
  })

  it('should cap ether gift', async () => {
    const instance = await Goodwill.deployed()

    const limit = await instance.limit.call()
    assert.equal(limit.toNumber(), web3.toWei(1, 'ether'))

    const prevBal = await web3.eth.getBalance(accounts[1])

    const tx = await instance.receive(web3.toWei(1.7, 'ether'), {from: accounts[1]})

    const {gasUsed} = tx.receipt

    const newBal = await web3.eth.getBalance(accounts[1])

    const bal = parseFloat(web3.fromWei(newBal.sub(prevBal).toNumber(), 'ether')) + (gasUsed/1e7)

    assert.equal(bal, 1)
  })
})
