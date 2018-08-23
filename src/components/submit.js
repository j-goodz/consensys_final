import  React, { Component } from 'react';
//import { Link } from 'react-router-dom';


class Submit extends Component {
	handleSubmit(event) {
		event.preventDefault();

// call createSubmission
// update state or wait for event ?
	}
	render() {
		return (
			<div>
				<br /><br />
				<form onSubmit={this.handleSubmit}>
					<input 
						style={{height: '200px', width: '400px'}}
						type="textarea" 
						name="submission_text" 
						placeholder="Submission Text"
						value={this.props.state.submission_text} />

						<br /><br />					
					<input type="submit" value="Submit Solution"/>
				</form>
			</div>
		);
	}
};

//
export default Submit;