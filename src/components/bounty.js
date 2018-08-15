import  React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Submit from '../components/submit';
import SubmissionList from '../components/submission-list';

class Bounty extends Component {
	render() {
		console.log("Props from new-bounty: ",this.props)
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