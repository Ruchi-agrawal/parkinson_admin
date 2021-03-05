import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import Switch from '@material-ui/core/Switch';
import { withStyles } from "@material-ui/core/styles";

const dashboard = [
	"dashboard",
];
const back = [
	'ti-control-backward',
];
const panel = [
	'ti-layout-grid2-alt',
];
const location = [
	'ti-location-pin',
];
const user = [
	'ti-user',
];
const layoutmedia = [
	'ti-layout-media-center-alt',
];
const settings = [
	'ti-settings',
];


const AntSwitch = withStyles(theme => ({
	root: {
		width: 28,
		height: 16,
		padding: 0,
		marginRight: 8
		//display: "flex"
	},
	switchBase: {
		padding: 2,
		color: theme.palette.grey[500],
		"&$checked": {
			transform: "translateX(12px)",
			color: theme.palette.common.white,
			"& + $track": {
				opacity: 1,
				backgroundColor: theme.palette.primary.main,
				borderColor: theme.palette.primary.main
			}
		}
	},
	thumb: {
		width: 12,
		height: 12,
		boxShadow: "none"
	},
	track: {
		border: `1px solid ${theme.palette.grey[500]}`,
		borderRadius: 16 / 2,
		opacity: 1,
		backgroundColor: theme.palette.common.white
	},
	checked: {}
}))(Switch);


const Index = (props) => {
	const [activeTab, setActiveTab] = useState('1');
	const toggle = tab => {
		if (activeTab !== tab) setActiveTab(tab);
	}

	return (
		<Container>
			<Row>
				<Col xs="12" sm="6" className="addAgent">
					<h1>Profile Panel</h1>
					<div>
						<span className="material-icons icons-middle">{dashboard}</span>
						<a>Dashboard</a><a>Agents</a><a>view agent</a>
					</div>
				</Col>
				<Col xs="12" sm="6">
					<div className="bkAgent">
						<Button color="primary"><span className={back}></span>Back</Button>
					</div>
				</Col>
			</Row>

			<Row className="accountProfile">
				<Col xs="12" sm="4">
					<div className="acountImgUpr">

						<div className="acountImg">
							<div><img src={require('Assets/img/user.svg')} alt="" /></div>
							<div><label>Laslie Beaumont</label></div>
							<div><span>[Bee2 Ltd]</span></div>
						</div>

						<div className="acInfoUpr">
							<div className="acInfo">
								<div className="acInfoLeft">Email:</div>
								<div className="acInfoRght">laselie@gmail.com</div>
							</div>
							<div className="acInfo">
								<div className="acInfoLeft">Address:</div>
								<div className="acInfoRght">-</div>
							</div>
							<div className="acInfo">
								<div className="acInfoLeft">Phone:</div>
								<div className="acInfoRght">09999999999</div>
							</div>
						</div>

						<div className="chngPass">
							<a>Change Password</a>
						</div>

						<div className="bioInfo">
							<label><span className={user}></span>Biography</label>
							<label><span className={location}></span>Location</label>
						</div>

					</div>
				</Col>
				<Col xs="12" sm="8">
					<div className="cntrlTool">
						<Nav tabs>
							<NavItem>
								<NavLink
									className={classnames({ active: activeTab === '1' })}
									onClick={() => { toggle('1'); }}
								>
									<span className={layoutmedia}></span>
									Authorisation
									</NavLink>
							</NavItem>
							<NavItem>
								<NavLink
									className={classnames({ active: activeTab === '2' })}
									onClick={() => { toggle('2'); }}
								>
									<span className={settings}></span>
									Settings
									 </NavLink>
							</NavItem>
						</Nav>
						<TabContent activeTab={activeTab}>
							<TabPane tabId="1">
								<Row>
									<Col xs="12" sm="6">
										<div className="devToolsUpr">
											<h3>Development Control</h3>
											<div className="devTools">
												<div><AntSwitch /><label>st.peter's</label></div>
												<div><AntSwitch /><label>consort house</label></div>
												<div><AntSwitch /><label>tivoli house</label></div>
												<div><AntSwitch /><label>st.stephen's</label></div>
												<div><AntSwitch /><label>old market building</label></div>
												<div><AntSwitch /><label>keppel wharf</label></div>
												<div><AntSwitch /><label>imperial building</label></div>
												<div><AntSwitch /><label>rawdon house</label></div>
												<div><AntSwitch /><label>churchside</label></div>
												<div><AntSwitch /><label>globe works</label></div>
												<div><AntSwitch /><label>eclipse</label></div>
												<div><AntSwitch /><label>danum house</label></div>
												<div><AntSwitch /><label>charles house</label></div>
											</div>
										</div>
									</Col>
									<Col xs="12" sm="6">
										<div className="devToolsUpr">
											<h3>Tool Control</h3>
											<div className="devTools">
												<div><AntSwitch /><label>marketing</label></div>
												<div><AntSwitch /><label>floor plans</label></div>
												<div><AntSwitch /><label>prand press</label></div>
												<div><AntSwitch /><label>rental support</label></div>
												<div><AntSwitch /><label>due diligence</label></div>
												<div><AntSwitch /><label>build progress & updates</label></div>
												<div><AntSwitch /><label>legal documents</label></div>
												<div><AntSwitch /><label>reservation form</label></div>
											</div>
										</div>
									</Col>
								</Row>
								<Row className="updtAuth">
									<Col xs="12" sm="12" md={4}>
										<Button color="primary">Update Authorisation</Button>
									</Col>
								</Row>
							</TabPane>
							<TabPane tabId="2">
								<Row>
								<Col xs="12" sm="6">
										<div className="devToolsUpr">
											<h3>Development Control</h3>
											<div className="devTools">
												<div><AntSwitch /><label>st.peter's</label></div>
												<div><AntSwitch /><label>consort house</label></div>
												<div><AntSwitch /><label>tivoli house</label></div>
												<div><AntSwitch /><label>st.stephen's</label></div>
												<div><AntSwitch /><label>old market building</label></div>
												<div><AntSwitch /><label>keppel wharf</label></div>
												<div><AntSwitch /><label>imperial building</label></div>
												<div><AntSwitch /><label>rawdon house</label></div>
												<div><AntSwitch /><label>churchside</label></div>
												<div><AntSwitch /><label>globe works</label></div>
												<div><AntSwitch /><label>eclipse</label></div>
												<div><AntSwitch /><label>danum house</label></div>
												<div><AntSwitch /><label>charles house</label></div>
											</div>
										</div>
									</Col>
									<Col xs="12" sm="6">
										<div className="devToolsUpr">
											<h3>Tool Control</h3>
											<div className="devTools">
												<div><AntSwitch /><label>marketing</label></div>
												<div><AntSwitch /><label>floor plans</label></div>
												<div><AntSwitch /><label>prand press</label></div>
												<div><AntSwitch /><label>rental support</label></div>
												<div><AntSwitch /><label>due diligence</label></div>
												<div><AntSwitch /><label>build progress & updates</label></div>
												<div><AntSwitch /><label>legal documents</label></div>
												<div><AntSwitch /><label>reservation form</label></div>
											</div>
										</div>
									</Col>
								</Row>
							</TabPane>
						</TabContent>
					</div>
				</Col>
			</Row>

		</Container>
	);
}

export default Index;
