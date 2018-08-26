#### Smart contract storage design

The below design for contract storage was chosen to allow flexibility while developing my contrat as well as to keep things clearly defined. When a new contract is created, bountyCount variable is increasd by 1, which acts as the index/mapping key for the BountyItem struct mapping since this data type does not support indexes. Each BountyItem has a nexted mapping called HunterSubmission which contains all the submitted bounty hunter solutions for a BountyItem.


>uint public bountyCount;                                    // Acs as index/key of struct mappings
>enum SubmissionStatus {Accepted, Rejected, PendingReview}   // Current status of a HunterSubmission.
>enum BountyState {Open, Closed}                             // Current status of a BountyItem.
> 
>struct HunterSubmission {                                   // Declaration of HunterSubmission struct type
>    address hunter;                                         // Address of a Bounty Hunter.
>    string body;                                            // Solution body of text.
>    SubmissionStatus status;                                // Current status of a HunterSubmission.
>}

>struct BountyItem {                                         // Declaration of BountyList struct type
>    address bountyPoster;                                   // Address of a Bounty Poster.
>    string title;                                           // Title of a BountyItem.
>    string description;                                     // Description of a BountyItem.
>    uint amount;                                            // Reward Amount for submitting an accepted HunterSubmission. 
>    BountyState state;                                      // Current state of a BountyItem.
>    uint submissionCount;                                   // Acts as index/key for A BountyItem.
>    mapping (uint => HunterSubmission) submissions;         // Struct mapping which contains each HunterSubmission 
>}      
>
>mapping(uint => BountyItem) public BountyList;    




### State modifying contract functions

>function acceptSubmission(uint _bountyId, uint _submissionId) public payable
>verifyState(_bountyId)          					// Do no allow setting state on closed/paid bounties
>verifyBalance(_bountyId)        					// Ensure the bounty owner has enough funds to pay the bounty amount
>verifyBountyOwner(_bountyId)    					// Ensure owner is only one that can call this function


>function rejectSubmission(uint _bountyId, uint _submissionId) public 
>verifyBountyOwner(_bountyId) verifyState(_bountyId) 

>function createBounty(string _title, string _description, uint _bountyAmount) public 

>function createSubmission(uint _bountyId, string _body) public
>verifyBountyExists(_bountyId) 						// Ensure the BountyItem exists before adding a submission for it


### Read only contracts

>function fetchSubmission(uint _bountyId, uint _submissionId) 
>public constant 
>verifyBountyExists(_bountyId)						// Ensure the BountyItem exists before adding a submission for it
>verifySubmissionExists(_bountyId, _submissionId) 	// Ensure the BountyItem has submissions before adding a submission for it
>returns(uint bountyId, uint submissionId, address hunter, string body, SubmissionStatus status)

>function fetchBounty(uint _bountyId)
>public constant 
>verifyBountyExists(_bountyId) 						// Ensure the BountyItem exists before adding a submission for it
>returns(address bountyPoster, string title, string description, uint amount, BountyState state, uint submissionCount) 


### default payable function to accept erroneous payments made to contract without calling a function
>function() public payable {} Fallback function, which accepts ether when sent to contract










