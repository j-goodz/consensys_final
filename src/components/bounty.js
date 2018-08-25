import  React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import Submit from '../components/submit';
//import SubmissionList from '../components/submission-list';
//import Stringify from 'react-stringify'

class Bounty extends Component {
	// constructor(props){
	// 	//super(props);
	// 	//this.handleSubmit=this.handleSubmit.bind(this)
	// 	this.state = {
	// 		bountyId: this.props.match.params.id,
	// 		submissionId: null
	// 	}
	// }

	handleAccept(e) {
		//console.log("handleAccept! Index = ", e)
		//console.log("e.target.value = ", e.target.value)
		console.log("e.target.name = ", e.target.name)
		console.log("e.target.id = ", e.target.id)
		// console.log("+this.props.match.params.id", +this.props.match.params.id)
		//console.log("this.state ", this.props)

		const bountyId = e.target.name 
		const submissionId = e.target.id 

		let action = null
		if (e.target.value === 'Accept') {
			action = 0
		} else if (e.target.value === 'Reject') {
			action = 1
		}
		// console.log("submissionId = ", submissionId)
		const setSubmissionState = this.state.myBountyInstance.acceptSubmission(bountyId, submissionId)
	}
	handleReject() {

	}
//		console.log(setSbmissionState)
	render() {
		//console.log("this.state = ", this.state)
		console.log("this.props = ", this.props)
		const bountyId = +this.props.match.params.id
		const bounty = this.props.state.bountyList[bountyId-1];

		const account = this.props.account
		const bountyPoster = bounty.bountyPoster

		//console.log("bounty.bountyPoster : ", bounty.bountyPoster)

		const submissionListItems = bounty.submissions.map((sList) => {
			let index = (bounty.submissions.findIndex(k => k === sList) + 1)
			let status = ''
			if (sList.status === 2) { status = "Awaiting Review" } 
			else if (sList.status === 1) { status = "Rejected" } 
			else { status = "Accepted" }
			return ( 	
						<li key={index}>
							<b>({index}) Bounty Hunter:</b><br />{sList.hunter} 
							<br />
							<b>Submission Status:</b><br />{status}
							<br />
							<b>Proposed Solution:</b><br />{sList.body}
							<br />
							{ account ==  bountyPoster ? 
								<div>
									<input id={index} name={bountyId} type="submit" value="Accept" onClick={this.handleAccept}/>
									<input id={index} name={bountyId}  type="submit" value="Reject" onClick={this.handleAction} />
						    	</div>
						    : null }

							<br /><br />
						</li> 
					)
		});	

    	return (
      		<div>
				<h1>Bounty Post:</h1>

				<b>Bounty Poster:</b><br />
				{bounty.bountyPoster}<br /><br />

				<b>Bounty Title:</b><br />
				{bounty.title}<br /><br />

				<b>Bounty Description:</b><br />
				{bounty.description}<br /><br />

				<b>Bounty Reward:</b><br />
				{bounty.amount} ETH?<br /><br />
				
				<b>Bounty State:</b><br />
				{ bounty.state === 0 ? 'Open' : 'Closed' }
				<br /><br />
				
				<b>Number of submissions:</b><br />
				{bounty.submissionCount}

      			<br />


				{ account !==  bountyPoster ? 
					<div>
						<br /><hr />
						<h1>Submit Solution:</h1>
						<Submit myBountyInstance={this.props.state.myBountyInstance} bountyId={bountyId} />
						</div>
				: null }

				<br /><hr />
				<h1>Submission List:</h1>
				<ul>
					{submissionListItems}
				</ul>

			</div>
    	);
  	}
}

			

export default Bounty;