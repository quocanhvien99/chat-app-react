import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import firebase from '../../services/firebase';

export default function ForgetPassword() {
	const history = useHistory();
	const [email, setEmail] = useState('');
	const isLogged = useSelector((state) => state.user.isLogged);

	const handleValue = (e) => {
		setEmail(e.target.value);
	};

	const submit = (e) => {
		e.preventDefault();
		firebase
			.auth()
			.sendPasswordResetEmail(email)
			.then(() => {
				window.alert(
					'Hướng dẫn thay đổi mật khẩu đã được gửi đến hòm thư của bạn.'
				);
				history.push('/login');
			})
			.catch((error) => window.alert(error));
	};

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
								<h4>Cấp Lại Mật Khẩu</h4>
								<div>Yêu cầu cấp lại mật khẩu.</div>
							</div>
							<div className="card">
								<div className="card-body p-4">
									<div className="p-3">
										<div
											className="alert alert-success mb-4 text-center"
											role="alert">
											Hệ thống sẽ gửi hướng dẫn lấy lại mật khẩu đến hòm thư của
											bạn trong vài phút!
										</div>
										<form>
											<div className="mb-4">
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
											<button
												className="btn btn-primary btn-block"
												onClick={submit}>
												Xác nhận
											</button>
										</form>
									</div>
								</div>
							</div>
							<div className="mt-5 text-center">
								<p>
									Quay trở lại? <Link to="/login">Đăng nhập</Link>
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
