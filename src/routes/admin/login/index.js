import React, { Component } from 'react';
import { Container, Row, Col, Button, FormGroup, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import APIURL from './../../../../globalvariables';
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';
import ReactHtmlParser from 'react-html-parser';
import './../../../assets/scss/custom.css';
let varToken = 'YWRtaW5AZ21haWwuY29tOjk4ZmM1YjgzOTI1NmU0NTY='
export default class FormElements extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			error_flag: false,
			response_message: ""
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.forgetPassword = this.forgetPassword.bind(this);
	}

	componentWillMount = () => {
		if (localStorage.getItem('access_token') && localStorage.getItem('access_token').length) {
			this.props.history.push({ pathname: '/' });
		}
	}

	handleChange = (event) => {
		let self = this;
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		self.setState({ [name]: value, error_flag: false, response_message: "" });
	}

	handleSubmit = (event) => {
		let self = this;
		const errors = {};
		let dataset = {};

		if (!this.state.email || this.state.email == "") {
			errors.email = 'email is missing';
		} else {
			dataset.email = this.state.email
		}

		if (!this.state.password || this.state.password == "") {
			errors.password = 'password is missing';
		} else {
			dataset.password = this.state.password
		}

		if (Object.keys(errors).length) {
			let error_message = "";
			for (var key in errors) {
				error_message = error_message + errors[key] + ',<br>';
			}
			self.setState({
				loader: false,
				response_message: error_message,
				error_flag: true,
				validation_error: true
			})
		} else {
			self.setState({
				loader: true,
			});
			let add_login_uri = APIURL.urls.loginUser
			axios
				.request({
					url: add_login_uri,
					data: JSON.stringify(dataset),
					method: 'post',
					headers: {
						'Authorization': 'Basic ' + varToken,
						'Content-Type': 'application/json'
					}
				})
				.then(function (response) {
					if (response.data && response.data.statusCode && response.data.statusCode == 200) {
						self.setState(
							{
								loader: false,
								response_message: 'Login successfull',
								error_flag: false
							}
						)
						localStorage.setItem('access_token', response.data.data.token)
						window.location.reload(false);
					} else {
						self.setState(
							{
								loader: false,
								response_message: response.data.message,
								error_flag: true
							}
						)
					}
				});
		}
	}
	forgetPassword = () => {

	}

	render() {
		return (
			<Container>
				<Row>
					<Col xs="12" sm="12" md="12">
						<div className="cstmLoginIner">
							<Link to="/" className="">
								<img src={require('Assets/img/client-logo-3.png')} alt="site logo" />
							</Link>
						</div>
						<div className="cstmLogin">
							<label>Sign in to start your session</label>
							<FormGroup>
								<Input type="email" name="email" onChange={this.handleChange} placeholder="Email" />
							</FormGroup>
							<FormGroup>
								<Input type="password" name="password" onChange={this.handleChange} placeholder="Password" />
							</FormGroup>
							<Button color="primary" onClick={this.handleSubmit} >Sign in</Button>
							{/* <div className="frgtPass" onClick={this.forgetPassword()} ><a>Forget password?</a></div> */}
							{this.state.response_message && this.state.response_message != '' && this.state.error_flag &&
								<div className="response_message error">
									{ReactHtmlParser(this.state.response_message)}
								</div>
							}
							{this.state.response_message && this.state.response_message != '' && !this.state.error_flag &&
								<div className="response_message success">
									{ReactHtmlParser(this.state.response_message)}
								</div>
							}
							{this.state.loader === true &&
								<div className="page-loader d-flex justify-content-center mb-30">
									<CircularProgress />
								</div>
							}
						</div>
					</Col>
				</Row>
			</Container>
		);
	}
}
