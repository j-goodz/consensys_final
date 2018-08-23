import React from 'react';
import BountyListItem from './bounty-list-item';
import Stringify from "react-stringify";

const BountyList = (props) => {

	const bountyListItems = props.bountyList.map((bList) => {
		return ( <BountyListItem bountyList={bList} /> )
	});

	return (
		<div>
			<h5>rendered list:</h5>
			<ul>
				{bountyListItems}
			</ul>
			<hr />
			Visual exammple of object<Stringify value={props.bountyList} />
		</div>
	);
};

export default BountyList;