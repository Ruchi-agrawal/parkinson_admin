import React, { Component } from 'react';
import { Container, Row, Col, Button, FormGroup, Input } from 'reactstrap';

export default class FormElements extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentWillMount = () => {
        if (localStorage.getItem('access_token') && localStorage.getItem('access_token').length) {
            localStorage.removeItem('access_token')
            this.props.history.push("/app/admin/login");
            window.location.reload(false);
        }
    }
    render() {
        return (<Container></Container>);
    }
}
