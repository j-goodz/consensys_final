import  React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import Submit from '../components/submit';
//import SubmissionList from '../components/submission-list';
//import SubmissionListItem from '../components/submission-list-item';


class Bounty extends Component {
//const Bounty = (props) => {
//	const submissionListItems = props.sList.map((sList) => {
//		return <SubmissionListItem key={sList.bountyId} bItem={sList} />
//	});

	// const bountyItem = props.bItem[1] => {
	// 	return <SubmissionListItem key={bItem.bountyId} bItem={sList} />
	// });

	//console.log("Props from new-bounty: ", this.props);
					// <SubmissionList bList={this.props.bountyList} />
	render() {
		return (
			<div>
				<br /><br />
					Bounty Poster:<br /><br />
					Bounty Title:<br /><br />
					Bounty Description:<br /><br />
					Reward Amount:<br /><br />
					Bounty State:<br /><br />

					<Submit />
					<br /><br /><br />

					Submission List

			</div>
		);
	}
};

export default Bounty;