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
      wallet: null,
      bountyCount: null,
      myBountyInstance: null,
      submission_text: '',
      bountyList: []
    };
  }

  async componentWillMount() {
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
        this.setState({ wallet: myBountyInstance.address });
        this.setState({ myBountyInstance: myBountyInstance });
        //console.log("myBountyInstance: ", myBountyInstance);
        //console.log("myBountyInstance (state): ", this.state.myBountyInstance);

        const count = await this.state.myBountyInstance.bountyCount()
        //console.log("count: ", count)
        this.setState({ bountyCount: count })

        const bountyBoardData = []; // [1,2,3]
          for (let i = 1; i <= this.state.bountyCount; i++) {
            let bounty = await this.state.myBountyInstance.fetchBounty(i)
            let bountySubmissions = []

            console.log(bounty) // 5th index is submission count

            //console.log(bounty[5].toNumber()) // 5th index is submission count


            const submissionFields = "bountyId subissionId hunter body status".split(" ")
            

            let verboseSubmission

            if (bounty[5].toNumber() > 0) {
              for (let s = 1; s <= bounty[5].toNumber(); s++) {
                let submission = await this.state.myBountyInstance.fetchSubmission(s,bounty[5].toNumber())

                verboseSubmission = submissionFields.reduce((pre, cur, index) => {
                  pre[cur] = submission[index]
                  return pre
                }, {} )

                console.log("submissionFields ", submissionFields)
                console.log("submission ", submission)
                console.log("verboseSubmission ", verboseSubmission)

                // console.log("verboseSubmission ", verboseSubmission)
                // console.log("verboseSubmission ", verboseSubmission)
                // console.log("verboseSubmission ", verboseSubmission)


            // _bountyId,
            // _submissionId,
            // BountyList[_bountyId].submissions[_submissionId].hunter, 
            // BountyList[_bountyId].submissions[_submissionId].body, 
            // BountyList[_bountyId].submissions[_submissionId].status


                bountySubmissions.push(verboseSubmission)

              }
            }

            const verboseBounty = { 
                bountyPoster: bounty[0],
                title: bounty[1],
                description: bounty[2],
                amount: bounty[3],
                state: bounty[4],
                submissionCount: bounty[5],
                submissions: verboseSubmission

              }

              console.log(verboseBounty)
            // address bountyPoster;
            // string title;
            // string description;
            // uint amount;
            // BountyState state;
            // uint submissionCount; // used as solution index for BountyItem's
            // mapping (uint => HunterSubmission) submissions;


            //console.log("bounty: ", bounty)
            //console.log("bountySubmissions: ", bountySubmissions)
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
                <b>Web3 Account: </b> {this.state.wallet}
                <hr />
              </div>
              <div>
                <Switch>

                  <Route exact  path="/bounty/:id"
                    render={({match}) => <Bounty state={this.state} match={match} />} />

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

export default App;
