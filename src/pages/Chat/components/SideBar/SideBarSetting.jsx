import { Avatar } from '@material-ui/core';
import React from 'react';
import { Edit, EditOutlined } from '@material-ui/icons';
import { useSelector } from 'react-redux';

export default function SideBarSetting() {
	const userInfo = useSelector((state) => state.user.info);

	return (
		<div className="Chat__sidebar setting">
			<div className="Chat__sidebar__header">
				<h4 className="sidebar__header">Cài đặt</h4>
			</div>
			<div className="avatar">
				<Avatar src={userInfo.photoURL}></Avatar>
				<button className="edit">
					<Edit></Edit>
				</button>
			</div>
			<h5 className="name">
				<div>
					{userInfo.name}
					<div className="edit">
						<EditOutlined></EditOutlined>
					</div>
				</div>
			</h5>
		</div>
	);
}
