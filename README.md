# consensys_final


### Getting Started

This truffle project is a basic Bounty Board dApp where Bounty Posters can post a problem allowing Bounty Hunters to submit solutions. The Bounty Poster can review each submission and either Accept or Reject those submissions. If a submission is Accepted, the Bounty Poster is then prompted to transfer the Bounty Reward Amount to the Bounty Hunter before the Submission is Accepted and the Bounty Status Closed. If a submission is Rejected, the Bounty Status remains Open and Bounty Hunters can continue to submit solutions. 

Each Bounty Post contains the following details:
●  	Bounty Poster Address
●  	Title
●  	Description
●  	Bounty Reward Amount
●  	Bounty State (Open/Closed)
●  	Submission Count
●  	Submissions: A nested list fo each Bounty Post containing the Solutions submitted by Bounty Hunters

Each submission (nested within Bounty Posts) contains the following details:
●  	Bounty Hunter Address
●  	Solution body text
●  	Submission Status (Accepted, Rejected or Pending Review)


### Setup

Wondering how to set it up? There are two methods for getting started with this repo. Using git clone or manually download and extract the project zip.


#### Familiar with Git?
Checkout this repo, install dependencies, then start up the project for review:

```
> git clone https://github.com/jgoodz/consensys_final.git 
> cd consensys_final
> npm install
> npm start
```


#### Not Familiar with Git?
Click [here](https://github.com/jgoodz/consensys_final.git) then download the .zip file. Extract the contents of the zip file, then open your terminal, change to the project directory, and run:

```
> npm install
```


#### Start the development web server to serve the front end interface of the application
Once you have finished downloading the project dependancies (npm install), run the development web server:

```
> npm start
```


#### Run a local development blockchain 
Open a new terminal in the project directory and start the ganache-cli development blockchain on port 8545:

```
> ganache-cli
```

Once ganache-cli has started, copy the provided seed phrase into Meta Mask and ensure its connecting to the Private Network http://localhost:8545

Then, open a new terminal window and compile and migrate the contracts using the commands below. Note for reference, all contracts are located in the contracts directory inside the project folder.

```
> truffle compile
> truffle migrate
```

Once the contracts have been compled and migrated, its time to open the front end UI. If it did not open automatically when running 'npm start', you can enter the url http://localhost:3000 into your browser to interact with the project front end.


#### Additional Information

A document called design_pattern_desicions.md located in the project directory explains why the design patterns were used in this project.

A document called avoiding_common_attacks.md located in the project directory explains what measures are taken to ensure contracts are not susceptible to common attacks.


