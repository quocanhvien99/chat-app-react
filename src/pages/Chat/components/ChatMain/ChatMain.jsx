import { Avatar } from '@material-ui/core';
import { Send, ChevronLeft } from '@material-ui/icons';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import firebase from '../../../../services/firebase';
import moment from 'moment';
import './style.scss';
import backgroundSVG from './image/undraw_Group_chat_re_frmo.svg';

export default function ChatMain({ openMainChat, setOpenMainChat }) {
	let { id } = useParams();
	const uid = useSelector((state) => state.user.info.uid);
	const [chatHeader, setChatHeader] = useState({});
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);
	const [firstLoading, setFirstLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);

	const ref = useRef(null);
	const lastDocRef = useRef();
	const observer = useRef();
	const lastMessageElement = useRef();
	useEffect(() => {
		if (lastMessageElement.current && hasMore) {
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting) {
					firebase
						.firestore()
						.collection('chats')
						.doc(id)
						.collection('messages')
						.orderBy('timestamp', 'desc')
						.limit(10)
						.startAfter(lastDocRef.current)
						.get()
						.then((snapshot) => {
							let promises = [];
							let messageList = [];
							let index = 0;
							snapshot.forEach((doc) => {
								if (snapshot.size === index + 1) {
									lastDocRef.current = doc;
								}
								const data = doc.data();
								messageList.push({ ...data, id: doc.id });
								promises.push(
									firebase.firestore().collection('users').doc(data.uid).get()
								);
								index++;
							});
							Promise.all(promises).then((docs) => {
								//Lấy thông tin của user gửi
								docs.map((doc, index) => {
									let data = doc.data();
									messageList[index].displayName = data.displayName;
									messageList[index].photoURL = data.photoURL;
									return 0;
								});
								setMessages([...messages, ...messageList]);
								if (snapshot.size < 10) setHasMore(false);
							});
						});
				}
			});
			observer.current.observe(lastMessageElement.current);
		}
		return () => {
			setHasMore(true);
		};
	}, [messages, hasMore, id]);

	const inputHandle = (event) => {
		setMessage(event.target.value);
	};
	const send = (event) => {
		event.preventDefault();
		const data = {
			content: message,
			uid: uid,
			timestamp: Date.now(),
		};
		firebase
			.firestore()
			.collection('chats')
			.doc(id)
			.collection('messages')
			.add(data);
		firebase
			.firestore()
			.collection('chats')
			.doc(id)
			.update({ recent: JSON.stringify(data), recentTimestamp: Date.now() });
		setMessage('');
	};
	const fomartTime = (time) => {
		if (time < moment().startOf('day').valueOf()) {
			return moment(time).fromNow();
		}
		return moment(time).format('hh:mm');
	};

	useEffect(() => {
		if (firstLoading === false && id) {
			ref.current.scrollTop = ref.current.scrollHeight;
		}
	}, [firstLoading, id]);

	useEffect(() => {
		if (id) {
			firebase
				.firestore()
				.collection('chats')
				.doc(id)
				.get()
				.then((doc) => {
					const data = doc.data();
					let receiverId = data.members.find((id) => id !== uid);
					firebase
						.firestore()
						.collection('users')
						.doc(receiverId)
						.get()
						.then((doc) => {
							const data = doc.data();
							setChatHeader({ avatar: data.photoURL, name: data.displayName });
						});
				});
		}
	}, [id, uid]);

	useEffect(() => {
		let firstSnapshot = true;
		let unsubcribe = firebase
			.firestore()
			.collection('chats')
			.doc(id)
			.collection('messages')
			.onSnapshot((snapshot) => {
				if (!firstSnapshot) {
					snapshot.docChanges().forEach((change) => {
						if (change.type === 'added') {
							let data = change.doc.data();
							data.id = change.doc.id;
							firebase
								.firestore()
								.collection('users')
								.doc(data.uid)
								.get()
								.then((doc) => {
									let userInfo = doc.data();
									setMessages((preState) => [
										{
											...data,
											displayName: userInfo.displayName,
											photoURL: userInfo.photoURL,
										},
										...preState,
									]);
								});
						}
					});
				}
				firstSnapshot = false;
			});
		return () => {
			unsubcribe();
		};
	}, [id]);

	useEffect(() => {
		setFirstLoading(true);
		firebase
			.firestore()
			.collection('chats')
			.doc(id)
			.collection('messages')
			.orderBy('timestamp', 'desc')
			.limit(10)
			.get()
			.then((snapshot) => {
				let promises = [];
				let messageList = [];
				let index = 0;

				snapshot.forEach((doc) => {
					if (snapshot.size === index + 1) {
						lastDocRef.current = doc;
					}
					const data = doc.data();
					messageList.push({ ...data, id: doc.id });
					promises.push(
						firebase.firestore().collection('users').doc(data.uid).get()
					);
					index++;
				});
				Promise.all(promises).then((docs) => {
					//Lấy thông tin của user gửi
					docs.map((doc, index) => {
						let data = doc.data();
						messageList[index].displayName = data.displayName;
						messageList[index].photoURL = data.photoURL;
						return 0;
					});
					setMessages(messageList);
					setFirstLoading(false);
				});
			});
	}, [id]);

	if (id)
		return (
			<div className={`Chat__main ${openMainChat ? 'active' : ''}`}>
				<div className="Chat__main__header">
					<div className="set-active" onClick={() => setOpenMainChat(false)}>
						<ChevronLeft></ChevronLeft>
					</div>
					<div className="avatar mr-3">
						<Avatar src={chatHeader.avatar}></Avatar>
					</div>
					<h5 className="displayName">{chatHeader.name}</h5>
				</div>
				<div className="Chat__main__conversation" ref={ref}>
					<ul>
						{messages.map((message, index) => {
							if (messages.length - 2 === index + 1) {
								return (
									<li ref={lastMessageElement}>
										<div
											className={`message ${
												message.uid === uid ? 'right' : ''
											}`}>
											<Avatar src={message.photoURL}></Avatar>
											<div className="message__content">
												<div className="content">
													{message.content}
													<div className="timestamp">
														{fomartTime(message.timestamp)}
													</div>
												</div>
												<div className="name">{message.displayName}</div>
											</div>
										</div>
									</li>
								);
							}
							return (
								<li>
									<div
										className={`message ${message.uid === uid ? 'right' : ''}`}>
										<Avatar src={message.photoURL}></Avatar>
										<div className="message__content">
											<div className="content">
												{message.content}
												<div className="timestamp">
													{fomartTime(message.timestamp)}
												</div>
											</div>
											<div className="name">{message.displayName}</div>
										</div>
									</div>
								</li>
							);
						})}
					</ul>
				</div>
				<div className="Chat__main__input">
					<form>
						<input
							type="text"
							id=""
							placeholder="Nhập vào tin nhắn..."
							onChange={inputHandle}
							value={message}
						/>
						<button onClick={send}>
							<Send></Send>
						</button>
					</form>
				</div>
			</div>
		);
	return (
		<div className="Chat__main">
			<img src={backgroundSVG} alt="background" id="backgroundSVG" />
		</div>
	);
}
