/**
 * Form Elemets
 */
import React, { Component } from 'react';
import {
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	FormText,
	Col,
	FormFeedback
} from 'reactstrap';

import style from "./_style.scss";

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card box

import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
const dashboard = [
	"dashboard",
];
const back = [
	'ti-control-backward',
];
const panel = [
	'ti-layout-grid2-alt',
];
const close = [
	"close",
];
export default class FormElements extends Component {
	state = {
		dataSource: [],
		Name: " ",
	};

	handleUpdateInput = (value) => {
		this.setState({
			dataSource: [
				value,
				value + value,
				value + value + value,
			],
		});
	};
	handlechange = (event) =>{
		this.setState({Name:event.target.value})
		console.log(this.state.Name);
	}
	render() {
		return (
			<div className="formelements-wrapper">
				{/* <PageTitleBar title={<IntlMessages id="sidebar.formElements" />} match={this.props.match} /> */}
				<div className="row">
					<div className="col-sm-12 col-md-12 col-lg-12">
						<div className="row">
						    <div className="col-md-9 col-sm-7 col-xl-10 col-7 Add-agent-title">
								
								<span>Delete Property</span>
						    </div>
							<div className="col-md-3 col-sm-5 col-xl-2 col-5  backBtn-container">
							<Button color="primary" className={back}>Back</Button>
						    </div>
						</div>
						<div className="row">
						    <div className="col-md-12 col-sm-12 col-xl-12 pb-2">
							<span><span className="material-icons icons-middle">{dashboard}</span> Dashboard / Properties / csv delete</span>
						    </div>
						</div>
						<div className="row">
						<div className="col-md-6 col-sm-12 col-xl-4 bg-cont-pad">
							<div className="col-sm-12 col-md-12 col-lg-12 bg-container">
							   <div className="row">
						    <div className="col-md-12 col-sm-12 col-xl-12 Add-panel-container bottom-border">
								<div className="row">
								    <div className="col-md-12 col-sm-12 col-xl-12 Add-panel-title ">
									<span><span aria-hidden="true" className={panel}></span>Delete Panel</span>
								    </div>
								</div>
						    </div>
							<div className="col-md-12 col-sm-12 col-xl-12 p-4">
								<div className="row">
								    <div className="col-md-12 col-sm-12 col-xl-12 ">
									<div className="row">
									    <div className="col-md-12 col-sm-12 col-xl-12">
										  <FormGroup>
										  	<Label className="star">LISTING NAME <span>*</span></Label>
										  	<Input type="select" name="select" id="Select">
												<option>None</option>
												<option>2</option>
												<option>3</option>
												<option>4</option>
												<option>5</option>
											</Input>
										  </FormGroup>
									    </div>
									</div>
									<div className="row">
									    <div className="col-md-5 col-sm-5 col-xl-4  col-6 py-2">
											<Button color="danger" className="custom-button material-icons">{dashboard} CANCEL</Button>
									    </div>
										<div className="col-md-5 col-sm-5 col-xl-6  col-6 pl-0 py-2 pr-4">
										<Button color="primary" className="custom-button material-icons">{dashboard} DELETE UPLOAD</Button>
									    </div>
									</div>
								    </div>
								</div>
						    </div>
							</div>
							</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
