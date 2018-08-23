import  React, { Component } from 'react';
//import { Link } from 'react-router-dom';


class Submit extends Component {
	constructor(props){
		super(props);

		this.state = {
			submission_text: ''
		}

		this.handleSubmit=this.handleSubmit.bind(this)
		this.updateField=this.updateField.bind(this)
	}

	updateField(event) {
		this.setState({ [ event.target.name ]: event.target.value })
		console.log(event.target.name)

	 }

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
						value={this.state.submission_text}
						onChange={this.updateField}  />

						<br /><br />					
					<input type="submit" value="Submit Solution"/>
				</form>
			</div>
		);
	}
};

//
export default Submit;