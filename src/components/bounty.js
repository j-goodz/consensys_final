import  React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import Submit from '../components/submit';
//import SubmissionList from '../components/submission-list';
//import SubmissionListItem from '../components/submission-list-item';
import Stringify from 'react-stringify'

class Bounty extends Component {
	componentDidMount(){
		//const bId = this.props.match.params.id
		//console.log("Mount: ", this.props.state.bountyList)
    	
	}

	render() {

		const bountyId = this.props.match.params.id
		const bounty = this.props.state.bountyList[bountyId]
		// const bountyDetails = this.props.bountyList.map((deets) => {
		// 	return (
		// 				deets[1]
		// 			)
		// })
		//console.log("Bounty ID: ", bountyId)
		//console.log("Bounty: ", bounty)
		//console.log("this.props.state.bountyList: ", this.props.state.bountyList[bountyId])
		//console.log("tzz ", this.state.bountyList[bountyId])
    	return (
      		<div>

      			<br /><br />

				(from bounty.js) bountyList[{bountyId}]:
				<br /><br />
				Stringify: <Stringify value={this.props.state.bountyList[1]} />
				<br /><br />

				bounty is: 
				<Stringify value={bounty} />
				<br />Bounty Poster: 
			
					
				<br />Bounty Title: 
				<br />Bounty Description:
				<br />Bounty Reward:
				<br />Bounty State:
				<br />Number of submissions:

				<Submit />
				<br />
				Submission List:
			</div>
    	);
  	}
}


export default Bounty;