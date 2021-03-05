import React, { Component } from 'react';
import { Form, FormGroup, Input } from 'reactstrap';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import QueueAnim from 'rc-queue-anim';
import APIURL from './../../../../globalvariables';
import axios from "axios";
import { connect } from 'react-redux';
// app config
import AppConfig from 'Constants/AppConfig';
import { Redirect } from 'react-router-dom';

class Changepwd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: '',
            confirmPassword: '',
            submitForm: false,
            errorMsg: null,
            uid: null,
            validation_error: false,
            verifyToken: true,
            loading: false
        }
    }

    componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let id = this.props.location.search.split('=')[1]
            this.setState({ uid: id })
            this.verifyId(id)
        }
        else {
            this.setState({ verifyToken: false })
            setTimeout(() => {
                this.props.history.push('/system_admin/signin');
            }, 2000);
        }
    }

    verifyId = (id) => {
        let url = APIURL.urls.verifypwd + "?pwd_token=" + id
        axios.get(url, {
            headers: {
                'token': 'Bearer ' + this.props.token,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                let res = response.data;
                console.log("res", !res.success)
                if (!res.success) {
                    console.log("success")
                    this.setState({ verifyToken: false })
                    setTimeout(() => {
                        this.props.history.push('/system_admin/signin');
                    }, 2000);
                }
            })
    }

    changeEvent = (event) => {
        let { password, confirmPassword, submitForm, errorMsg } = this.state;
        let { target } = event
        let eventChange = this.state[target.name]
        eventChange = target.value;
        this.setState({ [target.name]: eventChange })
        if (submitForm) {
            if (password == '')
                errorMsg = "Please enter Password";

            // If confirm password not entered 
            else if (confirmPassword == '')
                errorMsg = "Please enter confirm password";

            // If Not same return False.     
            else if (password != confirmPassword) {
                errorMsg = "\nPassword did not match: Please try again..."
                return false;
            }
        }
    }

    onSubmit = () => {
        let self = this
        let { password, confirmPassword, submitForm, errorMsg, uid } = this.state;
        this.setState({ submitForm: true, loading: true });
        let errors = {}
        if (password == '') {
            errors.errorMsg = "\nPlease enter password";
        }

        // If confirm password not entered 
        else if (confirmPassword == '')
            errors.errorMsg = "\nPlease enter confirm password";

        // If Not same return False.     
        else if (password != confirmPassword) {
            errors.errorMsg = "\nPassword did not match"
            // return false;
        }

        if (Object.keys(errors).length) {
            let error_message = "";
            for (var key in errors) {
                error_message = error_message + errors[key];
            }
            self.setState({
                loading: false,
                response_message: error_message,
                error_flag: true,
                validation_error: true
            })
        } else {

            let body = {
                password: password,
                pwd_token: uid
            }
            let url = APIURL.urls.setpassword
            axios.put(url, body, {
                headers: {
                    'token': 'Bearer ' + this.props.token,
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    self.setState({
                        loading: false})
                    if (res.data.success) {
                        self.setState({ response_message: 'Succefully set the password' })
                        setTimeout(() => {
                            this.props.history.push('/system_admin/signin');
                        }, 2000);
                    }
                    else {

                    }
                })
        }
    }

    render() {
        return (
            <QueueAnim type="bottom" duration={2000}>
                <div className="rct-session-wrapper" key="1">
                    <AppBar position="static" className="session-header">
                        <Toolbar>
                            <div className="container">
                                <div className="d-flex justify-content-between">
                                    <div className="session-logo">
                                        <Link to="/">
                                        <img src={AppConfig.appLogo} alt="session-logo" className="img-fluid" width="110" height="35" />
                                        </Link>
                                    </div>
                                   
                                </div>
                            </div>
                        </Toolbar>
                    </AppBar>
                    <div className="session-inner-wrapper p-4 h-100 p-md-0">
                        <div className="row">
                            <div className="col-sm-8 col-lg-5 mx-auto">
                                <div className="session-body text-center">
                                    <div className="session-head mb-30">
                                        <h2>Get started with {AppConfig.brandName}</h2>
                                    </div>
                                    <Form>
                                        {
                                            !this.state.verifyToken &&
                                            <p className="field_required" >Verification code expired</p>
                                        }
                                        <FormGroup className="has-wrapper">
                                            <Input type="password" name="password" id="user-mail" className="has-input input-lg" placeholder="Enter password" onChange={(event) => this.changeEvent(event)} />
                                            <span className="has-icon"><i className="ti-lock"></i></span>

                                        </FormGroup>
                                        <FormGroup className="has-wrapper">
                                            <Input type="password" name="confirmPassword" id="user-mail" className="has-input input-lg" placeholder="Enter confirm password" onChange={(event) => this.changeEvent(event)} />
                                            <span className="has-icon"><i className="ti-lock"></i></span>
                                        </FormGroup>
                                        {
                                            this.state.validation_error && this.state.response_message &&
                                            <p className="field_required" value={this.state.response_message}>{this.state.response_message} </p>
                                        }
                                        <FormGroup>
                                            <Button variant="contained" onClick={e => this.onSubmit()} className="btn-info text-white btn-block btn-large w-100" disabled={this.state.loading}>Set Password</Button>
                                        </FormGroup>
                                        <Button component={Link} to="/system_admin/signin" className="btn-dark btn-block btn-large text-white w-100">Already have an account?  Login</Button>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </QueueAnim>
        );
    }
}

const mapStateToProps = ({ authUser }) => {
    const { user, token, userType, loading } = authUser;
    return { token, userType, loading };
};
export default connect(mapStateToProps)(Changepwd);