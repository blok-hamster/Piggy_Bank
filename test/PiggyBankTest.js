const PiggyBank = artifacts.require("PiggyBank")
const TestToken = artifacts.require("TestToken")
const truffleAssert = require('truffle-assertions');

contract("PiggyBank", accounts => {

    it("Should throw an error if the tokenbalance is low when locking a token", async () => {

        let PIG = await PiggyBank.deployed()
        let TST = await TestToken.deployed()

        await PIG.addToken(TST.address, web3.utils.fromUtf8("TST"))
        
        await truffleAssert.reverts(
            PIG.lockToken(10, web3.utils.fromUtf8("TST"), 0)
        )

        await TST.approve(PIG.address, 100)

        await PIG.depositToken(web3.utils.fromUtf8("TST"), 100)

        await truffleAssert.passes(
            PIG.lockToken(10, web3.utils.fromUtf8("TST"), 0)
        )

    })

    it("Should show an error if the msg.sender has no tokenlocked when topin up ", async () => {

        let PIG = await PiggyBank.deployed()
        let TST = await TestToken.deployed()

        await PIG.addToken(TST.address, web3.utils.fromUtf8("TST"))
        await TST.approve(PIG.address, 100)
        await PIG.depositToken(web3.utils.fromUtf8("TST"), 100)
        
        await truffleAssert.fails (
            PIG.topUp(20, web3.utils.fromUtf8("TST"))
        )
        
        
    })

    it("should fail if the during withdral if lockoption time has not been reached", async () => {

        let PIG = await PiggyBank.deployed()
        let TST = await TestToken.deployed()

        await truffleAssert.reverts(
            PIG.withdrawLockedToken(20, web3.utils.fromUtf8("TST"), 0)
        )

    })

    it ("withdrawLockedToken should fail if lockedTokenBalance is less than the amount", async () => {

        let PIG = await PiggyBank.deployed()
        let TST = await TestToken.deployed()

        await PIG.addToken(TST.address, web3.utils.fromUtf8("TST"))
        await TST.approve(PIG.address, 1000)
        await PIG.depositToken(web3.utils.fromUtf8("TST"), 1000)
        await PIG.lockToken(100, web3.utils.fromUtf8("TST"), 0)

        await truffleAssert.reverts(

            PIG.withdrawLockedToken(700, web3.utils.fromUtf8("TST"), 0)

        )

    })

})