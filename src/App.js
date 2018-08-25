import React, { Component } from "react";
import myBountyContractABI from "../build/contracts/MyBounty.json";
import getWeb3 from "./utils/getWeb3";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Stringify from "react-stringify";

import BountyList from "./components/bounty-list";
import NewBounty from "./components/new-bounty";
import Bounty from "./components/bounty";
import SubmissionList from "./components/submission-list";

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
      bountyList: []
    };
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
    //this.state.ContractInstance = MyContract.at("0x925d81c01d878899adbb7d38f84ce9d5284fa2e7")
    const contract = require("truffle-contract");
    const myBounty = contract(myBountyContractABI);
    myBounty.setProvider(this.state.web3.currentProvider);
    //const provider = new Web3.providers.HttpProvider("http://localhost:8545");

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

        //console.log("contractAddr: ", this.state.contractAddr);
        // console.log("defaultAccountWeb3: ", defaultAccountWeb3);
        //console.log("myBountyInstance: ", myBountyInstance);
        //console.log("myBountyInstance (state): ", this.state.myBountyInstance);

        const count = await this.state.myBountyInstance.bountyCount()
        this.setState({ bountyCount: count })

        const bountyBoardData = []; 
          for (let i = 1; i <= this.state.bountyCount; i++) {
            let bounty = await this.state.myBountyInstance.fetchBounty(i)
            const bountySubCount = bounty[5].toNumber()
            let bountySubmissions = []
            let verboseSubmissions = {}
            //const submissionFields = "bountyId subissionId hunter body status".split(" ")

            //console.log("bounty object = ", bounty)
           // console.log("bounty object SubCount = ", bountySubCount)
            if (bountySubCount > 0) {
              for (let s = 1; s <= bountySubCount; s++) {
                let submission = await this.state.myBountyInstance.fetchSubmission(i , s)
                //console.log("bountyId, submissionId = ", i, " ", s)
                
                verboseSubmissions = {
                  bountyId: submission[0].toNumber(),
                  submissionId: submission[1].toNumber(),
                  hunter: submission[2],
                  body: submission[3],
                  status: submission[4].toNumber()
                }

                //console.log("verboseSubmissions: ", verboseSubmissions)
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
            //console.log("bountySubmissions.length: ", bountySubmissions.length)
            //bounty[6] = bountySubmissions // append submissions (with submissions or empty) to the bounty array
            bountyBoardData.push(verboseBounty)
          }

        this.setState({ bountyList: bountyBoardData })

      } catch (err) {
        console.log("Error instantiating contract.", err);
      }
    });
    console.log("App state ", this.state);
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

                  <Route exact  path="/bounty/:id"
                    render={({match}) => <Bounty state={this.state} myBountyInstance={this.state.myBountyInstance} match={match} />} />

                  <Route        path="/new_bounty" 
                                render={() => <NewBounty state={this.state} />} />

                  <Route exact  path=""
                    render={() => <BountyList bountyList={this.state.bountyList} />} />

                  <Route        path="/my_bounties" render={() => <BountyList bList={this.state} />} />

                  <Route        path="/my_submissions" render={() => (<SubmissionList sList={this.state} />)}
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
