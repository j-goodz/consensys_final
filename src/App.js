import React, { Component } from "react";
import myBountyContractABI from "../build/contracts/MyBounty.json";
import getWeb3 from "./utils/getWeb3";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
//import Stringify from "react-stringify";

import BountyList from "./components/bounty-list";
import NewBounty from "./components/new-bounty";
import Bounty from "./components/bounty";
import MyBounties from "./components/my-bounties";
import MySubmissions from "./components/my-submissions";
//import SubmissionList from "./components/submission-list";
// import HDWalletProvider from 'truffle-hdwallet-provider';

import "./css/oswald.css";
import "./css/open-sans.css";
import "./css/pure-min.css";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      web3: null,
      account: [], 
      contractAddr: null,
      bountyCount: null,
      myBountyInstance: null,
      bountyList: [],
      events: null,
      contractAddr: '0x401d199c88a16709339e2ed341e6b6730f459367'
    };

    this.CreateBounty = this.CreateBounty.bind(this)
    this.CreateSubmission = this.CreateSubmission.bind(this)
    this.AcceptSubmission = this.AcceptSubmission.bind(this)
    this.RejectSubmission = this.RejectSubmission.bind(this)
    this.instantiateContract = this.instantiateContract.bind(this)
    this.initAccountUpdater = this.initAccountUpdater.bind(this)
  }

