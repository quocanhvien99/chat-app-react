import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import SideBarMessage from './components/SideBar/SideBarMessage';
import SideBarContact from './components/SideBar/SideBarContact';
import SideBarSetting from './components/SideBar/SideBarSetting';
import ChatMain from './components/ChatMain/ChatMain';
import Nav from './components/Nav/Nav';
import './style.scss';

export default function Chat() {
	const user = useSelector((state) => state.user);
	const [navSelected, setNavSelected] = useState('message');
	const [openMainChat, setOpenMainChat] = useState(false);

	const renderSideBar = () => {
		if (navSelected === 'message')
			return <SideBarMessage setOpenMainChat={setOpenMainChat} />;
		if (navSelected === 'contact')
			return <SideBarContact setOpenMainChat={setOpenMainChat} />;
		if (navSelected === 'setting') return <SideBarSetting />;
	};

	return user.isLogged ? (
		<div className="Chat">
			<Nav navSelected={navSelected} setNavSelected={setNavSelected} />
			{renderSideBar()}
			<ChatMain openMainChat={openMainChat} setOpenMainChat={setOpenMainChat} />
		</div>
	) : (
		<Redirect to="/login" />
	);
}
