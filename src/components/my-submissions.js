import  React, { Component } from 'react';
import Stringify from 'react-stringify'

class MySubmissions extends Component {
//		console.log(setSbmissionState)
	render() {
		//console.log("this.state = ", this.state)
		console.log("this.props = ", this.props)

		const account = this.props.account
		let compiledSubList= []

		const submissionListItems = this.props.bountyList.map((bList) => {
			//console.log("bList: ", bList)
			if (bList.submissionCount > 0) {
				let subList = bList.submissions.map((sList) => {
					//console.log("sList: ", sList)
					compiledSubList.push(sList)
				})
					  // bountyId: submission[0].toNumber(),
				      //  submissionId: submission[1].toNumber(),
				      //  hunter: submission[2],
				      //  body: submission[3],
				      //  status: submission[4].toNumber()
			}

			console.log("compiledSubList: ", compiledSubList)

			const filteredSubList = compiledSubList.filter(function(sItem){
	  			return sItem.hunter == account; 
			});

			console.log("filteredSubList: ", filteredSubList)

			let index = (filteredSubList.findIndex(k => k === filteredSubList) + 1)
			
			let status = ''
			if (filteredSubList.status === 2) { status = "Awaiting Review" } 
			else if (filteredSubList.status === 1) { status = "Rejected" } 
			else { status = "Accepted" }
				console.log("filteredSubList.status: ", filteredSubList.status)
			return ( 	
						<li key={index}>
							<b>Bounty ID:</b><br />{filteredSubList.bountyId} 
							<br />
							<b>Submission ID:</b><br />{filteredSubList.submissionId} 
							<br />
							<b>Submission Status:</b><br />{filteredSubList.status}
							<br />
							<b>Proposed Solution:</b><br />{filteredSubList.body}
							<br /><br />
						</li> 
					)
		});	

    	return (
      		<div>
				<h1>My Submissions:</h1>
				<ul>
					{submissionListItems}
				</ul>

				
				<br /><hr />

			</div>
    	);
  	}
}

export default MySubmissions;