import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export default function Login() {
	return (
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
								<div className="text-muted">Đăng nhập để sử dụng NipTuck.</div>
							</div>
							<div className="card">
								<div className="card-body p-4">
									<div className="p-3">
										<form>
											<div className="mb-3">
												<label>Email</label>
												<div className="rounded-3 input-group">
													<span className="input-group-text text-muted">
														<i class="ri-user-2-line"></i>
													</span>
													<input
														type="text"
														className="form-control"
														placeholder="Nhập email"
													/>
												</div>
											</div>
											<div className="mb-4">
												<label>Mật khẩu</label>
												<div className="rounded-3 input-group">
													<span className="input-group-text text-muted">
														<i class="ri-lock-2-line"></i>
													</span>
													<input
														type="password"
														className="form-control"
														placeholder="Nhập mật khẩu"
													/>
												</div>
											</div>
											<div className="form-check mb-4">
												<input
													type="checkbox"
													id="remember-check"
													className="form-check-input"
												/>
												<label
													htmlFor="remember-check"
													className="form-check-label">
													Ghi nhớ tài khoản
												</label>
											</div>
											<button className="btn btn-primary btn-block">
												đăng nhập
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
