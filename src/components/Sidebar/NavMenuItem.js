/**
 * Nav Menu Item
 */
import React, { Fragment, Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Collapse from '@material-ui/core/Collapse';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import Chip from '@material-ui/core/Chip';
// intl messages
import IntlMessages from 'Util/IntlMessages';

class NavMenuItem extends Component {

	state = {
		subMenuOpen: '',
		openDevelopment: false,
		openAgent: false,
		openSIPAdmin: false,
		openStaff: false,
		developments: [],
		openSIPProgress: false,
		openAnnouncment: false
	}

	/**
	* On Toggle Collapse Menu
	*/
	onToggleCollapseMenu(index) {
		if (this.state.subMenuOpen === '') {
			this.setState({
				subMenuOpen: index
			})
		}
		else if (this.state.subMenuOpen !== index) {
			this.setState({
				subMenuOpen: index
			})
		}
		else {
			this.setState({ subMenuOpen: '' });
		}
	}

	openModule = (clickOption) => {
		this.handleClickOpen('open' + clickOption);
	}

	handleClickOpen = (changeState) => {
		this.setState({ [changeState]: true });

	};

	handleClose = (changeState) => {
		this.setState({ [changeState]: false });
	};

	render() {
		const { menu, onToggleMenu, userType } = this.props;
		const { subMenuOpen, openDevelopment, openSIPAdmin, openAgent, openStaff, openSIPProgress, openAnnouncment } = this.state;
		if (menu.child_routes != null) {
			return (
				<Fragment>
					{/* <Announcment token={this.props.token} open={openAnnouncment} handleClose={this.handleClose} handleClickOpen={this.handleClickOpen} />
					<PopupNewDev token={this.props.token} open={openDevelopment} handleClose={this.handleClose} handleClickOpen={this.handleClickOpen} />
					<PopupNewSIPAgent token={this.props.token} open={openSIPAdmin} handleClose={this.handleClose} handleClickOpen={this.handleClickOpen} />
					<PopupNewAgent token={this.props.token} open={openAgent} handleClose={this.handleClose} handleClickOpen={this.handleClickOpen} />
					<PopupNewAgentStaff token={this.props.token} open={openStaff} handleClose={this.handleClose} handleClickOpen={this.handleClickOpen} />
					<PopupNewSIPProgressManagement token={this.props.token} open={openSIPProgress} handleClose={this.handleClose} handleClickOpen={this.handleClickOpen} /> */}
					
						<ListItem button component="li" onClick={onToggleMenu} className={`list-item ${classNames({ 'item-active': menu.open })}`}>
							<ListItemIcon className="menu-icon">
								<i className={menu.menu_icon}></i>
							</ListItemIcon>
							<span className="menu text-capitalize">
								<IntlMessages id={menu.menu_title} />
							</span>
							{menu.new_item && menu.new_item === true ?
								<Chip label="new" className="new-item" color="secondary" />
								:
								''
							}
						</ListItem>

					<Collapse in={menu.open} timeout="auto" className="sub-menu">
							<Fragment>
								{menu.type_multi == null ?
									<List className="list-unstyled py-0">
										{menu.child_routes.map((subMenu, index) => {
											return (
												<ListItem button component="li" key={index}>
													{subMenu.type && subMenu.type == 'popoup' ?
														(subMenu.menu_title == "New Development" && userType == "sip_progress_management") ?
															null
															:
															<a className="item-active" onClick={() => this.openModule(subMenu.click)}>
																<span className="menu" >
																	<IntlMessages id={subMenu.menu_title} />
																</span>
															</a>

														: <NavLink to={subMenu.path} activeClassName="item-active" >
															<span className="menu">
																<IntlMessages id={subMenu.menu_title} />
															</span>
															{subMenu.new_item && subMenu.new_item === true ?
																<Chip label="new" className="new-item" color="secondary" />
																:
																''
															}
														</NavLink>}
												</ListItem>
											)
										})}
									</List>
									:
									<List className="list-unstyled py-0">
										{menu.child_routes.map((subMenu, index) => {
											return (
												<Fragment key={index}>
													<ListItem button component="li"
														onClick={() => this.onToggleCollapseMenu(index)}
														className={`list-item ${classNames({ 'item-active': subMenuOpen === index })}`}
													>
														<span className="menu">
															<IntlMessages id={subMenu.menu_title} />
														</span>
													</ListItem>
													<Collapse in={subMenuOpen === index} timeout="auto">
														<List className="list-unstyled py-0">
															{subMenu.child_routes.map((nestedMenu, nestedKey) => (
																nestedMenu.type && nestedMenu.type == 'popoup' ?
																	<PopupNewDev />
																	: <ListItem button component="li" key={nestedKey}>
																		<NavLink activeClassName="item-active" to={nestedMenu.path}>
																			<span className="menu pl-10 d-inline-block">
																				<IntlMessages id={nestedMenu.menu_title} />
																			</span>
																		</NavLink>
																	</ListItem>
															))}
														</List>
													</Collapse>
												</Fragment>
											)
										})}
									</List>
								}
							</Fragment>
						</Collapse>
				</Fragment>
			)
		}
		return (
			<ListItem button component="li">
				<NavLink activeClassName="item-active" to={menu.menu_title !== 'sidebar.dashboard' ? menu.path : userType == 'agent_admin' ? menu.path2 : menu.path}>
					<ListItemIcon className="menu-icon">
						<i className={menu.menu_icon}></i>
					</ListItemIcon>
					<span className="menu">
						<IntlMessages id={menu.menu_title} />
					</span>
				</NavLink>
			</ListItem>
		);
	}
}

export default NavMenuItem;
