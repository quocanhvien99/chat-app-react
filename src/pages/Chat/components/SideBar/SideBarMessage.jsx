import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import firebase from '../../../../services/firebase';
import Conversation from '../Conversation/Conversation';
import './style.scss';

export default function SideBarMessage({ setOpenMainChat }) {
	const user = useSelector((state) => state.user);
	const uid = useSelector((state) => state.user.info.uid);
	const [conversations, setConversations] = useState([]);

	useEffect(() => {
		if (user.isLogged) {
			const firestoreDB = firebase
				.firestore()
				.collection('chats')
				.where('type', '==', 'private')
				.where('members', 'array-contains', uid)
				.orderBy('recentTimestamp', 'desc')
				.onSnapshot((snapshot) => {
					let docs = [];
					let promises = [];
					snapshot.forEach((doc) => {
						let data = doc.data();
						if (data.recent.length !== 0) {
							docs.push({ ...data, id: doc.id });
							const otherId = data.members.find((id) => id !== uid);
							promises.push(
								firebase.firestore().collection('users').doc(otherId).get()
							);
						}
					});
					Promise.all(promises).then((docsInfo) => {
						docsInfo.map((info, index) => {
							info = info.data();
							const recent = JSON.parse(docs[index].recent);
							docs[index] = {
								id: docs[index].id,
								lastMessage: recent.content,
								name: info.displayName,
								img: info.photoURL,
								timeStamp: recent.timestamp,
							};
							return 0;
						});
						setConversations(docs);
					});
				});
			return () => {
				firestoreDB();
			};
		}
	}, [uid]);

	return (
		<div className="Chat__sidebar message">
			<div className="Chat__sidebar__header">
				<h4 className="sidebar__header">Tin nhắn</h4>
			</div>
			<div className="Chat__sidebar__conversation">
				{conversations.map((converation) => (
					<Conversation {...converation} setOpenMainChat={setOpenMainChat} />
				))}
			</div>
		</div>
	);
}
