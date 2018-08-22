import React, { Component } from 'react'
import myBountyContractABI from '../build/contracts/MyBounty.json'  
import getWeb3 from './utils/getWeb3'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Stringify from 'react-stringify'

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
      storageValue: null,
      web3: null,
      wallet: null,
      testList: null,
      bountyCount: null,
      accountBalance: null,
      myBountyInstance: null,
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

     //this.state.ContractInstance = MyContract.at("0x925d81c01d878899adbb7d38f84ce9d5284fa2e7")

    const contract = require('truffle-contract')
    const myBounty = contract(myBountyContractABI)
    myBounty.setProvider(this.state.web3.currentProvider)
    //const provider = new Web3.providers.HttpProvider("http://localhost:8545");

    let myBountyInstance

    this.state.web3.eth.getAccounts((error, accounts) => {
      myBounty.deployed().then((instance) => {
        myBountyInstance = instance
        this.setState({ wallet: myBountyInstance.address })
        return myBountyInstance.bountyCount((err, result) => {
           if(result == null) {
            return console.log(err)
           } 
        })
      }).then((result) => {
        return this.setState({ bountyCount: result })
      }).then(() => {
        const bountyBoardData = [] // [1,2,3]

        for (let i = 1; i <= this.state.bountyCount; i++) {
          //var bitem = 
          bountyBoardData.push(myBountyInstance.fetchBounty(i).then((res) => {
              console.log(res)        
              return res      
          }))

          // .then((res) => {
          //   return bountyBoardData.push(bitem)
          // })

          

          // bountyBoardData.push((i2) => {
          //   console.log(myBountyInstance.fetchBounty(i2))
          //   return myBountyInstance.fetchBounty(i2)
          // })
          // //return myBountyInstance.fetchBounty(1)
          // bountyBoardData.push(myBountyInstance.fetchBounty((i, err, result) => {
          //   if(result == null) {
          //   return console.log(err)
     
        }
        console.log("bountyBoardData: ", bountyBoardData)
        //for (let i = 1; i <= 1; i++) {
          //bountBoardData.push(myBountyInstance.fetchBounty(1)
        //  console.log(myBountyInstance.fetchBounty(i));
        //}
        
        //return this.setState({ testList: bountyBoardData }) 
        return bountyBoardData
      }).then((bdata) => {
          return this.setState({ testList: bdata })
        })
      
    }

// .then(() => {
//         return this.setState({ wallet: myBountyInstance.address })
//       })



// yourContractInstance.maxAmountOfBets((err, result) => {
//    if(result != null) // Do something
// })






      // .catch((err) => {
      //   console.log("Failed with error: " + err);
      // });



// TODO
// SETUP OUTER ID PARAMETER
// SEPARATE FUNCTION TO REUSED FETCH LIST DATA
// REFACTOR CONTRACT WITH ARRAYS AND AFF FOR LOOPS
// make sure when adding a new bounty, it contract rejects already used bounty ids

   // return this.state.web3.eth.getStorageAt(BountyList, 1)

   // this.state.myBountyInstance.createBounty("bounty title","bounty desc", 55, {from: this.state.web3.eth.accounts[0]})
//this.state.setState(  { bountyCount:  2  }    )
    //myBountyInstance.methods.owner().call().then(console.log);
   // console.log(myBountyInstance.createBounty("bounty title","bounty desc", 55, {from: accounts[0]}));


    //     // Get accounts, provide error return variable and an accounts array variable
    // this.state.web3.eth.getAccounts((error, accounts) => {
    //   // Get the instance of the myBounty contract (address?) which is returned and sent to 
    //   // a function to set myBountyInstance to the returned instance variable
    //   myBounty.deployed().then((instance) => {
    //     myBountyInstance = instance
    //     // returns a call to the contracts createBounty function, sent with parameters to create the contract
    //     return myBountyInstance.createBounty("bounty title","bounty desc", 55)
    //   }).then((result) => {
    //     // Get the value from the contract to prove it worked.
    //     return myBountyInstance.get.call(accounts[0])
    //   }).then((result) => {
    //     // Update state with the result.
    //     return this.setState({ storageValue: result.c[0] })
    //   })
    // }


    )

    //console.log("My Wallet: ", this.state.web3.eth.accounts[0]);
    //console.log("My Wallet Balance: ", this.state.accountBalance);
    console.log("App State: ", this.state);
    console.log("Bounty Board List: ", this.state.bountyList);
    //console.log("web3.version: ", this.state.web3.version.getNetwork(function(err,res){console.log(res)}));
    console.log("window.web3.currentProvider: ", window.web3.currentProvider);
    console.log("this.state.web3: ", this.state.web3);
    //  console.log("web3.eth.defaultAccount: ", this.state.web3.eth.defaultAccount);
   // console.log("storageValue: ", this.state.storageValue);
    //console.log("bountyCount: ", this.state.bountyCount);
   // console.log("myBountyInstance: ", this.state.myBountyInstance);


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
            <div className="header text-xs-right"><b>Web3 Account: </b> {this.state.wallet}</div>
            <hr />
            <div className="header text-xs-right"><b>bountyCount:  </b></div>
            <Stringify value={this.state.bountyCount} />
            <hr />
            Test List  <Stringify value={this.state.testList} />
            bountBoardData  <Stringify value={this.state.bountyBoardData} />


<hr /><hr />

           


                <div>
                  <Switch>
                    <Route exact  path="/bounty/:id"      render={()=><Bounty bItem={this.state.bountyList[1]} />}
                     />                  
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