updateBountyList(result) {
}

  // async componentWillMount() {
  async componentDidMount() {
    try {
      //console.log("componentWillMount");
      const results = await getWeb3;
      //console.log("results = ", results);

      this.setState({ web3: results.web3 });
      this.instantiateContract();
      this.initAccountUpdater();

    } catch (err) {
      console.log("Error finding web3.", err);
    }
  }
  

  initAccountUpdater() {
    let accountInterval = setInterval(() => {
      if (this.state.web3.eth.accounts[0] !== this.state.account) {
        const newAccount = this.state.web3.eth.accounts[0]
        this.setState({ account: newAccount })
        }
      }, 1000);
  }

    
  componentWillUnmount() {
    clearInterval(this.accountInterval)

  }

    CreateBounty (err, value) {
      let updateBountyList = this.state.bountyList
      let existingHash = false

      for (let i = 0; i <= (updateBountyList.length-1); i++) {
        if (value.transactionHash === updateBountyList[i].transactionHash) {
          existingHash = true
          console.log("CreateBounty dupe txHash found!")
        } else {
          if (existingHash === false && i === (updateBountyList.length-1)) {
            let verboseNewBounty = {
              bountyId: value.args.bountyId.toNumber(),
              bountyPoster: value.args.bountyPoster,
              title: value.args.title,
              description: value.args.description,
              amount: value.args.amount.toNumber(),
              state: value.args.state.toNumber(),
              submissionCount: value.args.submissionCount.toNumber(),
              submissions: [],
              txHash: value.transactionHash
            }
      
            updateBountyList.push(verboseNewBounty)
            this.setState({ bountyList: updateBountyList })
            console.log("value: ", value)

          }
        }
      }
    }

    CreateSubmission (err, value) {
      let existingHash = false

      const updateBountyList = this.state.bountyList.map((bItem, index) => {
        bItem.submissions.map((sItem) => {
          if (sItem.txHash === value.transactionHash) {
            // console.log("match found!")
            existingHash = true
          }
        })

        if ((index+1) === value.args.bountyId.toNumber() && existingHash === false) { 
          const newSubmission = {
            bountyId: value.args.bountyId.toNumber(),
            submissionId: value.args.submissionId.toNumber(),
            hunter: value.args.hunter,
            body: value.args.body,
            status: 2, // Penging Review status
            txHash: value.transactionHash
          }

          const updateSubmissions = [...bItem.submissions, newSubmission]
          
          let newBItem = bItem
          newBItem.submissionCount++
          newBItem.submissions = updateSubmissions
          // console.log("CreateSubmission executed!")
          // return newBItem
        } 
        return bItem
          
      })

      //console.log("newSubmission updateBountyList: ", updateBountyList)
      this.setState({ bountyList: updateBountyList })
    }

    AcceptSubmission (err, value) {

      const updateBountyList = this.state.bountyList.map((bItem, index) => {
          if ((index+1) === value.args.bountyId.toNumber()) { 
            const updateSubmissions = bItem.submissions.map((sItem) => {
              if (sItem.submissionId === value.args.submissionId.toNumber()) { 
                const acceptedSubmission = {
                  bountyId: sItem.bountyId,
                  submissionId: sItem.submissionId,
                  hunter: sItem.hunter,
                  body: sItem.body,
                  status: 0 //accepted === 0
                }
                return acceptedSubmission
              }
              return sItem
            })
            bItem.submissions = updateSubmissions
            bItem.state = 1

            return bItem
          } 

      })
      this.setState({ bountyList: updateBountyList })

    }
    
    RejectSubmission (err, value) {
      //  console.log("RejectSubmission: ", JSON.stringify(value, null, 2))
      const updateBountyList = this.state.bountyList.map((bItem, index) => {
          if ((index+1) === value.args.bountyId.toNumber()) { 
            const updateSubmissions = bItem.submissions.map((sItem) => {
              if (sItem.submissionId === value.args.submissionId.toNumber()) { 
                const rejectedSubmission = {
                  bountyId: sItem.bountyId,
                  submissionId: sItem.submissionId,
                  hunter: sItem.hunter,
                  body: sItem.body,
                  status: 1 //rejected === 1
                }
                return rejectedSubmission
              }
              return sItem
            })
            bItem.submissions = updateSubmissions
            return bItem
          } 
          return bItem
      })
      this.setState({ bountyList: updateBountyList })
    }
    


  instantiateContract() {
    const contract = require("truffle-contract");
    const myBounty = contract(myBountyContractABI);
    myBounty.setProvider(this.state.web3.currentProvider);

    this.state.web3.eth.getAccounts(async (error, accounts) => {
      try {

        // const myBountyInstance = await myBounty.deployed(); // local code
        const myBountyInstance = await myBounty.at(this.state.contractAddr);

        myBountyInstance.CreateBounty(this.CreateBounty)
        myBountyInstance.CreateSubmission(this.CreateSubmission)
        myBountyInstance.RejectSubmission(this.RejectSubmission)
        myBountyInstance.AcceptSubmission(this.AcceptSubmission)

        this.setState({ contractAddr: myBountyInstance.address });
        this.setState({ myBountyInstance: myBountyInstance });
        this.setState({ account: accounts[0] });

        const defaultAccountWeb3 = this.state.web3
        defaultAccountWeb3.eth.defaultAccount = accounts[0]
        defaultAccountWeb3.personal.unlockAccount = defaultAccountWeb3.eth.defaultAccount
        this.setState({ web3: defaultAccountWeb3 })

        const count = await this.state.myBountyInstance.bountyCount()
        this.setState({ bountyCount: count.toNumber() })

        const bountyBoardData = []; 

          for (let i = 1; i <= this.state.bountyCount; i++) {
            let bounty = await this.state.myBountyInstance.fetchBounty(i)
            const bountySubCount = bounty[5].toNumber()
            let bountySubmissions = []
            let verboseSubmissions = {}

            if (bountySubCount > 0) {
              for (let s = 1; s <= bountySubCount; s++) {
                let submission = await this.state.myBountyInstance.fetchSubmission(i , s)
                verboseSubmissions = {
                  bountyId: submission[0].toNumber(),
                  submissionId: submission[1].toNumber(),
                  hunter: submission[2],
                  body: submission[3],
                  status: submission[4].toNumber()
                }
                bountySubmissions.push(verboseSubmissions)
              }
            }

            const verboseBounty = { 
                bountyPoster: bounty[0],
                title: bounty[1],
                description: bounty[2],
                amount: bounty[3].toNumber(),
                state: bounty[4].toNumber(),
                submissionCount: bounty[5].toNumber(),
                submissions: bountySubmissions
              }
            bountyBoardData.push(verboseBounty)
          }

        this.setState({ bountyList: bountyBoardData })

      } catch (err) {
        console.log("Error instantiating contract.", err);
      }
    });
  }


  render() {
    //console.log("state: ", this.state )

    if (this.state.web3 === null ) return <div>Loading...</div> 

    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <nav className="navbar pure-menu pure-menu-horizontal">
              <Link to="/" className="pure-menu-heading pure-menu-link">
                Main Bounty Board
              </Link>
              <Link   to="/my_bounties" className="pure-menu-heading pure-menu-link" >
                My Bounties
              </Link>
              <Link to="/my_submissions" className="pure-menu-heading pure-menu-link" >
                My Submissions
              </Link>
              <Link to="/new_bounty" className="pure-menu-heading pure-menu-link" >
                Post New Bounty
              </Link>
            </nav>

            <main className="container">
              <br />
              <div className="header text-xs-right">
                <b>Contract Address: </b> {this.state.contractAddr}
                <br />
                <b>Web3 Account: </b> {this.state.account}
                <br />



                <hr />
              </div>
              <div>
                <Switch>
                  <Route 
                    exact  
                    path="/my_bounties" 
                    render={() => <MyBounties 
                      bountyList={this.state.bountyList}
                      account={this.state.account} />} 
                  />


                  <Route 
                    exact 
                    path="/my_submissions" 
                    render={() => (<MySubmissions 
                      bountyList={this.state.bountyList} 
                      bountyCount={this.state.bountyCount} 
                      account={this.state.account} />)}
                  />


                  <Route 
                    exact  
                    path="/bounty/:id"
                    render={({match}) => <Bounty 
                      state={this.state} 
                      myBountyInstance={this.state.myBountyInstance} 
                      match={match} 
                      account={this.state.account} />} 
                  />


                  <Route        
                    path="/new_bounty" 
                    render={() => <NewBounty 
                      state={this.state} 
                      //history=
                      />}
                  />
                  

                  <Route 
                    exact  
                    path=""
                    render={() => <BountyList 
                      bountyList={this.state.bountyList} />} 
                  />


                </Switch>
              </div>
            </main>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
