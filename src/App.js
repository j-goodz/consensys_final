import React, { Component } from 'react'
import SimpleStorageContract from '../build/contracts/SimpleStorage.json'  //remove this later, as well as code for it below 
import getWeb3 from './utils/getWeb3'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import BountyList from './components/bounty-list';
import NewBounty from './components/new-bounty';
import Bounty from './components/bounty';

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
      myAccount: "",
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
    const simpleStorage = contract(SimpleStorageContract)
    simpleStorage.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var simpleStorageInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      simpleStorage.deployed().then((instance) => {
        simpleStorageInstance = instance

        // Stores a given value, 5 by default.
        return simpleStorageInstance.set(5, {from: accounts[0]})
      }).then((result) => {
        // Get the value from the contract to prove it worked.
        return simpleStorageInstance.get.call(accounts[0])
      }).then((result) => {
        // Update state with the result.
        return this.setState({ storageValue: result.c[0] })
      })
    })
  }

  render() {
    console.log("Bounty Board list: ", this.state.bountyList);
    return (
      <div className="App">
        <BrowserRouter>
          <div>
        <nav className="navbar pure-menu pure-menu-horizontal">
            <Link to="/" className="pure-menu-heading pure-menu-link">Main Bounty Board</Link>
            <Link to="/my_bounties" className="pure-menu-heading pure-menu-link">My Bounties</Link>
            <Link to="/my_submissions" className="pure-menu-heading pure-menu-link">My Submissions</Link>
            <Link to="/new_bounty" className="pure-menu-heading pure-menu-link">Post New Bounty</Link>
        </nav>

        <main className="container">
            <br />
            <div className="header text-xs-right"><b>Meta Mask Account: </b></div>
              
                <div>

                  <Switch>
                    <Route exact path="/bounty/:id" render={()=><Bounty />}/>                  
                    <Route path="/new_bounty" component={NewBounty}/>
                    <Route exact path="" render={()=><BountyList bList={this.state.bountyList} />}/>
                    <Route path="/my_bounties" render={()=><BountyList bList={this.state.bountyList} />}/>
                    <Route path="/my_submissions" render={()=><BountyList bList={this.state.bountyList} />}/>
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
