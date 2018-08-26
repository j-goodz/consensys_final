import  React, { Component } from 'react';
import Stringify from 'react-stringify'

class MySubmissions extends Component {
//		console.log(setSbmissionState)
	render() {
		//console.log("this.state = ", this.state)
		//console.log("this.props = ", this.props)

		const account = this.props.account
		let compiledSubList= []

		const filteredSubmissionList = this.props.bountyList.filter(bounty => bounty.submissionCount > 0 && bounty.submissions.some(sub => account === sub.hunter ))

		//console.log(filteredSubmissionList)

		// const submissionListItems = this.props.bountyList.map((bList) => {
		// 	if (bList.submissionCount > 0) {
		// 		let subList = bList.submissions.map((sList) => {
		// 			compiledSubList.push(sList)
		// 		})
		// 	}

		// 	console.log("compiledSubList: ", compiledSubList)

		// 	const filteredSubList = compiledSubList.filter(function(sItem){
	 //  			return sItem.hunter == account; 
		// 	});

		// 	console.log("filteredSubList: ", filteredSubList)

		// 	//let index = (filteredSubList.findIndex(k => k === filteredSubList) + 1)
			
			
		// 		console.log("filteredSubList: ", filteredSubList.status)


		// 	return ( 	

		// 			)
		// });	

		//let index = (filteredSubList.findIndex(k => k === filteredSubList) + 1)

		const submissionListItems = filteredSubmissionList.map((item, index) => {
			//console.log("item ", item)
			return item.submissions.map((sub, sIndex) => {

				let status = ''
				if (sub.status === 2) { status = "Awaiting Review" } 
				else if (sub.status === 1) { status = "Rejected" } 
				else { status = "Accepted" }


				return (
						<li key={sub.bountyId+sIndex}>
							<b>Bounty ID:</b><br />{sub.bountyId} 
							<br />
							<b>Submission ID:</b><br />{sub.submissionId} 
							<br />
							<b>Submission Status:</b><br />{status}
							<br />
							<b>Proposed Solution:</b><br />{sub.body}
							<br /><br />
						</li> 	
				)
			})
		})
				//console.log("submissionListItem: ", submissionListItems)


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