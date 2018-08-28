#### Smart contract storage design


The below design for contract storage was chosen to allow flexibility while developing my contract as well as to keep things clearly defined. A single contract design was used to lower complexity and attackk surface. When a new bounty is created, bountyCount variable is increasd by 1, which acts as the index/mapping key for the BountyItem struct mapping since this data type does not support indexes. Each BountyItem has a nested mapping called HunterSubmission which contains all the submitted bounty hunter solutions for a BountyItem. Events automatically update the applications state to reflect things in real time. 


>uint public bountyCount;                                    // Acs as index/key of struct mappings
>enum SubmissionStatus {Accepted, Rejected, PendingReview}   // Current status of a HunterSubmission.
>enum BountyState {Open, Closed}                             // Current state of a BountyItem.
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


#### Restricting Access

- Bounty Posters cannot submit solutions for their own Bounty. (createSubmission function)
- Bounty Posters can Accepted or Rejected submissions, from the default state of PendingReview (acceptSubmission and rejectSubmission functions). Once a solution is Accepted, the bounty is closed and the award is paid out to the Bounty Hunter.
- Bounty Hunters cannot accept or reject solutions. Only the Bounty Poster can do this.


#### The Circuit Breaker or Emergency Stop Pattern

This proect includes an emergency stop feature allowing the contract owner to pause function execution. This can be reverted once an risks to the contract or dApp ave been mitigaed.

#### Library Usage

Used Openzeppelin solidity in both contracts for ownership, whitelist, pasueability. Also have used SafeMath to make sure there wont be integer owerflows and underflows.


#### Circuit breaker / emergency stop feature / contract execution pause

This project a uses custom isStopped value check modifier that acts as circuit breaker / emergency stop. This feature is controlled by the contract owner and this owner is set on contract deployment. The following functions utilize this security feature:

- createBounty
- createSubmission
- fetchBounty
- fetchSubmission
- acceptSubmission
- rejectSubmission


#### Modifiers

// This modifier ensures the called is the actual bounty owner.
verifyBountyOwner 
    
// This modifier ensures the state of the bounty is open if changes are to be made to it.
verifyState

// Ensure the bounty poster has enough funds to pay the bounty amount.
verifyBalance

// Makes sure the call is to an existing bounty.
verifyBountyExists

// Makes sure the call is to an existing bounty submission.
verifySubmissionExists
    
// Ensures the isStopped boolean is false before allowing the function to execute.
stoppedInEmergency

// Ensures onlly the contract owner can call functions with this modifier.
onlyAuthorized


