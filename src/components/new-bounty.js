import  React, { Component } from 'react';
//import { Link } from 'react-router-dom';


class NewBounty extends Component {
	render() {
		
		return (
			<div>
				<br /><br />
				<form>
					Bounty Title<br />
					<input type="text" name="bounty_title" /><br /><br />
					Bounty Description<br />
					<input type="text" name="bounty_description" /><br /><br />
					Reward Amount<br />
					<input type="text" name="bounty_amount" /><br /><br />

					<button>Post Bounty</button>
				</form>
			</div>
		);
	}
};


export default NewBounty;