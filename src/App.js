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
      events: null
    };

    this.instantiateContract = this.instantiateContract.bind(this)
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
    } catch (err) {
      console.log("Error finding web3.", err);
    }
  }


  instantiateContract() {
    const contract = require("truffle-contract");
    const myBounty = contract(myBountyContractABI);
    myBounty.setProvider(this.state.web3.currentProvider);

    this.state.web3.eth.getAccounts(async (error, accounts) => {
      try {
        const myBountyInstance = await myBounty.deployed();
        this.setState({ contractAddr: myBountyInstance.address });
        this.setState({ myBountyInstance: myBountyInstance });
        this.setState({ account: accounts[0] });
        //console.log(this.state.web3)
        // console.log("accounts[0]: ", accounts[0]);
        //console.log("account: ", this.state.account);
        //console.log("contractAddr.address: ", this.state.contractAddr);
        //this.state.web3.eth.defaultAccount = accounts[0]
        //this.setState({ web3.eth.defaultAccount: '0x8f31c0b71cb23e22eb2ffacfd325d90b31c70403' });

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


        var events = await this.state.myBountyInstance.allEvents({fromBlock: 0, toBlock: 'latest'});
        //var events = await this.state.myBountyInstance.allEvents({fromBlock: (await this.state.web3.eth.getBlockNumber()), toBlock: 'latest'});
        this.setState({ events: events })

        // would get all past logs again.
        this.state.events.get(function(error, logs){ 
          // console.log("get: ", logs, Error)
          // console.log(logs)
          //console.log("this.state.bountyList: ", this.state.bountyList)
        });

        this.state.events.watch(function(error, result){
           // console.log("allevents.args: ", result.args, error)
           // console.log("allevents.event: ", result.event, error)
           // console.log("result.args.bountyId: ", result.args.bountyId.toNumber())

 //          return updateBconsole.log("this.state.bountyList: ", this.state.bountyList)ountyList(result);
  // let updateBountyList = this.state.bountylist
  // console.log("updateBountyList: ", updateBountyList)
         //console.log("this.state.bountyList: ", this.state.bountyList)
  // console.log("this.state: ", this.state)
  // if ( result.event === "CreateBounty" ) { 
  //   const verboseBounty = { 
  //   bountyPoster: result.args.bountyPoster,
  //   title: result.args.title,
  //   description: result.args.description,
  //   amount: result.args.amount.toNumber(),
  //   state: result.args.state.toNumber(),
  //   //submissionCount: result.args.SubmissionCount.toNumber(),
  //   //submissions: {}
  //   }
  //   updateBountyList[result.args.bountyId.toNumber()] = verboseBounty
  //   console.log("Updating BountyList!")
  //   this.setState({ bountyList: updateBountyList })
  // }
        });

      } catch (err) {
        console.log("Error instantiating contract.", err);
      }
    });
    //console.log("App state ", this.state);
  }



  async contractEvent(err, value) {
    // Whenver an event is emitted, then do a read to update values
    // Use this event as a trigger to invoke the get value
    console.log(JSON.stringify(value, null, 2))
  }

  render() {
    //console.log("state: ", this.state )
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

              // Stringify: <Stringify value={this.state.bountyList} />
export default App;
