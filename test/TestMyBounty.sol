pragma solidity ^0.4.19;
// pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/MyBounty.sol";

//Explain why you wrote those tests !@2312312321

contract TestMyBounty {
       // uint public initialBalance = 1 ether; // ????

    {
        // Contract to test
        ///bounty = new MyBounty();
        myBounty = new MyBounty(DeployedAddresses.MyBounty());
        //MyBounty myBounty = MyBounty(DeployedAddresses.MyBounty());

        // Bounty poster actor
        bountyPoster = new Proxy(chain);

        // Bounty Hunter actor
        bountyHunter = new Proxy(chain);

        // Seed buyer with some funds, values are in wei
        uint256 seedValue = itemPrice + 1;


        address(bountyHunter).transfer(seedValue);

        // Seed known item to set contract to `for-sale`
        //sellActor.sell(itemName, itemPrice);
    }




    SupplyChain public chain;
    Proxy public bountyPoster;
    Proxy public bountyHunter;


	function testPosterAndHuntersAreDifferentActors() public {
        Assert.notEqual(address(bountyHunter), address(bountyPoster), "Bounty poster and bounty hunter should be different.");
        Assert.equal(address(chain), bountyHunter.getTarget(), "chain is the target");
    }


    // Using Account 1
	function testItCreatesBounty() public {
		bool expectedCreateBounty = true;
		bool testCreateBounty = myBounty.createBounty("Test Bounty Title", "Test Bounty Description", 1);
	    Assert.equal(testCreateBounty, expectedCreateBounty, "It should return true when a new bounty is create.");
	}

	// Using Account 2
	function testItCreatesSubmission1() public {  // make this test fail?
		bool expectedCreateSubmission1 = true;
		bool testCreateSubmission1 = myBounty.createSubmission(1, "Test SubmisText 1");
	    Assert.equal(testCreateSubmission1, expectedCreateSubmission1, "It should return true when the 1st submission is created.");
	}

	// Using Account 2
	function testItCreatesSubmission2() public {
		bool expectedCreateSubmission2 = true;
		bool testCreateSubmission2 = myBounty.createSubmission(1, "Test SubmisText 2");
	    Assert.equal(testCreateSubmission2, expectedCreateSubmission2, "It should return true when the 2nd submission is created.");
	}

	// Using Account 1
	function testItStopsContract() public {
	    bool expectedStopContract = true;
	 	bool testStopContract = myBounty.stopContract();
	    Assert.equal(testStopContract, expectedStopContract, "It should return true when the emergency stop circuit breaker is enabled.");
	}

	// Using Account 1
	function testItResumesContract() public {
	    bool expectedResumeContract = false;
	 	bool testResumeContract = myBounty.resumeContract();
	    Assert.equal(testResumeContract, expectedResumeContract, "It should return true when the emergency stop circuit breaker is disabled.");
	}

	// Using Account 1
	function testItRejecstSubmission() public {
	    bool expectedRejectSubmission = false;
	 	bool testRejectSubmission = myBounty.rejectSubmission(1, 1);
	    Assert.equal(testRejectSubmission, expectedRejectSubmission, "It should return true when the submission is rejected by the bounty poster.");
	}

	// Using Account 1
	function testIAcceptsSubmission() public {
	    bool expectedAcceptSubmission = false;
	 	bool testAcceptSubmission = myBounty.acceptSubmission(1, 2);
	    Assert.equal(testAcceptSubmission, expectedAcceptSubmission, "It should return true when the submission is acccepted by the bounty is paid to the hunter.");
	}

}




contract Proxy {
	MyBounty myBounty = MyBounty(DeployedAddresses.MyBounty());


}