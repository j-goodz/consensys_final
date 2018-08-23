import  React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import Submit from '../components/submit';
//import SubmissionList from '../components/submission-list';
//import SubmissionListItem from '../components/submission-list-item';
import Stringify from 'react-stringify'

class Bounty extends Component {
	componentDidMount(){
		//const bId = this.props.match.params.id
	console.log("Mount: ", this.props.state.bountyList)
    	
	}

	render() {



		const bountyId = this.props.match.params.id
		const bounty = this.props.state.bountyList[bountyId]
		const bountyDetails = this.props.bountyList.map((deets) => {
			return (
						deets[1]
					)
		})
		console.log("Bounty ID: ", bountyId)
		console.log("Bounty: ", bounty)
		console.log("this.props.state.bountyList: ", this.props.state.bountyList[bountyId])
		//console.log("tzz ", this.state.bountyList[bountyId])
    	return (
      		<div>

      			<br /><br />

				(from bounty.js) bountyList[{bountyId}]:
				
				<Stringify value={bounty} />
				<br /><br />

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


// //class Bounty extends Component {
// const Bounty = (props) => {
// //	const submissionListItems = props.sList.map((sList) => {
// //		return <SubmissionListItem key={sList.bountyId} bItem={sList} />
// //	});
// 	// const bountyItem = props.bItem[1] => {
// 	// 	return <SubmissionListItem key={bItem.bountyId} bItem={sList} />
// 	// });
// 	//console.log("Props from new-bounty: ", this.props);
// 					// <SubmissionList bList={this.props.bountyList} />
// 	//render() {
// 		const id = props.match.params.id
// 		const bItem = props.bountyList
// 		const passedBountyList = []
// 		props.bountyList.map(bIem => passedBountyList.push(bItem))
// 		console.log("LOG PROPS: ", props.bountyList)
// 		return (
// 			<div>
// 				<br /><br />
// 					{id}
// 					{bItem}
// 					<Stringify value={props.match.params.id} />
// 					<Stringify value={props.bountyList} />
// 					<br /><br />
//                   	{(props && props.bountyList && props.bountyList.length > 0)} ? <h1>works</h1> : <span>None</span> 
// 					<Submit />
// 					<br />
// 					Submission List
// 			</div>
// 		);
// 	//}
// };

export default Bounty;