import React from 'react';
import firebase from '../../../../services/firebase';
import Textsms from '@material-ui/icons/TextsmsOutlined';
import Group from '@material-ui/icons/GroupOutlined';
import Settings from '@material-ui/icons/SettingsOutlined';
import Logout from '@material-ui/icons/ExitToAppOutlined';
import './style.scss';

export default function Nav({ navSelected, setNavSelected }) {
	const handleLogout = (e) => {
		e.preventDefault();
		firebase.auth().signOut();
	};

	return (
		<div className="Chat__nav">
			<div className="header"></div>
			<div className="middle">
				<ul>
					<li
						className={`nav__item ${navSelected === 'message' ? 'active' : ''}`}
						onClick={() => setNavSelected('message')}>
						<Textsms></Textsms>
					</li>
					<li
						className={`nav__item ${navSelected === 'contact' ? 'active' : ''}`}
						onClick={() => setNavSelected('contact')}>
						<Group></Group>
					</li>
					<li
						className={`nav__item ${navSelected === 'setting' ? 'active' : ''}`}
						onClick={() => setNavSelected('setting')}>
						<Settings></Settings>
					</li>
				</ul>
			</div>
			<div className="footer">
				<div className="logout nav__item" onClick={handleLogout}>
					<Logout></Logout>
				</div>
			</div>
		</div>
	);
}
