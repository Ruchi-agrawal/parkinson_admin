import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col, Button, FormGroup, Label, Input, FormText } from 'reactstrap';
import APIURL from '../../../../globalvariables';
import CircularProgress from '@material-ui/core/CircularProgress';
import ReactHtmlParser from 'react-html-parser';
import './../../../assets/scss/custom.css';
import { addCalculationWatcher, getCalculation } from '../../../actions/calculationAction'
import { bindActionCreators } from 'redux';

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
const apiURL = `${apiurl}calculations/addCalculation`

class Calculations extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rental_return: "",
            ground_rent: "",
            service_charge: "",
            discount:"",
            management_charge: "",
            error_flag: false,
            response_message: "",
            validation_error: false,
            calculationId: "",
            calculationData: "",

        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }

    componentDidMount = () => {
        let dataset = {token: this.props.token};
       
        this.props.getCalculation(dataset, res => {
            
            if(res.message=="Success"){
                // let returnedResult = res.data[0];
                let returnedResult = res.data;
                this.setState({
                    rental_return: returnedResult.rental_return?returnedResult.rental_return:'',
                    discount: returnedResult.discount?returnedResult.discount:'',
                    service_charge: returnedResult.service_charge?returnedResult.service_charge:'',
                    ground_rent: returnedResult.ground_rent?returnedResult.ground_rent:'',
                    management_charge: returnedResult.management_charge?returnedResult.management_charge:''
                })
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


    handleSubmit = async (event) => {
        event.preventDefault();
        let self = this

        const errors = {};
        let dataset = {};
        if (this.state.rental_return === null || this.state.rental_return === "") {
            errors.rental_return = 'rental return is missing';
        } else {
            dataset.rental_return = this.state.rental_return
        }

        if (this.state.ground_rent === null || this.state.ground_rent === "") {
            errors.ground_rent = 'ground rent is missing';
        } else {
            dataset.ground_rent = this.state.ground_rent
        }  

        if (this.state.service_charge === null || this.state.service_charge === '') {
            errors.service_charge = 'service charge is missing';
        } else {
            dataset.service_charge = this.state.service_charge
        }

        if (this.state.discount === null || this.state.discount === '') {
            errors.discount = 'Discount is missing';
        } else {
            dataset.discount = this.state.discount
        }

        if (this.state.management_charge === null || this.state.management_charge === '') {
            errors.management_charge = 'management charge is missing';
        } else {
            dataset.management_charge = this.state.management_charge
        }

        dataset.token = this.props.token

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
            try {
                this.props.addCalculationWatcher(dataset, res => {
                    console.log('res', res.data)
                    if (res.error === false) {
                        self.setState({
                            loader: false,
                            response_message: res.message,
                            error_flag: true,
                            validation_error: true
                        })
                    }
                    else {
                        self.setState({
                            calculationData: res.data,
                            loader: false,
                            response_message: res.message,
                            error_flag: false
                        })
                    }
                })
                console.log('Props', this.props.calculations)
            }
            catch (error) {
                self.setState({
                    loader: false,
                    response_message: error.message,
                    error_flag: true,
                    validation_error: true
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
                            <a>Dashboard</a><a>Settings</a><a>calculations</a>
                        </div>
                    </Col>
                    <Col xs="12" sm="6">
                        <div className="bkAgent">
                            <Button color="primary" onClick={this.handleBack} ><span className={back}></span>Back</Button>
                        </div>
                    </Col>
                </Row>
                <div className="addPanel">
                    <h2 className="panelH2"><span aria-hidden="true" className={panel}></span>Calculations Panel</h2>
                    <div className="panelForm">
                        <Row>
                            <Col xs="12" sm="12" md={12}>
                                <h2>Calculations</h2>
                            </Col>
                            <Col xs="12" sm="12" md={3}>
                                <FormGroup calculationid={this.state.calculationId}>
                                    <Label>Asurred rental return %</Label>
                                    <Input type="text" name="rental_return" value={this.state.rental_return} onChange={this.handleChange} />
                                </FormGroup>
                            </Col>
                            <Col xs="12" sm="12" md={3}>
                                <FormGroup>
                                    <Label>Discount</Label>
                                    <Input type="text" name="discount" value={this.state.discount} onChange={this.handleChange} />
                                </FormGroup>
                            </Col>
 
                            <Col xs="12" sm="12" md={3}>
                                <FormGroup>
                                    <Label>Ground rent %</Label>
                                     <Input type="text" name="ground_rent" value={this.state.ground_rent} onChange={this.handleChange} />
                                </FormGroup>
                            </Col>

                            <Col xs="12" sm="12" md={3}>
                                <FormGroup>
                                     <Label>Service charge £ per FT<sup>2</sup></Label>
                                    <Input type="text" name="service_charge" value={this.state.service_charge} onChange={this.handleChange} />
                                </FormGroup>
                            </Col>

                            <Col xs="12" sm="12" md={3}>
                                <FormGroup>
                                    <Label>Management charge %</Label>
                                    <Input type="text" name="management_charge" value={this.state.management_charge} onChange={this.handleChange} />
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs="12" sm="12" md={2}>
                                <Button color="primary" onClick={this.handleSubmit} >Save</Button>
                            </Col>
                        </Row>
                        <h2>{(this.state.calculationData === '' ? null : this.state.calculationData)}</h2>
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
    const {calculations} = state.calculationReducer;
    const { user, token, userType } = state.authUser;
    return {
        calculations,user, token, userType 
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({ addCalculationWatcher, getCalculation }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Calculations);

