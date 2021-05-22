import React, { useEffect, useMemo, useState } from 'react';
import { Search } from '@material-ui/icons';
import Contact from './Contact/Contact';
import firebase from '../../../../services/firebase';
import algolia from '../../../../services/algolia';
import { useSelector } from 'react-redux';
import { debounce } from 'lodash';

export default function SideBarContact({ setOpenMainChat }) {
	const [contacts, setContacts] = useState([]);
	const [keyword, setKeyword] = useState('');
	const [results, setResults] = useState([]);
	const uid = useSelector((state) => state.user.info.uid);

	const debounceSearch = useMemo(
		() =>
			debounce((nextValue) => {
				if (!nextValue.length) {
					setResults([]);
					return;
				}
				firebase
					.firestore()
					.collection('users')
					.doc(uid)
					.get()
					.then((doc) => {
						const data = doc.data();
						const { friends } = data;
						algolia.search(nextValue).then(({ hits }) => {
							let contactsTemp = [];
							hits.forEach((hit) => {
								contactsTemp.push({
									photoURL: hit.photoURL,
									displayName: hit.displayName,
									uid: hit.uid,
									friend: friends.indexOf(hit.uid) === -1 ? false : true,
								});
							});
							setResults(contactsTemp);
						});
					});
			}, 1000),
		[uid]
	);

	const searchHandle = (event) => {
		setKeyword(event.target.value);
		debounceSearch(event.target.value);
	};

	//Lấy từ ds bạn bè
	useEffect(() => {
		const unsubcribe = firebase
			.firestore()
			.collection('users')
			.doc(uid)
			.onSnapshot((doc) => {
				const data = doc.data();
				if (data.friends.length) {
					firebase
						.firestore()
						.collection('users')
						.where('uid', 'in', data.friends)
						.get()
						.then((snapshot) => {
							let contactsTemp = [];
							snapshot.forEach((doc) => {
								const data = doc.data();
								contactsTemp.push({
									photoURL: data.photoURL,
									displayName: data.displayName,
									uid: data.uid,
									friend: true,
								});
							});
							setContacts(contactsTemp);
						});
				}
			});

		return () => {
			unsubcribe();
		};
	}, [uid]);

	return (
		<div className="Chat__sidebar contact">
			<h4 className="sidebar__header">Liên lạc</h4>
			<div className="input-group">
				<span className="input-group-text">
					<Search></Search>
				</span>
				<input
					className="form-control"
					type="text"
					name=""
					id=""
					placeholder="Tìm bạn bè"
					onChange={searchHandle}
					value={keyword}
				/>
			</div>
			<ol className="contacts">
				{keyword.length === 0
					? contacts.map((contact) => (
							<li onClick={() => setOpenMainChat(true)}>
								<Contact
									uid={contact.uid}
									avatar={contact.photoURL}
									name={contact.displayName}
									friend={contact.friend}
								/>
							</li>
					  ))
					: results.map((contact) => (
							<li>
								<Contact
									uid={contact.uid}
									avatar={contact.photoURL}
									name={contact.displayName}
									friend={contact.friend}
								/>
							</li>
					  ))}
			</ol>
		</div>
	);
}
