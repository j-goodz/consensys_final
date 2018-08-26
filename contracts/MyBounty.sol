pragma solidity ^0.4.17;
import 'zeppelin/contracts/token/StandardToken.sol';

/** @title MyBounty dApp */
contract MyBounty {                                             // Declaration of MyBounty contract
    using SafeMath for uint256;                                 // SafeMath library prevents overflow when working with uint                     
    uint public bountyCount;                                    // Acs as index/key of struct mappings
    enum SubmissionStatus {Accepted, Rejected, PendingReview}   // Current status of a HunterSubmission.
    enum BountyState {Open, Closed}                             // Current status of a BountyItem.

    struct HunterSubmission {                                   // Declaration of HunterSubmission struct type
        address hunter;                                         // Address of a Bounty Hunter.
        string body;                                            // Solution body of text.
        SubmissionStatus status;                                // Current status of a HunterSubmission.
    }

    struct BountyItem {                                         // Declaration of BountyList struct type
        address bountyPoster;                                   // Address of a Bounty Poster.
        string title;                                           // Title of a BountyItem.
        string description;                                     // Description of a BountyItem.
        uint amount;                                            // Reward Amount for submitting an accepted HunterSubmission. 
        BountyState state;                                      // Current state of a BountyItem.
        uint submissionCount;                                   // Acts as index/key for A BountyItem.
        mapping (uint => HunterSubmission) submissions;         // Struct mapping which contains each HunterSubmission 
    }                                                           //      for a particular Bountyitem.

    mapping(uint => BountyItem) public BountyList;              // Declaration of BountyList storage. 

    event CreateBounty      (uint bountyId, address bountyPoster, string title, string description, uint amount, BountyState state, uint submissionCount);
    event CreateSubmission  (uint bountyId, uint submissionId, address hunter, string body, SubmissionStatus status);
    event AcceptSubmission  (uint bountyId, uint submissionId);
    event RejectSubmission  (uint bountyId, uint submissionId);
    event FetchBounty       (uint bountyId);
    event FetchSubmission   (uint bountyId, uint submissionId);
    
    modifier verifyBountyOwner      (uint _bountyId) { require (msg.sender == BountyList[_bountyId].bountyPoster); _; }
    modifier verifyState            (uint _bountyId) { require (BountyList[_bountyId].state == BountyState.Open); _; }
    modifier verifyBalance          (uint _bountyId) { require (msg.sender.balance > BountyList[_bountyId].amount); _; }
    modifier verifyBountyExists     (uint _bountyId) { require (_bountyId <= bountyCount); _; }
    modifier verifySubmissionExists (uint _bountyId, uint submissionId) { require(_bountyId <= BountyList[_bountyId].submissionCount); _; }
    
    /** @dev                        Creates a new BountyItem to which users can submit HunterSubmission solutions.
    *   @param _title               Title of a new BountyItem.
    *   @param _description         Description of a new BountyItem.
    *   @param _bountyAmount        Bounty award amount for a new BountyItem.
    */
    function createBounty(string _title, string _description, uint _bountyAmount) 
    public 
    {
        bountyCount++;
        var newBountyItem = BountyItem(msg.sender, _title, _description, _bountyAmount, BountyState.Open, 0);
        BountyList[bountyCount] = newBountyItem;
        emit CreateBounty(bountyCount, msg.sender, _title, _description, _bountyAmount, BountyState.Open, 0);
    }
    
    /** @dev                        Creates and submits a HunterSubmission for a BountyItem to be reviewed by the Bounty Poster.
    *   @param _bountyId            ID/mapping key for a BountyItem.
    *   @param _body                HunterSubmission solution body of text.
    */
    function createSubmission(uint _bountyId, string _body) 
    public 
    verifyBountyExists(_bountyId)
    {
        //require (msg.sender != BountyList[_bountyId].bountyPoster); // Prevent Bounty Posters from submitting their own HunterSubmissions
        BountyList[_bountyId].submissionCount++;
        var newSubmission = HunterSubmission(msg.sender, _body, SubmissionStatus.PendingReview);
        BountyList[_bountyId].submissions[BountyList[_bountyId].submissionCount] = newSubmission;
        emit CreateSubmission(
            _bountyId, 
            BountyList[_bountyId].submissionCount, 
            msg.sender, 
            _body, 
            SubmissionStatus.PendingReview
        );
    }

    /** @dev                        Fetches the details of a BountyItem.
    *   @return bountyPoster        Address of the BountyItem poster.
    *   @return title               Title of the BountyItem.
    *   @return description         Description of the BountyItem.
    *   @return amount              Bounty award amount of the BountyItem.
    *   @return state               Current state (BountyState type) of the BountyItem.
    *   @return submissionCount     Number of HunterSubmissions for the BountyItem.
    */
    function fetchBounty(uint _bountyId)
    public constant 
    verifyBountyExists(_bountyId) 
    returns(address bountyPoster, string title, string description, uint amount, BountyState state, uint submissionCount) 
    {
        return (
            BountyList[_bountyId].bountyPoster,
            BountyList[_bountyId].title,
            BountyList[_bountyId].description,
            BountyList[_bountyId].amount,
            BountyList[_bountyId].state,
            BountyList[_bountyId].submissionCount);
    }

    /** @dev                        Fetches the details for a HunterSubmission solution of a BountyItem.
    *   @param _bountyId            ID/mapping key for a BountyItem.
    *   @param _submissionId        ID/mapping key for a HunterSubmission.
    *   @return bountyId            Returns ID/mapping key of the BountyItem.
    *   @return submissionId        Returns ID/mapping key of the HunterSubmission.
    *   @return hunter              Returns hunter address of the HunterSubmission.
    *   @return body                Returns body of text for the HunterSubmission.
    *   @return status              Returns current status (SubmissionStatus type) of the HunterSubmission.
    */
    function fetchSubmission(uint _bountyId, uint _submissionId) 
    public constant 
    verifyBountyExists(_bountyId)
    verifySubmissionExists(_bountyId, _submissionId) 
    returns(uint bountyId, uint submissionId, address hunter, string body, SubmissionStatus status)
    {
        return ( 
            _bountyId,
            _submissionId,
            BountyList[_bountyId].submissions[_submissionId].hunter, 
            BountyList[_bountyId].submissions[_submissionId].body, 
            BountyList[_bountyId].submissions[_submissionId].status
        );   
    }
    
    /** @dev                        Accepts a HunterSubmission and sets the BountyItem state to Closed.
    *   @param _bountyId            ID/mapping key for a BountyItem.
    *   @param _submissionId        ID/mapping key for a HunterSubmission.
    */
    function acceptSubmission(uint _bountyId, uint _submissionId)
    public payable 
    verifyState(_bountyId)          // Do no allow setting state on closed/paid bounties
    verifyBalance(_bountyId)        // Ensure the bounty owner has enough funds to pay the bounty amount
    verifyBountyOwner(_bountyId)    // Ensure owner is only one that can call this function
    {
        BountyList[_bountyId].submissions[_submissionId].hunter.transfer(BountyList[_bountyId].amount);
        BountyList[_bountyId].submissions[_submissionId].status = SubmissionStatus.Accepted;
        BountyList[_bountyId].state = BountyState.Closed;
        emit AcceptSubmission(_bountyId, _submissionId);
        // set all other submissions as rejected?
    }
    
    /** @dev                        Rejects a HunterSubmission.
    *   @param _bountyId            ID/mapping key for a BountyItem.
    *   @param _submissionId        ID/mapping key for a HunterSubmission.
    */
    function rejectSubmission(uint _bountyId, uint _submissionId)
    public 
    verifyBountyOwner(_bountyId) 
    verifyState(_bountyId) 
    {
        emit RejectSubmission(_bountyId, _submissionId);
        BountyList[_bountyId].submissions[_submissionId].status = SubmissionStatus.Rejected;
    }

    /// @dev                        Fallback function, which accepts ether when sent to contract
    function() public payable {}
    
}