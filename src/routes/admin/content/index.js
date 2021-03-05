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
				<Row>
					<Col xs="12" sm="6" className="addAgent">
						<h1>Add Content</h1>
						<div>
							<span className="material-icons icons-middle">{dashboard}</span>
							<a>Dashboard</a><a>Contents</a><a>add content</a>
						</div>
					</Col>
					<Col xs="12" sm="6">
						<div className="bkAgent">
							<Button color="primary"><span className={back}></span>Back</Button>
						</div>
					</Col>
				</Row>

				<div className="addcontent">
					<h2 className="contentH2"><span aria-hidden="true" className={panel}></span>Add Panel</h2>
					<div className="contentFormUpr">

						<div className="contentForm">
							<Row>
								<Col xs="12" sm="12" md={4}>
									<FormGroup>
										<Label>developments <span>*</span></Label>
										<Input type="select" name="select" id="Select">
											<option>None</option>
											<option>Type 1</option>
											<option>Type 2</option>
											<option>Type 3</option>
											<option>Type 4</option>
										</Input>
									</FormGroup>
								</Col>
								<Col xs="12" sm="12" md={4}>
									<FormGroup>
										<Label>tools <span>*</span></Label>
										<Input type="select" name="select" id="Select">
											<option>None</option>
											<option>Tool 1</option>
											<option>Tool 2</option>
											<option>Tool 3</option>
											<option>Tool 4</option>
										</Input>
									</FormGroup>
								</Col>
								<Col xs="12" sm="12" md={4}>
									<FormGroup>
										<Label>category <span>*</span></Label>
										<Input type="select" name="select" id="Select">
											<option>None</option>
											<option>Category 1</option>
											<option>Category 2</option>
											<option>Category 3</option>
											<option>Category 4</option>
										</Input>
									</FormGroup>
								</Col>
							</Row>

							<div className="contentFormIner">
								<Row>
									<Col xs="12" sm="12" md={12}>
										<FormGroup>
											<Label>title <span>*</span></Label>
											<Input type="text" />
										</FormGroup>
									</Col>
								</Row>
								<Row>
									<Col xs="12" sm="12" md={4}>
										<FormGroup>
											<Label>video type</Label>
											<Input type="select" name="select" id="Select">
												<option>None</option>
												<option>Type 1</option>
												<option>Type 2</option>
												<option>Type 3</option>
												<option>Type 4</option>
											</Input>
										</FormGroup>
									</Col>
									<Col xs="12" sm="12" md={8}>
										<FormGroup>
											<Label>video url</Label>
											<Input type="text" />
										</FormGroup>
									</Col>
								</Row>

								<Row>
									<Col xs="12" sm="12" md={6}>
										<FormGroup>
											<Label>thumbnail</Label>
											<Input type="file" name="file" id="File" />
										</FormGroup>
									</Col>
									<Col xs="12" sm="12" md={6}>
										<FormGroup>
											<Label>upload downloadable files</Label>
											<Input type="file" name="file" id="File" />
										</FormGroup>
									</Col>
								</Row>

							</div>

							<Row>
								<Col xs="12" sm="12" md={3}>
									<Button color="primary">Submit</Button>
								</Col>
							</Row>
						</div>
					</div>
				</div>
			</Container>
		);
	}
}
