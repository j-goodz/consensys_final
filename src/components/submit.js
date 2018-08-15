import  React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Submit extends Component {
	render() {
		return (
			<div>
				<br /><br />
				<form>
					<input type="text" name="submit_solution" /><br /><br />					
					<button>Submit Solution</button>
				</form>
			</div>
		);
	}
};


export default Submit;