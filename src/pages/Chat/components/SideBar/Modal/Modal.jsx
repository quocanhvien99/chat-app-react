import { Avatar } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import firebase from '../../../../../services/firebase';
import './style.scss';

export default function Modal({ activeModal, setActiveModal }) {
	const [selectedFile, setSelectedFile] = useState();
	const [preview, setPreview] = useState();
	const uid = useSelector((state) => state.user.info.uid);

	useEffect(() => {
		if (!selectedFile) return;
		const reader = new FileReader();
		reader.onload = (e) => {
			setPreview(e.target.result);
		};
		reader.readAsDataURL(selectedFile);
	}, [selectedFile]);

	const onSelectFile = (event) => {
		setSelectedFile(event.target.files[0]);
	};

	const upload = (event) => {
		event.preventDefault();
		const formdata = new FormData();
		formdata.append('image', selectedFile);

		axios({
			url: 'https://api.imgbb.com/1/upload',
			method: 'post',
			headers: {
				'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
			},
			params: {
				key: 'bbcf3b3f673b567954c24de03d4013c3',
			},
			data: formdata,
		}).then((res) => {
			firebase
				.firestore()
				.collection('users')
				.doc(uid)
				.update({ photoURL: res.data.data.url });
			setActiveModal(false);
		});
	};

	return (
		<div className="Modal">
			<form>
				<input type="file" onChange={onSelectFile} />
				<Avatar src={preview}></Avatar>
				<button type="submit" onClick={upload}>
					Xác nhận
				</button>
				<button type="reset" onClick={() => setActiveModal(false)}>
					Huỷ bỏ
				</button>
			</form>
		</div>
	);
}
