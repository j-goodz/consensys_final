import React from 'react';
import { Link } from 'react-router-dom';



const SubmissionListItem = ({bItem}) => {
	//const = bountyItem = props.list
	//console.log("bounty list item - bItem: ", bItem)
	const bountyTitle = bItem.title;
	return (
		<li className="list-group-item">
			<Link to="/">{bountyTitle}</Link>
		</li>
	);
};

export default SubmissionListItem;
