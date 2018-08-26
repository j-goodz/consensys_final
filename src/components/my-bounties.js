import React from 'react';
import Stringify from "react-stringify";
import { Link } from "react-router-dom";

const MyBounties = (props) => {
	//console.log(props)

	const bountyList = props.bountyList

	const filteredBountyList = bountyList.filter(function(bItem){
	  	return bItem.bountyPoster == props.account; 
	});

	// console.log("bountyList ", props.bountyList)
	// console.log("filteredBountyList ", filteredBountyList)

	const bountyListItems = filteredBountyList.map((bList) => {
		let index = (filteredBountyList.findIndex(k => k === bList) + 1)
					// { props.account == bList.poster ? 'YES!' : 'NO!'}
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
			<h1>My Bounties:</h1>
			<ul>
				{bountyListItems}
			</ul>

		</div>
	);
};

export default MyBounties;