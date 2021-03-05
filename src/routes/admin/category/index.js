import React, { Component } from 'react';
import { Container, Row, Col, Button, FormGroup, Label, Input, FormText } from 'reactstrap';

const dashboard = [
	"dashboard",
];
const back = [
	'ti-control-backward',
];
const panel = [
	'ti-layout-grid2-alt',
];
export default class FormElements extends Component {
	render() {
		return (
			<Container>

				{/* Common Breadcrumb */}
				<Row>
					<Col xs="12" sm="6" className="addAgent">
						<h1>Admin Add Category</h1>
						<div>
							<span className="material-icons icons-middle">{dashboard}</span>
							<a>Dashboard</a><a>categories</a><a>add</a>
						</div>
					</Col>
					<Col xs="12" sm="6">
						<div className="bkAgent">
							<Button color="primary"><span className={back}></span>Back</Button>
						</div>
					</Col>
				</Row>
				{/* End of Common Breadcrumb */}

				<Row>
					<Col xs="12" sm="12" md="6">
						<div className="addcatgry">
							<h2 className="catgryH2"><span aria-hidden="true" className={panel}></span>Category Panel</h2>
							<div className="catgryForm">
								<div>
									<FormGroup>
										<Label>name <span>*</span></Label>
										<Input type="text" />
									</FormGroup>
								</div>
								<div>
									<FormGroup>
										<Label>image <span>*</span></Label>
										<Input type="file" name="file" id="File" />
										<FormText>Supported Format (.jpg .Png .jpeg .gif)</FormText>
									</FormGroup>
								</div>
								<div className="catgryBtns">
									<Button>submit</Button>
								</div>
							</div>
						</div>
					</Col>
				</Row>

			</Container>
		);
	}
}
