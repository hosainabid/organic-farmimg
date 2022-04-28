import React from "react";
import { useHistory } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../../../hooks/useAuth";

export default function Sidebar() {
	const { user, userLogout } = useAuth();
	const history = useHistory();
	return (
		<div className="bg-light pb-3 h-100">
			<div className="container ">
				<nav className="navbar ps-3 pt-4 flex-column align-items-start navbar-light navbar-expand-lg bg-light">
					<div className="d-flex">
						<button
							className="navbar-toggler"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#sidebarMenu"
							aria-controls="sidebarMenu"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<span className="navbar-toggler-icon"></span>
						</button>
						<Link
							to="/myAccount"
							className="navbar-brand ms-3"
							href="#"
						>
							<div className="logo text-capitalize">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="18"
									height="18"
									fill="currentColor"
									className="bi bi-person-fill me-2"
									viewBox="0 0 16 16"
								>
									<path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
								</svg>
								{user.name}
							</div>
						</Link>
					</div>
					<div className="collapse navbar-collapse" id="sidebarMenu">
						<ul className="navbar-nav flex-column ms-auto mb-2 mb-lg-0 ps-3">
							{user.role === "admin" ? (
								<li className="nav-item my-2">
									<NavLink
										to="/myAccount/uploadSeed"
										className="nav-link"
										aria-current="page"
									>
										Upload Seed
									</NavLink>
								</li>
							) : (
								""
							)}
							{user.role === "admin" ? (
								<li className="nav-item my-2">
									<NavLink
										to="/myAccount/allUser"
										className="nav-link"
										aria-current="page"
									>
										All User
									</NavLink>
								</li>
							) : (
								""
							)}
							{user.role === "farmar" ? (
								<li className="nav-item my-2">
									<NavLink
										to="/myAccount/cropUpload"
										className="nav-link d-flex align-items-center"
										aria-current="page"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="18"
											height="18"
											fill="currentColor"
											className="bi bi-file-arrow-up-fill"
											viewBox="0 0 16 16"
										>
											<path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM7.5 6.707 6.354 7.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707z" />
										</svg>
										<span className="ms-2">
											Crop Upload
										</span>
									</NavLink>
								</li>
							) : (
								""
							)}
							{user.role === "farmar" ? (
								<li className="nav-item my-2">
									<NavLink
										to="/myAccount/upcomingProductUpload"
										className="nav-link  d-flex align-items-center"
										aria-current="page"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="18"
											height="18"
											fill="currentColor"
											className="bi bi-arrow-up-circle-fill"
											viewBox="0 0 16 16"
										>
											<path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z" />
										</svg>
										<span className="ms-2">
											Upcoming Product Upload
										</span>
									</NavLink>
								</li>
							) : (
								""
							)}
							<li className="nav-item my-2">
								<NavLink
									to="/myAccount/myCart"
									className="nav-link"
									aria-current="page"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="18"
										height="18"
										fill="currentColor"
										className="bi bi-cart-fill"
										viewBox="0 0 16 16"
									>
										<path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
									</svg>{" "}
									My Cart
								</NavLink>
							</li>
							{
								user.role !== "admin" && (
									<li className="nav-item my-2">
										<NavLink
											to="/myAccount/myOrders"
											className="nav-link"
											aria-current="page"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="18"
												height="18"
												fill="currentColor"
												className="bi bi-bag-fill"
												viewBox="0 0 16 16"
											>
												<path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z" />
											</svg>{" "}
											My Orders
										</NavLink>
									</li>
								)
							}
							{user.role === "admin" ? (
								<li className="nav-item my-2">
									<NavLink
										to="/myAccount/blogPost"
										className="nav-link  d-flex align-items-center"
										aria-current="page"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="18"
											height="18"
											fill="currentColor"
											className="bi bi-stickies-fill"
											viewBox="0 0 16 16"
										>
											<path d="M0 1.5V13a1 1 0 0 0 1 1V1.5a.5.5 0 0 1 .5-.5H14a1 1 0 0 0-1-1H1.5A1.5 1.5 0 0 0 0 1.5z" />
											<path d="M3.5 2A1.5 1.5 0 0 0 2 3.5v11A1.5 1.5 0 0 0 3.5 16h6.086a1.5 1.5 0 0 0 1.06-.44l4.915-4.914A1.5 1.5 0 0 0 16 9.586V3.5A1.5 1.5 0 0 0 14.5 2h-11zm6 8.5a1 1 0 0 1 1-1h4.396a.25.25 0 0 1 .177.427l-5.146 5.146a.25.25 0 0 1-.427-.177V10.5z" />
										</svg>
										<span className="ms-2">
											Post on Blog
										</span>
									</NavLink>

									<ul className="my-order submenu ps-2">
										<li className="nav-item my-2">
											<NavLink
												to="/myAccount/blogPost/previousBlogPosts"
												className="nav-link d-flex align-items-center"
												aria-current="page"
											>
												Previous Blog Posts
											</NavLink>
										</li>
									</ul>
								</li>
							) : (
								""
							)}
							<li className="nav-item my-2">
								<NavLink
									to="/myAccount/forumPost"
									className="nav-link  d-flex align-items-center"
									aria-current="page"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="18"
										height="18"
										fill="currentColor"
										className="bi bi-stickies-fill"
										viewBox="0 0 16 16"
									>
										<path d="M0 1.5V13a1 1 0 0 0 1 1V1.5a.5.5 0 0 1 .5-.5H14a1 1 0 0 0-1-1H1.5A1.5 1.5 0 0 0 0 1.5z" />
										<path d="M3.5 2A1.5 1.5 0 0 0 2 3.5v11A1.5 1.5 0 0 0 3.5 16h6.086a1.5 1.5 0 0 0 1.06-.44l4.915-4.914A1.5 1.5 0 0 0 16 9.586V3.5A1.5 1.5 0 0 0 14.5 2h-11zm6 8.5a1 1 0 0 1 1-1h4.396a.25.25 0 0 1 .177.427l-5.146 5.146a.25.25 0 0 1-.427-.177V10.5z" />
									</svg>
									<span className="ms-2">Post on Forum</span>
								</NavLink>

								<ul className="my-order submenu ps-2">
									<li className="nav-item my-2">
										<NavLink
											to="/myAccount/forumPost/previousForumPosts"
											className="nav-link d-flex align-items-center"
											aria-current="page"
										>
											Previous Forum Posts
										</NavLink>
									</li>
								</ul>
							</li>
							{
								user.role !== "user" && (
									<li className="nav-item my-2">
										<NavLink
											to="/myAccount/myBag"
											className="nav-link d-flex align-items-center"
											aria-current="page"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="18"
												height="18"
												fill="currentColor"
												className="bi bi-bag-fill"
												viewBox="0 0 16 16"
											>
												<path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z" />
											</svg>
											<span className="ms-2">User Orders</span>
										</NavLink>

										<ul className="my-order submenu ps-2">
											<li className="nav-item my-2">
												<NavLink
													to="/myAccount/myBag/pending"
													className="nav-link d-flex align-items-center"
													aria-current="page"
												>
													<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="bi bi-bag-fill" style={{maxWidth: '18px', maxHeight: '18px'}}>
														<path d="M208 320h384c8.8 0 16-7.2 16-16V48c0-8.8-7.2-16-16-16H448v128l-48-32-48 32V32H208c-8.8 0-16 7.2-16 16v256c0 8.8 7.2 16 16 16zm416 64H128V16c0-8.8-7.2-16-16-16H16C7.2 0 0 7.2 0 16v32c0 8.8 7.2 16 16 16h48v368c0 8.8 7.2 16 16 16h82.9c-1.8 5-2.9 10.4-2.9 16 0 26.5 21.5 48 48 48s48-21.5 48-48c0-5.6-1.2-11-2.9-16H451c-1.8 5-2.9 10.4-2.9 16 0 26.5 21.5 48 48 48s48-21.5 48-48c0-5.6-1.2-11-2.9-16H624c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16z"/>
													</svg>
													<span className="ms-2">Pending</span>
												</NavLink>
											</li>
											<li className="nav-item my-2">
												<NavLink
													to="/myAccount/myBag/shipped"
													className="nav-link d-flex align-items-center"
													aria-current="page"
												>
													<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="bi bi-bag-fill" style={{maxWidth: '18px', maxHeight: '18px'}}>
														<path d="M624 352h-16V243.9c0-12.7-5.1-24.9-14.1-33.9L494 110.1c-9-9-21.2-14.1-33.9-14.1H416V48c0-26.5-21.5-48-48-48H112C85.5 0 64 21.5 64 48v48H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h272c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H40c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h208c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h208c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H64v128c0 53 43 96 96 96s96-43 96-96h128c0 53 43 96 96 96s96-43 96-96h48c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zM160 464c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm320 0c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm80-208H416V144h44.1l99.9 99.9V256z"/>
													</svg>
													<span className="ms-2">Shipped</span>
												</NavLink>
											</li>
											<li className="nav-item my-2">
												<NavLink
													to="/myAccount/myBag/complete"
													className="nav-link d-flex align-items-center"
													aria-current="page"
												>
													<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="bi bi-bag-fill" style={{maxWidth: '18px', maxHeight: '18px'}}>
														<path d="M352 160v-32C352 57.42 294.579 0 224 0 153.42 0 96 57.42 96 128v32H0v272c0 44.183 35.817 80 80 80h288c44.183 0 80-35.817 80-80V160h-96zm-192-32c0-35.29 28.71-64 64-64s64 28.71 64 64v32H160v-32zm160 120c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zm-192 0c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24z"/>
													</svg>
													<span className="ms-2">Completed</span>
												</NavLink>
											</li>
											<li className="nav-item my-2">
												<NavLink
													to="/myAccount/myBag/cancelled"
													className="nav-link d-flex align-items-center"
													aria-current="page"
												>
													<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="bi bi-bag-fill" style={{maxWidth: '18px', maxHeight: '18px'}}>
														<path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zM124 296c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h264c6.6 0 12 5.4 12 12v56c0 6.6-5.4 12-12 12H124z"/>
													</svg>
													<span className="ms-2">Cancelled</span>
												</NavLink>
											</li>
											{
												user.role === 'admin' && (
													<li className="nav-item my-2">
														<NavLink
															to="/myAccount/myBag/commission"
															className="nav-link d-flex align-items-center"
															aria-current="page"
														>
															<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 288 512" className="bi bi-bag-fill" style={{maxWidth: '18px', maxHeight: '18px'}}>
															<path d="M209.2 233.4l-108-31.6C88.7 198.2 80 186.5 80 173.5c0-16.3 13.2-29.5 29.5-29.5h66.3c12.2 0 24.2 3.7 34.2 10.5 6.1 4.1 14.3 3.1 19.5-2l34.8-34c7.1-6.9 6.1-18.4-1.8-24.5C238 74.8 207.4 64.1 176 64V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48h-2.5C45.8 64-5.4 118.7.5 183.6c4.2 46.1 39.4 83.6 83.8 96.6l102.5 30c12.5 3.7 21.2 15.3 21.2 28.3 0 16.3-13.2 29.5-29.5 29.5h-66.3C100 368 88 364.3 78 357.5c-6.1-4.1-14.3-3.1-19.5 2l-34.8 34c-7.1 6.9-6.1 18.4 1.8 24.5 24.5 19.2 55.1 29.9 86.5 30v48c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-48.2c46.6-.9 90.3-28.6 105.7-72.7 21.5-61.6-14.6-124.8-72.5-141.7z"/>
															</svg>
															<span className="ms-2">Commission</span>
														</NavLink>
													</li>
												)
											}
										</ul>
									</li>
								)
							}

							<li className="nav-item my-2">
								<NavLink
									to="/login"
									className="nav-link d-flex align-items-center"
									aria-current="page"
									onClick={() => userLogout(history)}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="18"
										height="18"
										fill="currentColor"
										className="bi bi-box-arrow-right"
										viewBox="0 0 16 16"
									>
										<path
											fillRule="evenodd"
											d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
										/>
										<path
											fillRule="evenodd"
											d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
										/>
									</svg>
									<span className="ms-2">Log Out</span>
								</NavLink>
							</li>
						</ul>
					</div>
				</nav>
			</div>
		</div>
	);
}
