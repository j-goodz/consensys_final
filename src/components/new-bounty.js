import  React, { Component } from 'react';
// import { History } from "react-router-dom";
import Stringify from 'react-stringify'
// import _ from 'lodash';

class NewBounty extends Component {
	constructor(props){
		super(props);

		this.state = {
			bounty_title: '',
      		bounty_description: '',
     		bounty_amount: ''
		}

		this.handleSubmit=this.handleSubmit.bind(this)
		this.updateField=this.updateField.bind(this)
		console.log("props - ",props)
	}

	updateField(event) {
		this.setState({ [ event.target.name ]: event.target.value })
		//console.log(event.target.name)
	}

	async handleSubmit(event) {
		event.preventDefault();

		const web3 = this.props.state.web3
		const accountAddr = this.props.state.web3.eth.accounts[0]
		const contractAddr = this.props.state.myBountyInstance.address
		const title = this.state.bounty_title 
		const description = this.state.bounty_description 
		const amount = this.state.bounty_amount

		var callData = await this.props.state.myBountyInstance.createBounty({title, description, amount})

		console.log("callData - ". callData)

		web3.eth.sendTransaction({
  			from: accountAddr,
  			to: contractAddr,
			value:  web3.toWei(this.state.bounty_amount, "ether"), 
			data: callData
			
        }, function(err, transactionHash) {
     	if (!err)
         	console.log(transactionHash + " success"); 
        	});

		//push('/')
	}

	render() {
		//console.log(this.props)
		// console.log("this.state -" this.state)

		return (
			<div>
				<h1>New Bounty:</h1>
				<form onSubmit={this.handleSubmit}>
					Bounty Title<br />
					<input 
						style={{width: '400px'}}
						type="text" 
						name="bounty_title" 
						value={this.state.bounty_title} 
						onChange={this.updateField}
						/>

						<br /><br />
					Bounty Description<br />
					<input 

						style={{height: '200px', width: '400px'}}
						type="textarea" 
						rowSpan={10}
						name="bounty_description" 
						value={this.state.bounty_description}
						onChange={this.updateField} />

						<br /><br />
					Reward Amount<br />
					<input type="text" 
						name="bounty_amount" 
						value={this.state.bounty_amount} 
						onChange={this.updateField} 
						/>

					<br /><br />

              		<input type="submit" value="Post Bounty"/>



				</form>
			</div>
		);
	}
};


export default NewBounty;