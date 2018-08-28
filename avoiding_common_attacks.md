#### Measures taken to protect against common attacks

- This project uses an Ownable contract with an emergency stop feature allowing the contract owner to pause function execution. This can be reverted once an risks to the contract or dApp ave been mitigaed.

- EthPM library SafeMath was used to protect uint values from Integer Overflow and Underflow. This library is imported from OpenZeppelin.

- In the function acceptSubmission, the transfer of funds is the last sequential execution to mitigate reentrancy attacks.

- No calling of external contracts occcurs in this project. This increases the security as no other controact takes over control flow. 

- Added a default payable function to accept erroneous payments made to contract without calling a function:
```function() public payable {} Fallback function, which accepts ether when sent to contract```

- All data is public allowing open access.
 
- Transactions are sent using msg.sender rather than tx.origin to reduce risk.

- Unit Tests were used to ensure the dApp works as expected




