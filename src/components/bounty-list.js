import React from 'react';
import BountyListItem from './bounty-list-item';

const BountyList = (props) => {
	const bountyListItems = props.bList.map((bList) => {
		return <BountyListItem key={bList.bountyId} bItem={bList} />
	});

	return (
		<ul className="list-group col-sm-4">
			{bountyListItems}
		</ul>
	);
};


export default BountyList;