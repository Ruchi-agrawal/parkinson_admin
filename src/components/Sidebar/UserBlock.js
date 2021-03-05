/**
 * User Block Component
 */
import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Badge } from 'reactstrap';
import { NotificationManager } from 'react-notifications';

// components
import SupportPage from '../Support/Support';

// redux action
import {
	logoutUserFromFirebase
} from 'Actions';

// intl messages
import IntlMessages from 'Util/IntlMessages';

class UserBlock extends Component {

	state = {
		userDropdownMenu: false,
		isSupportModal: false,
		userData: null,
	}

	componentDidMount() {
		if (localStorage.getItem("userData")) {
			let userData = JSON.parse(localStorage.getItem("userData"))
			this.setState({ userData })
		}
	}

	/**
	 * Logout User
	 */
	logoutUser(e) {
		e.preventDefault();
		this.props.logoutUserFromFirebase();
	}

	/**
	 * Toggle User Dropdown Menu
	 */
	toggleUserDropdownMenu() {
		this.setState({ userDropdownMenu: !this.state.userDropdownMenu });
	}

	/**
	 * Open Support Modal
	 */
	openSupportModal() {
		this.setState({ isSupportModal: true });
	}

	/**
	 * On Close Support Page
	 */
	onCloseSupportPage() {
		this.setState({ isSupportModal: false });
	}

	/**
	 * On Submit Support Page
	 */
	onSubmitSupport() {
		this.setState({ isSupportModal: false });
		NotificationManager.success('Message has been sent successfully!');
	}

	render() {
		let { user } = this.props
		let userData  ={}
		if (user) {
			userData = user
		}
		return (
			<div className="top-sidebar">
				<div className="sidebar-user-block">
					<Dropdown
						isOpen={this.state.userDropdownMenu}
						toggle={() => this.toggleUserDropdownMenu()}
						className="rct-dropdown"
					>
						<DropdownToggle
							tag="div"
							className="d-flex align-items-center"
						>
							<div className="user-profile">
								<img
									src={require('Assets/img/profile.jpg')}
									alt="user profile"
									className="img-fluid rounded-circle"
									width="50"
									height="100"
								/>
							</div>
							<div className="user-info">
								<span className="user-name ml-4">{userData && userData.firstName && userData.firstName} {userData && userData.lastName && userData.lastName}</span>
								<i className="zmdi zmdi-chevron-down dropdown-icon mx-4"></i>
							</div>
						</DropdownToggle>
						<DropdownMenu>
							<ul className="list-unstyled mb-0">
								<li className="p-15 border-bottom user-profile-top bg-primary rounded-top">
									<p className="text-white mb-0 fs-14">{userData && userData.firstName && userData.firstName} {userData && userData.lastName && userData.lastName}</p>
									<span className="text-white fs-14">{userData && userData.email && userData.email}</span>
								</li>
								<li>
									<Link to={{
										pathname: '/system_admin/app/users/user-profile',
										state: { activeTab: 0 }
									}}>
										<i className="zmdi zmdi-account text-primary mr-3"></i>
										<span><IntlMessages id="widgets.profile" /></span>
									</Link>
								</li>
								{/* <li>
									<Link to={{
										pathname: '/system_admin/app/users/user-profile-1',
										state: { activeTab: 2 }
									}}>
										<i className="zmdi zmdi-comment-text-alt text-success mr-3"></i>
										<span><IntlMessages id="widgets.messages" /></span>
										<Badge color="danger" className="pull-right">3</Badge>
									</Link>
								</li>
								<li>
									<Link to="/app/pages/feedback">
										<i className="zmdi zmdi-edit text-warning mr-3"></i>
										<span><IntlMessages id="sidebar.feedback" /></span>
										<Badge color="info" className="pull-right">1</Badge>
									</Link>
								</li> */}

								<li className="border-top">
									<a href="#" onClick={(e) => this.logoutUser(e)}>
										<i className="zmdi zmdi-power text-danger mr-3"></i>
										<span><IntlMessages id="widgets.logOut" /></span>
									</a>
								</li>
							</ul>
						</DropdownMenu>
					</Dropdown>
				</div>
				{/*<SupportPage
					isOpen={this.state.isSupportModal}
					onCloseSupportPage={() => this.onCloseSupportPage()}
					onSubmit={() => this.onSubmitSupport()}
				/> */}
			</div>
		);
	}
}

// map state to props
const mapStateToProps = (state) => {
	const {user} = state.authUser
	return { settings:state.settings, user }
}

export default connect(mapStateToProps, {
	logoutUserFromFirebase
})(UserBlock);
