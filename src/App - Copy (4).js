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

  async componentWillMount() {
    try{
    console.log('componentWillMount')
    const results = await getWeb3
    console.log('results = ', results)

    this.setState({ web3: results.web3 })

    this.instantiateContract()
    } catch(err){
      console.log('Error finding web3.')
    }
  }

  instantiateContract() {
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
        //return this.setState({ bountyCount: result })
        const bountyBoardData = [] // [1,2,3]

        for (let i = 1; i <= this.state.bountyCount; i++) {
          //var bitem = 
          bountyBoardData.push(myBountyInstance.fetchBounty(i).then((res) => {
              console.log(res)        
              return res      
          }))
     
        }
        console.log("bountyBoardData: ", bountyBoardData)

        return bountyBoardData

      }).then(() => {
        
      }).then((bdata) => {
          return this.setState({ testList: bdata })
        })
      
    }

// .then(() => {
//         return this.setState({ wallet: myBountyInstance.address })
//       })



// TODO
// SETUP ROUTER ID PARAMETER PROPS
// SEPARATE FUNCTION TO REUSED FETCH LIST DATA?

    )

    console.log("App State: ", this.state);
    //console.log("Bounty Board List: ", this.state.bountyList);
    console.log("window.web3.currentProvider: ", window.web3.currentProvider);
    //console.log("this.state.web3: ", this.state.web3);

  //   this.state.web3.version.getNetwork((err, netId) => {
  // switch (netId) { case "1": console.log('This is mainnet')
  //     break
  //   case "2": console.log('This is the deprecated Morden test network.')
  //     break
  //   case "3": console.log('This is the ropsten test network.')
  //     break
  //   default: console.log('This is an unknown network.')
  // }
// });

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

                    <Route exact  path="/bounty/:id"      
                      render={()=><Bounty bItem={this.state.bountyList[1]} />}
                     />     

                    <Route        path="/new_bounty"      component={NewBounty}  />
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
