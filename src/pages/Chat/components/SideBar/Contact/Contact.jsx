import React, { useEffect, useRef, useState } from 'react';
import { Avatar } from '@material-ui/core';
import { MoreVert, Delete, PersonAdd } from '@material-ui/icons';
import firebase from '../../../../../services/firebase';
import firebase1 from 'firebase';
import './style.scss';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

export default function Contact({ name, avatar, uid, friend }) {
	const [active, setActive] = useState(false);
	const [friendState, setFriendState] = useState(friend);
	const selfId = useSelector((state) => state.user.info.uid);
	const refElement = useRef();
	const history = useHistory();

	useEffect(() => {
		const handleClick = (event) => {
			if (refElement.current && !refElement.current.contains(event.target)) {
				setActive(false);
			}
		};
		document.addEventListener('click', handleClick);

		return () => {
			document.removeEventListener('click', handleClick);
		};
	});

	const addFriend = () => {
		firebase
			.firestore()
			.collection('users')
			.doc(selfId)
			.update({ friends: firebase1.firestore.FieldValue.arrayUnion(uid) });
		firebase
			.firestore()
			.collection('users')
			.doc(uid)
			.update({ friends: firebase1.firestore.FieldValue.arrayUnion(selfId) });
		setFriendState(true);
	};
	const removeFriend = () => {
		firebase
			.firestore()
			.collection('users')
			.doc(selfId)
			.update({ friends: firebase1.firestore.FieldValue.arrayRemove(uid) });
		firebase
			.firestore()
			.collection('users')
			.doc(uid)
			.update({ friends: firebase1.firestore.FieldValue.arrayRemove(selfId) });
		setFriendState(false);
	};

	const openChat = () => {
		firebase
			.firestore()
			.collection('chats')
			.where('members', 'array-contains', selfId)
			.where('type', '==', 'private')
			.get()
			.then((snapshot) => {
				let chatId = null;
				snapshot.forEach((doc) => {
					const { members } = doc.data();
					if (members.indexOf(uid) !== -1) return (chatId = doc.id);
				});

				if (!chatId) {
					firebase
						.firestore()
						.collection('chats')
						.add({
							members: [selfId, uid],
							picture: '',
							recent: '',
							type: 'private',
						})
						.then((doc) => {
							console.log(doc.id);
							history.push(`/app/${doc.id}`);
						});
					return;
				}
				history.push(`/app/${chatId}`);
			});
	};

	return (
		<div className="Contact">
			<div className="info" onClick={openChat}>
				<Avatar src={avatar}></Avatar>
				<h5 className="displayName">{name}</h5>
			</div>
			{friendState ? (
				<div
					className="more"
					ref={refElement}
					onClick={() => setActive(!active)}>
					<MoreVert></MoreVert>
					<ol className={active && 'active'}>
						<li onClick={removeFriend}>
							<span>Remove</span>
							<Delete></Delete>
						</li>
					</ol>
				</div>
			) : (
				<div className="add" onClick={addFriend}>
					<PersonAdd></PersonAdd>
				</div>
			)}
		</div>
	);
}
