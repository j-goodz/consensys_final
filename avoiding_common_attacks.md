#### Measures taken to protect against common attacks

- EthPM library SafeMath was used to protect uint values from underflow / overflow.

- Implemented a circuit breaker / emergency stop using simple moodifiers. Only the contract owner can use this feature.

- In the function acceptSubmission, the transfer of funds is the last sequential execution to mitigate reentrancy attacks.

- No calling of external contracts occcurs in this project. This increases the security as no other controact takes over control flow. 

- Added a default payable function to accept erroneous payments made to contract without calling a function:
	> function() public payable {} Fallback function, which accepts ether when sent to contract
