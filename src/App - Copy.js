import React, { Component } from 'react'
import myBountyContract from '../build/contracts/MyBounty.json'  
import getWeb3 from './utils/getWeb3'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import BountyList from './components/bounty-list';
import NewBounty from './components/new-bounty';
import Bounty from './components/bounty';
import SubmissionList from './components/submission-list';

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null,
      wallet: null,
      testList: [ 1, 2, 3 ],

      bountyList: [
        {
        bountyId: 1,
        bountyPoster: "0x0123",  
        title: "first post title",  
        description: "first post desscription",  
        amount: 5,  
        state: 0,  
        submissionCount: 1,  
        submissions: [
            {
            submissionId: 1,
            hunter: "0x0123",
            body: "submission 1 text",
            status: 0
            }
          ]    
        },
        {
        bountyId: 2,
        bountyPoster: "0x0123",  
        title: "second post title",  
        description: "second post desscription",  
        amount: 6,  
        state: 0,  
        submissionCount: 1,  
        submissions: [
            {
            submissionId: 1,
            hunter: "0x0123",
            body: "submission 1 text",
            status: 0
            }
          ]    
        }
      ]

    };
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.
    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /* SMART CONTRACT EXAMPLE
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const myBounty = contract(myBountyContract)
    //myBounty.setProvider(this.state.web3.currentProvider)
    myBounty.setProvider(this.state.web3.currentProvider)
    //const provider = new Web3.providers.HttpProvider("http://localhost:8545");

    // Declaring this for later so we can chain functions on SimpleStorage.
    var myBountyInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      myBounty.deployed().then((instance) => {
        myBountyInstance = instance

        // Stores a given value, 5 by default.
        return myBountyInstance.set(5, {from: accounts[0]})
      }).then((result) => {
        // Get the value from the contract to prove it worked.
        return myBountyInstance.get.call(accounts[0])
      }).then((result) => {
        // Update state with the result.
        return this.setState({ storageValue: result.c[0] })
      })
    })
    this.setState({ wallet: this.state.web3.eth.accounts[0]});    

    console.log("My Wallet: ", this.state.web3.eth.accounts[0]);
    console.log("Bounty Board List: ", this.state.bountyList);
    //console.log("web3.version: ", this.state.web3.version.getNetwork(function(err,res){console.log(res)}));
    console.log("window.web3.currentProvider: ", window.web3.currentProvider);
    console.log("this.state.web3: ", this.state.web3);

    // console.log("My Wallet 2: ", this.state.web3.eth.accounts);
    // console.log("My Wallet 3: ", this.state.wallet);

    //var mywallet = this.state.web3.eth.accounts[0];
    //this.state.setState({ wallet: this.state.web3.eth.accounts[0] });

    //console.log("Wallet address: ",this.state.wallet);
    //this.state.web3.eth.getAccounts(accounts => console.log(accounts[0]))
    //this.state.web3.eth.getAccounts(console.log);
    //this.web3.eth.getAccounts(function(err, res){ console.log(res); });

    //   this.state.web3.setState({wallet: accounts[0]});
    //console.log({instance});

    this.state.web3.version.getNetwork((err, netId) => {
  switch (netId) {
    case "1":
      console.log('This is mainnet')
      break
    case "2":
      console.log('This is the deprecated Morden test network.')
      break
    case "3":
      console.log('This is the ropsten test network.')
      break
    default:
      console.log('This is an unknown network.')
  }
});

  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
        <nav className="navbar pure-menu pure-menu-horizontal">
            <Link to="/"                className="pure-menu-heading pure-menu-link">Main Bounty Board</Link>
            <Link to="/my_bounties"     className="pure-menu-heading pure-menu-link">My Bounties</Link>
            <Link to="/my_submissions"  className="pure-menu-heading pure-menu-link">My Submissions</Link>
            <Link to="/new_bounty"      className="pure-menu-heading pure-menu-link">Post New Bounty</Link>
        </nav>

        <main className="container">
            <br />
            <div className="header text-xs-right"><b>Web3 Account: {this.state.wallet} </b></div>

                <div>
                  <Switch>
                    <Route exact  path="/bounty/:id"      render={()=><Bounty bItem={this.state.bountyList} />}/>                  
                    <Route        path="/new_bounty"      component={NewBounty} />
                    <Route exact  path=""                 render={()=><BountyList bList={this.state.bountyList} />}/>
                    <Route        path="/my_bounties"     render={()=><BountyList bList={this.state.bountyList} />}/>
                    <Route        path="/my_submissions"  render={()=><SubmissionList sList={this.state.bountyList} />}/>
                  </Switch>
                </div>
              
        </main>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App
