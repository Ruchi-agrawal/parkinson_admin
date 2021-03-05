import React, { Component } from 'react';
import { Container, Row, Col, Button, FormGroup, Label, Input, FormText } from 'reactstrap';
import APIURL from './../../../../globalvariables';
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';
import ReactHtmlParser from 'react-html-parser';
import './../../../assets/scss/custom.css';

const dashboard = [
	"dashboard",
];
const back = [
	'ti-control-backward',
];
const panel = [
	'ti-layout-grid2-alt',
];

const type_options = [
	<option value="">None</option>,
	<option value="brochure">Brochure</option>,
	<option value="video">Video</option>,
	<option value="other">Others</option>
]
export default class FormElements extends Component {

	constructor(props) {
		super(props);
		this.state = {
			name: "",
			type: "",
			image: null,
			preview_url: null,
			validation_error: false,
			edit: false,
			response_message: "",
			error_flag: false,
			tool_id : ""

		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.gettoolDetail = this.gettoolDetail.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleBack = this.handleBack.bind(this);
		
	}

	componentWillMount = () => {
		// this.gettoolDetail(25);
	}

	gettoolDetail = (tool_id) => {
		let self = this;
		this.setState({ edit: true, tool_id: tool_id, loader: true })
		axios
			.request({
				url: APIURL.urls.apiurl + 'tool/getOneTool?id=' + tool_id,
				method: "get",
				headers: {
					'token': 'Bearer ' + localStorage.getItem('access_token'),
					'Content-Type': 'application/json'
				}
			})
			.then(res => {
				const tool_data = res.data;
				if (tool_data && tool_data.statusCode == 200 && typeof tool_data === 'object' && tool_data !== null) {
					const tool_details = tool_data.data
					if (tool_details && tool_details[0] && tool_details[0].image) {
						self.setState({ preview_url: APIURL.urls.fileuploaduri + "files/" + tool_details[0].image });
					}
					self.setState(tool_details[0]);
					self.setState({ loader: false });
				} else {
					alert(tool_data.message)
					self.setState({ loader: false });
				}
			})
	}

	handleChange = (event) => {
		let self = this;
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		self.setState({ [name]: value, error_flag: false, response_message: "" });
	}

	handleInputChange = (event) => {
		let self = this;
		this.setState({
			selectedFile: event.target.files[0],
		}, function () {
			self.setState({
				image_loader: true,
			});
			const data = new FormData()
			data.append('file', this.state.selectedFile)
			let url = APIURL.urls.apiurl + "file/fileUpload";
			axios.post(url, data, {
			})
				.then(res => {
					console.log('Upload response ', res);
					if (res && res.data && res.data.statusCode == 200) {
						self.setState({
							image_loader: false,
							image: res.data.data,
							image_load_error: null,
							preview_url: APIURL.urls.fileuploaduri + "files/" + res.data.data
						})
					} else {
						self.setState({
							image_loader: false,
							image: "",
							image_load_error: "Failed to upload file, Try again",
							preview_url: null
						})
					}
				})
		})
	}


	handleSubmit = (event) => {
		let self = this
		const errors = {};
		let dataset = {};

		if (!this.state.name) {
			errors.name = 'name is missing';
		} else {
			dataset.name = this.state.name
		}

		if (!this.state.type) {
			errors.type = 'type is missing';
		} else {
			dataset.type = this.state.type
		}

		if (!this.state.image || !this.state.image.length) {
			errors.image = 'image is missing';
		} else {
			dataset.image = this.state.image
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
			let tool_uri = APIURL.urls.apiurl + 'tool/addTool'
			if (this.state.edit) {
				tool_uri = APIURL.urls.apiurl + 'tool/updateTool?id=' + this.state.tool_id
			}
			axios
				.request({
					url: tool_uri,
					data: JSON.stringify(dataset),
					method: this.state.edit ? "put" : "post",
					headers: {
						'token': 'Bearer ' + localStorage.getItem('access_token'),
						'Content-Type': 'application/json'
					}
				})
				.then(function (response) {
					console.log(response);
					if (response.data && response.data.statusCode && response.data.statusCode == 200) {
						self.setState(
							{
								loader: false,
								response_message: self.state.edit ? 'Tool has been updated' : 'Tool has been added',
								error_flag: false
							}
						)
						// self.props.history.push({ pathname: '' });
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

	handleBack = () =>{
		this.props.history.goBack()
	}

	render() {
		return (
			<Container>

				{/* Common Breadcrumb */}
				<Row>
					<Col xs="12" sm="6" className="addAgent">
						<h1>{this.state.edit ? 'Edit Tool' : 'Add A Tool'}</h1>
						<div>
							<span className="material-icons icons-middle">{dashboard}</span>
							<a>Dashboard</a><a>Tools</a><a>{this.state.edit ? 'edit tool' : 'add tool'}</a>
						</div>
					</Col>
					<Col xs="12" sm="6">
						<div className="bkAgent">
							<Button color="primary" onClick={this.handleBack}><span className={back}></span>Back</Button>
						</div>
					</Col>
				</Row>
				{/* End of Common Breadcrumb */}

				<Row>
					<Col xs="12" sm="12" md="6">
						<div className="addtool">
							<h2 className="toolH2"><span aria-hidden="true" className={panel}></span>{this.state.edit ? 'Edit Panel' : 'Add Panel'}</h2>
							<div className="toolForm">
								<div>
									<FormGroup>
										<Label>name <span>*</span></Label>
										<Input type="text" className={!this.state.name.length ? '' : 'red-border'} name="name" value={this.state.name} onChange={this.handleChange} />
										{
											this.state.validation_error && !this.state.name.length &&
											<p className="field_required"> name is required </p>
										}
									</FormGroup>
								</div>
								<div>
									<FormGroup>
										<Label>type <span>*</span></Label>
										<Input type="select" className={!this.state.type.length ? '' : 'red-border'} name="type" id="type" value={this.state.type} onChange={this.handleChange} >
											{type_options}
										</Input>
										{
											this.state.validation_error && !this.state.type.length &&
											<p className="field_required"> type is required </p>
										}
									</FormGroup>
								</div>
								<div>
									<FormGroup>
										<Label>image <span>*</span></Label>
										{this.state.preview_url &&
											<div className="userImg"><img src={this.state.preview_url} className="" alt="" /></div>
										}
										<Input type="file" name="file" id="File" onChange={this.handleInputChange} />
										<FormText>Supported Format (.jpg .Png .jpeg .gif)</FormText>
										{
											this.state.validation_error && !this.state.image &&
											<p className="field_required"> image is required </p>
										}
									</FormGroup>
								</div>
								<div className="toolBtns">
									<Button color="primary" onClick={this.handleSubmit} >Submit</Button>
								</div>
							</div>
						</div>
					</Col>
				</Row>

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

			</Container>
		);
	}
}
