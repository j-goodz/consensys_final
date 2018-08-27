#### Smart contract storage design

What other design patterns have you used / not used?
■  	Why did you choose the patterns that you did?
■  	Why not others?


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


### UI Interface Notes
Bounty Posters cannot submit solutions for their own Bounty. 
Bounty Hunters cannot accept or reject solutions. Only the Bounty Poster can do this.
Bounty Posters can Accepted or Rejected submissions, from the default state of PendingReview. Once a solution is Accepted, the Bounty is closed and the award is paid out to the Bounty Hunter.




