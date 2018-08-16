import React from 'react';
import SubmissionListItem from './submission-list-item';

const SubmissionList = (props) => {
	const submissionListItems = props.sList.map((sList) => {
		return <SubmissionListItem key={sList.bountyId} bItem={sList} />
	});

	return (
		<ul className="list-group col-sm-4">
			{submissionListItems}
		</ul>
	);
};


export default SubmissionList;