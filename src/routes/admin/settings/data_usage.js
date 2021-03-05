import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button, FormGroup, Label, Input, FormText } from 'reactstrap';
import APIURL from '../../../../globalvariables';
import axios from "axios";
import ReactHtmlParser from 'react-html-parser';
import './../../../assets/scss/custom.css';
import { getCalculation } from '../../../actions/calculationAction'

const dashboard = [
    "dashboard",
];
const back = [
    'ti-control-backward',
];
const panel = [
    'ti-layout-grid2-alt',
];

const { apiurl } = APIURL.urls
const apiURL = `${apiurl}calculations/updateDataUsageAndTerms`
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNva295YS53ZWJuZXh1c0BnbWFpbC5jb20iLCJpZCI6MjQ2LCJyb2xlIjoiYWdlbnQiLCJpYXQiOjE2MDM2OTc5NjksImV4cCI6MTYwMzc4NDM2OX0.Rqi3G65hUol4xhlJIPNQMeHZ0uWm1gPG8FA0Hhl1PUs`
const headers = {
    'token': `Bearer ${token}`,
    'Content-Type': 'application/json'
}

class DataUsage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data_usage: "",
            error_flag: false,
            response_message: "",
            validation_error: false,
            calculationId: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }

    componentDidMount() {
        let dataset = { token: this.props.token };
        this.props.getCalculation(dataset, res => {
            if (res.message == "Success") {
                let returnedResult = res.data;
                this.setState({ calculationId: returnedResult._id, data_usage: returnedResult && returnedResult.data_usage ? returnedResult.data_usage : '' })
            }
        })
    }

    handleChange = (event) => {
        let self = this;
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        self.setState({
            [name]: value, error_flag: false, response_message: ""
        });
    }

    handleSubmit = async (event) => {
        let self = this

        const errors = {};
        let dataset = {};
        if (!this.state.data_usage || this.state.data_usage === "") {
            errors.data_usage = 'data usage is missing';
        } else {
            dataset.data_usage = this.state.data_usage
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
            const { calculationId } = this.state
            const response = await axios({
                url: `${APIURL.urls.updateCalculation}?id=${calculationId}`,
                method: "put",
                data: { 'data_usage': this.state.data_usage },
                headers: {
                    'token': 'Bearer ' + this.props.token,
                    'Content-Type': 'application/json'
                }
            })

            if (response.data && response.data.statusCode && response.data.statusCode == 200) {
                self.setState({
                    loader: false,
                    response_message: response.data.message,
                    error_flag: false
                })
            } else {
                self.setState({
                    loader: false,
                    response_message: response.data.message,
                    error_flag: true
                })
            }

        }
    }

    handleBack = () => {
        this.props.history.goBack()
    }
    render() {
        return (
            <Container>
                <Row>
                    <Col xs="12" sm="6" className="addAgent">
                        <h1>Admin Settings</h1>
                        <div>
                            <span className="material-icons icons-middle">{dashboard}</span>
                            <a>Dashboard</a><a>Settings</a><a>data usage</a>
                        </div>
                    </Col>
                    <Col xs="12" sm="6">
                        <div className="bkAgent">
                            <Button color="primary" onClick={this.handleBack} ><span className={back}></span>Back</Button>
                        </div>
                    </Col>
                </Row>
                <div className="addPanel">
                    <h2 className="panelH2"><span aria-hidden="true" className={panel}></span>Data usage Panel</h2>
                    <div className="panelForm">
                        <Row>
                            <Col xs="12" sm="12" md={12}>
                                <h2>Data usage</h2>
                            </Col>
                            <Col xs="12" sm="12" md={12}>
                                <FormGroup>
                                    <Label>Data usage</Label>
                                    <Input type="textarea" name="data_usage" value={this.state.data_usage} onChange={this.handleChange} />
                                    {/* <Input type="text" name="data_usage" value={this.state.data_usage} onChange={this.handleChange} /> */}
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" sm="12" md={2}>
                                <Button color="primary" onClick={this.handleSubmit} >Save</Button>
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
                    </div>
                </div>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    const { calculations } = state.calculationReducer;
    const { token, userType } = state.authUser;
    return {
        calculations, token, userType
    };
}


export default connect(mapStateToProps, {
    getCalculation
})(DataUsage);