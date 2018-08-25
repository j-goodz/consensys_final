import React from 'react';
// import Stringify from "react-stringify";
import { Link } from "react-router-dom";

const BountyList = (props) => {
	//console.log(props)
	const bountyListItems = props.bountyList.map((bList) => {
		let index = (props.bountyList.findIndex(k => k === bList) + 1)
		return ( 	
					<li key={index}>
						({index})&nbsp;
						<Link to={`/bounty/${index}`} className="link" >
						{bList.title} 
					</Link>
					</li> 
				)
	});

	return (
		<div>
			<h1>Bounty Board:</h1>
			<ul>
				{bountyListItems}
			</ul>

		</div>
	);
};

export default BountyList;