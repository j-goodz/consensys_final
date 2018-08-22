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
      bountyList: []
    };
  }

  async componentWillMount() {
    try {
      //console.log("componentWillMount");
      const results = await getWeb3;
      console.log("results = ", results);

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
        console.log("myBountyInstance (state): ", this.state.myBountyInstance);

        const count = await this.state.myBountyInstance.bountyCount()
        //console.log("count: ", count)
        this.setState({ bountyCount: count })

        const bountyBoardData = []; // [1,2,3]
          for (let i = 1; i <= this.state.bountyCount; i++) {
            let bounty = await this.state.myBountyInstance.fetchBounty(i)
            bountyBoardData.push(bounty)
          }
        this.setState({ bountyList: bountyBoardData })

      } catch (err) {
        console.log("Error instantiating contract.", err);
      }
    });

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
              </div>

              <hr />
              <div>
                <Switch>
                  <Route exact  path="/bounty/:id"
                    render={({match}) => <Bounty bountyList={this.state.bountyList} match={match} />}
                  />
                  <Route        path="/new_bounty" component={NewBounty} />
                  <Route exact  path=""
                    render={() => <BountyList bList={this.state.bountyList} />}
                  />
                  <Route        path="/my_bounties" render={() => <BountyList bList={this.state.bountyList} />}
                  />
                  <Route        path="/my_submissions" render={() => (
                      <SubmissionList sList={this.state.bountyList} />
                    )}
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
