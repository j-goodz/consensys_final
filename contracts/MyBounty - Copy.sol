pragma solidity ^0.4.17;
/** @title MyBounty dApp */
contract MyBounty {
    uint public bountyCount;
    enum SubmissionStatus {Accepted, Rejected, PendingReview} // Bounty poster accepts or rejects solutions
    enum BountyState {Open, Closed} // bounty is open when posted and closed when a solution is found
    //set default state <================
    struct HunterSubmission {   
        address hunter; // address of bounty hunter who submitted solution
        string body; // proposed solution
        SubmissionStatus status;
    }
// add code to restrict input for ids and states
    struct BountyItem {
        address bountyPoster;
        string title;
        string description;
        uint amount;
        BountyState state;
        uint submissionCount; // used as solution index for BountyItem's
        mapping (uint => HunterSubmission) submissions;
    }

    mapping(uint => BountyItem) public BountyList;

    event CreateBounty (uint bountyId);
    //event CloseBountyState (uint bountyId, BountyState state);
    event CreateSubmission (uint bountyId, uint submissionId);
    event AcceptSubmission (uint bountyId, uint submissionId);
    event RejectSubmission (uint bountyId, uint submissionId);
    //event SetSubmissionStatus (uint bountyId, uint submissionId, SubmissionStatus status);
    event FetchBounty (uint bountyId);
    event FetchSubmission (uint bountyId, uint submissionId);
    
    modifier verifyBountyOwner (uint _bountyId) { require (msg.sender == BountyList[_bountyId].bountyPoster); _; }
    modifier verifyState(uint _bountyId) { require(BountyList[_bountyId].state == BountyState.Open); _; }
    modifier verifyBalance(uint _bountyId) { require(msg.sender.balance > BountyList[_bountyId].amount); _; }
    modifier verifyBountyExists(uint _bountyId) { require(_bountyId <= bountyCount); _; }
    modifier verifySubmissionExists(uint _bountyId, uint submissionId) { require(_bountyId <= BountyList[_bountyId].submissionCount); _; }
    
    /** @dev                    Creates a new BountyItem to which users can submit submissions.
    * @param _title             Title of a new BountyItem.
    * @param _description       Description of a new BountyItem.
    * @param _bountyAmount      Bounty award amount for a new BountyItem.
    */
    function createBounty(string _title, string _description, uint _bountyAmount) 
    public 
    //returns(uint bountyId)
    {
        bountyCount++;
        var newBountyItem = BountyItem(msg.sender, _title, _description, _bountyAmount, BountyState.Open, 0);
        BountyList[bountyCount] = newBountyItem;
        emit CreateBounty(bountyCount);
        //return bountyCount; // return or event?
    }
    
    /** @dev                    Creates and submits a solution for a BountyItem to be reviewed by the bounty owner.
    * @param _bountyId          ID/mapping key for a BountyItem.
    * @param _body              Submission solution body of text.
    * @return bountyId          ID/mapping key of the submissions BountyItem.
    * @return submissionId      ID/mapping key of the bounty items submitted solution.
    */
    function createSubmission(uint _bountyId, string _body) 
    public 
    verifyBountyExists(_bountyId)
    returns(uint bountyId, uint submissionId) // do I need to return anything here or use event?
    {
        //require (msg.sender != BountyList[_bountyId].bountyPoster); //prevent bounty owner from submitting his own solution
        BountyList[_bountyId].submissionCount++;
        var newSubmission = HunterSubmission(msg.sender, _body, SubmissionStatus.PendingReview);
        BountyList[_bountyId].submissions[BountyList[_bountyId].submissionCount] = newSubmission;
        emit CreateSubmission(_bountyId, BountyList[_bountyId].submissionCount);
        return (_bountyId, BountyList[_bountyId].submissionCount);
    }

    /** @dev                    Fetches (event logs) the details of a BountyItem.
    * @param _bountyId          ID/mapping key for a BountyItem.
    * @return bountyPoster      Address of the BountyItem poster.
    * @return title             Title of the BountyItem.
    * @return description       Description of the BountyItem.
    * @return amount            Bounty award amount of the BountyItem.
    * @return state             Current state (BountyState type) of the BontyItem.
    * @return submissionCount   Number of submissions for the BountyItem.
    */
    function fetchBounty(uint _bountyId)
    public constant 
    verifyBountyExists(_bountyId) 
    returns(address bountyPoster, string title, string description, uint amount, BountyState state, uint submissionCount) 
    {
        return (//_bountyId,
            BountyList[_bountyId].bountyPoster,
            BountyList[_bountyId].title,
            BountyList[_bountyId].description,
            BountyList[_bountyId].amount,
            BountyList[_bountyId].state,
            BountyList[_bountyId].submissionCount);
    }
    
//         /** @dev                    Fetches (event logs) the details of a BountyItem.
//   */
    
//     function fetchAllBounty()
//      view
//     // returns(address bountyPoster, string title, string description, uint amount, BountyState state, uint submissionCount) 
//     returns(bList[]) 
//     {
//         //uint memory bountyTotal = bountyCount;
//         BountyItem[] memory bList;
//         //= new BountyItem[bountyCount];
//         for (uint i=0; i <= bountyCount; i++){
//             bList.push();
//         }
        
//         // return (//_bountyId,
//         //     BountyList[_bountyId].bountyPoster,
//         //     BountyList[_bountyId].title,
//         //     BountyList[_bountyId].description,
//         //     BountyList[_bountyId].amount,
//         //     BountyList[_bountyId].state,
//         //     BountyList[_bountyId].submissionCount);
//         return bList;
//     }
    
    /** @dev                    Fetches (event logs) the details for a BountyItem submissionId.
    * @param _bountyId          ID/mapping key for a BountyItem.
    * @return bountyId          Returns ID/mapping key of the BountyItem.
    * @return submissionId      Returns ID/mapping key of the BountyItem submission.
    * @return hunter            Returns hunter address key of the BountyItem submission.
    * @return body              Returns body of text of the BountyItem submission.
    * @return status            Returns current status (SubmissionStatus type) of the BountyItem submission.              .
    */
    function fetchSubmission(uint _bountyId, uint _submissionId) 
    public constant 
    verifyBountyExists(_bountyId)
    verifySubmissionExists(_bountyId, _submissionId) 
    returns(uint bountyId, uint submissionId, address hunter, string body, SubmissionStatus status)
    {
        return ( //add some bounty info for this return? 
            _bountyId,
            _submissionId,
            BountyList[_bountyId].submissions[_submissionId].hunter, 
            BountyList[_bountyId].submissions[_submissionId].body, 
            BountyList[_bountyId].submissions[_submissionId].status
        );   
    }
    
    /** @dev                    Accepts a submission and closes the BountyItem state.
    * @param _bountyId          ID/mapping key for a BountyItem.
    * @return s                 The calculated surface.
    //* @return                 Returns transaction ID.
    */
    function acceptSubmission(uint _bountyId, uint _submissionId)
    public payable 
    verifyState(_bountyId) // Do no allow setting state on closed/paid bounties
    verifyBalance(_bountyId) // Ensure the bounty owner has enough funds to pay the bounty amount
    verifyBountyOwner(_bountyId) // Ensure owner is only one that can call this function
    {
        emit AcceptSubmission(_bountyId, _submissionId);
        BountyList[_bountyId].submissions[_submissionId].hunter.transfer(BountyList[_bountyId].amount);
        BountyList[_bountyId].submissions[_submissionId].status = SubmissionStatus.Accepted;
        BountyList[_bountyId].state = BountyState.Closed;
        // set all other submissions as rejected?
    }
    
    /** @dev                    Rejects a bounty submission.
    * @param _bountyId          ID/mapping key for a BountyItem.
    */
    function rejectSubmission(uint _bountyId, uint _submissionId)
    public 
    verifyBountyOwner(_bountyId) 
    verifyState(_bountyId) 
    {
        emit RejectSubmission(_bountyId, _submissionId);
        BountyList[_bountyId].submissions[_submissionId].status = SubmissionStatus.Rejected;
    }

    //fetch hunterSubmissions
    //fetch posterBounties
    
    /// @dev                    Fallback function, which accepts ether when sent to contract
    function() public payable {}
    
}