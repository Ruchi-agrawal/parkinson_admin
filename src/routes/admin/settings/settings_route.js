import React, { Component } from 'react';
import { Container, Row, Col, Button, FormGroup, Label, Input, FormText } from 'reactstrap';
import Calculations from './calculations';
import Terms from './terms';
import DataUsage from './data_usage';
import { Tabs, Tab } from 'react-bootstrap-tabs';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
const dashboard = [
    "dashboard",
];
const back = [
    'ti-control-backward',
];
const panel = [
    'ti-layout-grid2-alt',
];
const acceptable_user_roles = ["super_admin", "sip_admin"]
// SettingsElements
 class FormElements extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { userType } = this.props
        if (userType && !acceptable_user_roles.includes(userType)) {
            return (<Redirect to={'/system_admin/app/admin/developments'} />);
        }
        return (
            <Container>
                <Tabs >
                    <Tab label="Calculations">
                        <Calculations />
                    </Tab>
                    <Tab label="Terms">
                        <Terms />
                    </Tab>
                    <Tab label="Data usage">
                        <DataUsage />
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}

const mapStateToProps = ({ authUser }) => {
	const { token, userType } = authUser;
	return { token, userType };
};

export default connect(mapStateToProps)(FormElements);