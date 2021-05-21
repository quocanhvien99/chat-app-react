import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import firebase from '../../services/firebase';
import './style.scss';

export default function Register() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [passwd, setPasswd] = useState('');
	const isLogged = useSelector((state) => state.user.isLogged);

	const handleValue = (e, type) => {
		switch (type) {
			case 'name':
				setName(e.target.value);
				break;
			case 'email':
				setEmail(e.target.value);
				break;
			case 'password':
				setPasswd(e.target.value);
				break;
			default:
				break;
		}
	};

	const submit = (e) => {
		e.preventDefault();
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, passwd)
			.then((userCredential) => {
				firebase
					.firestore()
					.collection('users')
					.doc(userCredential.user.uid)
					.set({
						uid: userCredential.user.uid,
						displayName: name,
						friends: ['7wwHdEhOVQeGM68c9Ee9vq1rVCB2'],
						photoURL:
							'https://i.pinimg.com/236x/e8/48/4d/e8484d6b06aa3f16206627c023a159fd.jpg',
						status: 'offline',
						timestamp: Date.now(),
					})
					.then(() => {
						window.alert('Tạo tài khoản thành công.');
					})
					.catch((error) => window.alert(error));
			})
			.catch((error) => window.alert(error));
	};

	return isLogged ? (
		<Redirect to="/app" />
	) : (
		<div className="Register">
			<Helmet>
				<title>Register | NipTuck Chatting</title>
			</Helmet>
			<div className="account-pages my-5 pt-sm-5">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-md-8 col-lg-6 col-xl-5 ">
							<div className="text-center mb-4">
								<h4>Đăng ký</h4>
								<div>Tạo tài khoản để sử dụng NipTuck.</div>
							</div>
							<div className="card">
								<div className="card-body p-4">
									<div className="p-3">
										<form>
											<div className="mb-3">
												<label>Họ tên</label>
												<div className="rounded-3 input-group">
													<span className="input-group-text">
														<i className="ri-user-2-line"></i>
													</span>
													<input
														type="text"
														className="form-control"
														placeholder="Nhập họ và tên"
														value={name}
														onChange={(e) => handleValue(e, 'name')}
													/>
												</div>
											</div>
											<div className="mb-3">
												<label>Email</label>
												<div className="rounded-3 input-group">
													<span className="input-group-text">
														<i className="ri-mail-line"></i>
													</span>
													<input
														type="email"
														className="form-control"
														placeholder="Nhập email"
														value={email}
														onChange={(e) => handleValue(e, 'email')}
													/>
												</div>
											</div>
											<div className="mb-4">
												<label>Mật khẩu</label>
												<div className="rounded-3 input-group">
													<span className="input-group-text">
														<i className="ri-lock-2-line"></i>
													</span>
													<input
														type="password"
														className="form-control"
														placeholder="Nhập mật khẩu"
														value={passwd}
														onChange={(e) => handleValue(e, 'password')}
													/>
												</div>
											</div>
											<button
												className="btn btn-primary btn-block"
												onClick={submit}>
												Đăng ký
											</button>
											<div className="mt-4 text-center">
												<p className="mb-0">
													Trước khi hoàn tất hãy đọc{' '}
													<Link to="#">Điều khoản sử dụng</Link>
												</p>
											</div>
										</form>
									</div>
								</div>
							</div>
							<div className="mt-5 text-center">
								<p>
									Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
								</p>
								<p>
									©2021 NipTuck. Developed by{' '}
									<span style={{ color: '#31D7A9' }}>Quocanhv99</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
