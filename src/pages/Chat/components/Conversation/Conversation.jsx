import { Avatar } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './style.scss';

export default function Conversation({
	id,
	img,
	name,
	lastMessage,
	timeStamp,
	setOpenMainChat,
}) {
	const fomartTime = (time) => {
		if (time < moment().startOf('day').valueOf()) {
			return moment(time).fromNow();
		}
		return moment(time).format('hh:mm');
	};

	return (
		<Link to={`/app/${id}`}>
			<div
				className="Conversation d-flex"
				onClick={() => setOpenMainChat(true)}>
				<div className="user-img mr-3">
					<Avatar src={img}></Avatar>
				</div>
				<div className="d-flex flex-column info">
					<h5 className="mb-1">{name}</h5>
					<div className="last-message overflow-hidden m-0">{lastMessage}</div>
				</div>
				<div className="font-size-11 time">{fomartTime(timeStamp)}</div>
			</div>
		</Link>
	);
}
