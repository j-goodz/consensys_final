const should = require('chai').should()

async function assertRevert(promise) {
  try {
    await promise
  } catch (error) {
    error.message.should.include(
      'revert',
      `Expected "revert", got ${error} instead`
    )
    return
  }
  should.fail('Expected revert not received')
}

const MyBounty = artifacts.require('MyBounty')
contract('MyBounty', (_, poster, hunter) => {

	const bountyFactory = await MyBounty.new()
	let bounty


	const bountyOneTitle = "Fist Bounty - Title."
	const bountyOneDescription = "First Bounty - Description."
	const bountyOneAmount = 1 // Bounty reward amount

	const submissionOneText = "First Bounty - Submission One Text."
	const submissionTwoText = "First Bounty - Submission One Text."


	beforeEach(async () => {
	    bounty = await bountyFactory.createBounty = await MyBounty.new()
	})


	it('Poster should be able to create a bounty.', async () => {
		const result = await bountyOneTest.createBounty(bountyOneTitle, bountyOneDescription, bountyOneAmount, { from: poster, value: 1000 })
		assert.isTrue(result, 'Expected createBounty function to return true.')
	})


 //    // Using Account 1
	// function testItCreatesBounty() public {
	// 	bool expectedCreateBounty = true;
	// 	bool testCreateBounty = myBounty.createBounty("Test Bounty Title", "Test Bounty Description", 1);
	//     Assert.equal(testCreateBounty, expectedCreateBounty, "It should return true when a new bounty is create.");
	// }






 //  it('should benefit the beneficiary', async () => {
 //    const owner = await auction.beneficiary({ from: poster })
 //    assert.equal(owner, beneficiary, 'the owner should be the beneficiary')
 //  })



 //  it('should allow beneficiary to cancel auction', async () => {
 //    await auction.cancelAuction({ from: beneficiary })
 //    const state = await auction.cancel()
 //    assert.isTrue(state)
 //  })

 //  it('should bar others from cancelling auction', async () => {
 //    assertRevert(auction.cancelAuction({ from: dick }))
 //    const state = await auction.cancel()
 //    assert.isFalse(state)
 //  })

 //  it('should be able to take a bid', async () => {
 //    await auction.placeBid(100, { from: dick, value: 100 })
 //    const highestBid = await auction.highestBid()
 //    assert.equal(highestBid, 100, 'The highest bid should be the only bid')
 //  })

 //  it('should be able to raise a bid', async () => {
 //    await auction.placeBid(200, { from: dick, value: 200 })
 //    let highestBid = await auction.highestBid()
 //    assert.equal(highestBid, 200, 'The highest bid should be the only bid')

 //    await auction.placeBid(400, { from: dick, value: 200 })
 //    highestBid = await auction.highestBid()
 //    assert.equal(highestBid, 400, 'The highest bid should be the only bid')
 //  })
})