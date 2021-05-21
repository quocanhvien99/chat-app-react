import { Avatar } from '@material-ui/core';
import React, { useState } from 'react';
import { Edit, EditOutlined } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import Modal from './Modal/Modal';
import firebase from '../../../../services/firebase';

export default function SideBarSetting() {
	const [activeModal, setActiveModal] = useState(false);
	const [activeEdit, setActiveEdit] = useState(false);
	const [newName, setNewName] = useState('');
	const userInfo = useSelector((state) => state.user.info);

	const updateName = (e) => {
		e.preventDefault();
		firebase
			.firestore()
			.collection('users')
			.doc(userInfo.uid)
			.update({ displayName: newName })
			.then(() => {
				setActiveEdit(false);
				setNewName('');
			});
	};
	const cancelEdit = (e) => {
		if (e.keyCode === 27) {
			setActiveEdit(false);
			setNewName('');
		}
	};

	return (
		<div className="Chat__sidebar setting">
			<div className="Chat__sidebar__header">
				<h4 className="sidebar__header">Cài đặt</h4>
			</div>
			<div className="avatar">
				<Avatar src={userInfo.photoURL}></Avatar>
				<button className="edit" onClick={() => setActiveModal(true)}>
					<Edit></Edit>
				</button>
			</div>
			<h5 className="name">
				{!activeEdit && (
					<div>
						{userInfo.name}
						<div className="edit" onClick={() => setActiveEdit(true)}>
							<EditOutlined></EditOutlined>
						</div>
					</div>
				)}
				{activeEdit && (
					<div>
						<form>
							<input
								type="text"
								value={newName}
								placeholder="Esc để huỷ bỏ"
								onChange={(e) => {
									setNewName(e.target.value);
								}}
								onKeyDown={cancelEdit}
							/>
							<button onClick={updateName}></button>
						</form>
					</div>
				)}
			</h5>
			{activeModal && (
				<Modal activeModal={activeModal} setActiveModal={setActiveModal} />
			)}
		</div>
	);
}
