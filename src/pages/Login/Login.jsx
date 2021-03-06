import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import firebase from '../../services/firebase';
import './style.scss';

export default function Login() {
	const [email, setEmail] = useState('');
	const [passwd, setPasswd] = useState('');
	const [remember, setRemember] = useState(true);
	const isLogged = useSelector((state) => state.user.isLogged);

	const handleValue = (e, type) => {
		switch (type) {
			case 'email':
				setEmail(e.target.value);
				break;
			case 'password':
				setPasswd(e.target.value);
				break;
			case 'remember':
				setRemember(!remember);
				break;
			default:
				break;
		}
	};
	const submit = (e) => {
		e.preventDefault();
		if (remember) {
			localStorage.setItem('auto_fill', JSON.stringify({ email, passwd }));
		} else {
			localStorage.removeItem('auto_fill');
		}
		firebase
			.auth()
			.signInWithEmailAndPassword(email, passwd)
			.then((userCredential) => {
				window.alert('Đăng nhập thành công.');
			})
			.catch((error) => window.alert(error));
	};

	//Xử lý tự động điền thông tin
	useEffect(() => {
		const data = JSON.parse(localStorage.getItem('auto_fill'));
		if (data) {
			setEmail(data.email);
			setPasswd(data.passwd);
		}
	}, []);

	return isLogged ? (
		<Redirect to="/app" />
	) : (
		<div className="Login">
			<Helmet>
				<title>Login | NipTuck Chatting</title>
			</Helmet>
			<div className="account-pages my-5 pt-sm-5">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-md-8 col-lg-6 col-xl-5 ">
							<div className="text-center mb-4">
								<h4>Đăng nhập</h4>
								<div>Đăng nhập để sử dụng NipTuck.</div>
							</div>
							<div className="card">
								<div className="card-body p-4">
									<div className="p-3">
										<form>
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
												<div className="d-inline float-right forget">
													<Link to="/forget-password">Quên mật khẩu?</Link>
												</div>
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
											<div className="form-check mb-4">
												<input
													type="checkbox"
													id="remember-check"
													className="form-check-input"
													checked={remember}
													onChange={(e) => handleValue(e, 'remember')}
												/>
												<label
													htmlFor="remember-check"
													className="form-check-label">
													Ghi nhớ tài khoản
												</label>
											</div>
											<button
												className="btn btn-primary btn-block"
												onClick={submit}>
												Đăng nhập
											</button>
										</form>
									</div>
								</div>
							</div>
							<div className="mt-5 text-center">
								<p>
									Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
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
