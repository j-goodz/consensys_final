import React from 'react';
import SubmissionListItem from './bounty-list-item';

const SubmissionList = (props) => {
	const submissionListItems = props.bList.map((bList) => {
		return <SubmissionListItem key={bList.bountyId} bItem={bList} />
	});

	return (
		<ul className="list-group col-sm-4">
			{submissionListItems}
		</ul>
	);
};


export default SubmissionList;