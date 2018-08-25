dangers of calling external contracts is that they can take over the control flow



- Implement a circuit breaker / emergency stop = simple moodifiers, as its a fairly simple app


Reentrancy

functions called repeatedly before first invocation of function finished


    /** @dev                        Accepts a submission and closes the BountyItem state.
    *   @param _bountyId            ID/mapping key for a BountyItem.
    *   @return s                   The calculated surface.
    */
    function acceptSubmission(uint _bountyId, uint _submissionId)
    public payable 
    verifyState(_bountyId) // Do no allow setting state on closed/paid bounties
    verifyBalance(_bountyId) // Ensure the bounty owner has enough funds to pay the bounty amount
    verifyBountyOwner(_bountyId) // Ensure owner is only one that can call this function
    {
        BountyList[_bountyId].submissions[_submissionId].hunter.transfer(BountyList[_bountyId].amount);
        BountyList[_bountyId].submissions[_submissionId].status = SubmissionStatus.Accepted;
        BountyList[_bountyId].state = BountyState.Closed;
        emit AcceptSubmission(_bountyId, _submissionId);
        // set all other submissions as rejected?
    }







chose to not hold custody 