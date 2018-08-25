import  React, { Component } from 'react';

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
	}

	updateField(event) {
		this.setState({ [ event.target.name ]: event.target.value })
		//console.log(event.target.name)
	}

	handleSubmit(event) {
		event.preventDefault();
		console.log("Sate @ send tx ", this.props.state)
		const newBounty = this.props.state.myBountyInstance.createBounty(
			this.state.bounty_title, 
			this.state.bounty_description, 
			this.state.bounty_amount
		)
		console.log(newBounty)
		console.log(this.state.web3)
	}

	render() {
		//console.log(this.props)
		//console.log(this.props.state.myBountyInstance)

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