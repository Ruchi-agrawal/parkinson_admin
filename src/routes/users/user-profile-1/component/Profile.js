/**
 * Profile Page
 */
import React, { Component } from 'react';
import { FormGroup, Input, Form, Label, Col, InputGroup, InputGroupAddon } from 'reactstrap';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { NotificationManager } from 'react-notifications';
import { connect } from 'react-redux';
import {
   Modal,
   ModalHeader,
   ModalBody,
   ModalFooter,
} from 'reactstrap';
// intlmessages
import IntlMessages from 'Util/IntlMessages';
import APIURL from './../../../../../globalvariables';
import Select from 'react-select'
import { countries } from "../../../../../countryCode.json"
import {  updateAgent } from './../../../../api';
import { signinUserSuccess } from './../../../../actions'
import { bindActionCreators } from 'redux';
import axios from "axios";
const CountryLists = countries.map(i => {
   return {
      value: i.value,
      label: `${i.label}(${i.value})`
   }
})
class Profile extends Component {
   constructor(props) {
      super(props);
      this.state = {
         agent: {},
         countryList: CountryLists,
         submitForm: false,
         passwordData: {
            newPass: null,
            confirmPass: null,
            orignalPass: null
         }
      }
   }

   componentDidMount() {
      this.setState({
         agent: this.props.user
      })
   }

   handleContact = (event) => {
      let agent = this.state.agent;
      agent["countryCode"] = event
      this.setState({ agent: agent })
   }

   onChange = (event) => {
      let agent = this.state.agent;
      let target = event.target;
      // let value = target.type
      if (target.name == "contact" && !agent.contact && (target.value == "+" || target.value == "0")) {
         if (target.value == "0") NotificationManager.warning(`You need to omit the first 0 from the number`);
         else if (!agent.countryCode) NotificationManager.warning("Please select country code.");
         else NotificationManager.warning(agent?.countryCode?.label + " is already selected.");
      } else {
         agent[target.name] = target.value;
      }
      this.setState({ agent: agent })
   }


   /**
    * On Update Profile
    */
   onUpdateProfile() {
      // NotificationManager.success('Profile Updated Successfully!');
      let self = this
      let agent = this.state.agent;
      let agentId = agent._id;
      let agentData = {}
      const errors = {};

      if (agent.userType == 'agent_admin' && (!agent.name || agent.name == "")) {
         errors.name = 'Business name is missing';
      }
      else if (agent.userType == 'agent_admin' && agent.name) {
         agentData['name'] = agent.name
      }
      if (!agent.firstName || agent.firstName == "") {
         errors.firstName = 'first name is missing';
      }
      if (agent.firstName) {
         agentData['firstName'] = agent.firstName
      }

      if (!agent.lastName || agent.lastName == "") {
         errors.lastName = 'last name is missing';
      }
      if (agent.lastName) {
         agentData['lastName'] = agent.lastName
      }

      if (agent.lastName) {
         agentData['lastName'] = agent.lastName
      }
      if (agent.countryCode) {
         agentData['countryCode'] = agent.countryCode
      }

      if (agent.contact) {
         agentData['contact'] = agent.contact
      }


      if (Object.keys(errors).length) {
         let error_message = "";
         for (var key in errors) {
            error_message = error_message + errors[key] + ',\n\r';
         }

         self.setState({
            loader: false,
            response_message: error_message,
            error_flag: true,
            validation_error: true
         })
      } else {

         self.setState({
            loader: true
         });
         let add_agent_uri = APIURL.urls.updateUser + '?id=' + agentId
         let token = self.props.token;
      }
   }

   onAddUpdateUserModalOpen = () => {
      this.setState({
         setPassword: true,
         newPass: null,
         confirmPass: null,
         orignalPass: null
      })
   }

   /**
 * On Add & Update User Modal Close
 */
   onAddUpdateUserModalClose = () => {
      this.setState({
         setPassword: false,
         newPass: null,
         confirmPass: null,
         orignalPass: null
      })
   }

   onUpdateUserDetail = (event) => {
      let { name, value } = event.target
      let passwordData = this.state.passwordData;
      let { submitForm } = this.state;
      passwordData[name] = value;
      this.setState({ passwordData })
      if (submitForm) {
         let errorMsg = null
         if (passwordData['newPass'] == '')
            errorMsg = "Please enter Password";

         // If confirm password not entered 
         else if (passwordData['confirmPass'] == '')
            errorMsg = "Please enter confirm password";

         // If Not same return False.     
         else if (passwordData['newPass'] != passwordData['confirmPass']) {
            errorMsg = "\nonfirm password did not match with new password"
            // return false;
         }
         this.setState({
            response_errorPass: errorMsg,
         })
      }

   }

   updateUser = () => {
      let self = this
      let { passwordData } = this.state
      this.setState({ submitForm: true, loading: true });
      let errors = {}
      if (passwordData['orignalPass'] == '') {
         errors.errorMsg = "\nPlease enter old password";
      }
      if (passwordData['newPass'] == '') {
         errors.errorMsg = "\nPlease enter new password";
      }

      // If confirm password not entered 
      else if (passwordData['confirmPass'] == '')
         errors.errorMsg = "\nPlease enter confirm password";

      // If Not same return False.     
      else if (passwordData['confirmPass'] != passwordData['newPass']) {
         errors.errorMsg = "\nConfirm password did not match with new password"
         // return false;
      }

      if (Object.keys(errors).length) {
         let error_message = "";
         for (var key in errors) {
            error_message = error_message + errors[key];
         }
         self.setState({
            loading: false,
            response_errorPass: error_message,
            error_flag: true,
            validation_error: true
         })
      } else {
         let url = APIURL.urls.changepassword
         axios.put(url, passwordData, {
            headers: {
               'token': 'Bearer ' + this.props.token,
               'Content-Type': 'application/json'
            }
         })
            .then(res => {
               self.setState({
                  loading: false
               })
               if (res.data.success) {
                  self.setState({ response_messagePass: 'Succefully set the password' })
                  setTimeout(() => {
                     self.setState({ response_messagePass: null })
                  }, 2000);
               }
               else {
                  self.setState({ response_errorPass: res.data.message })
                  setTimeout(() => {
                     self.setState({ response_errorPass: null })
                  }, 2000);
               }
            })
      }

   }

   render() {
      const { agent, countryList, response_errorPass, response_messagePass } = this.state
      return (
         <div className="profile-wrapper w-50">
            <Modal isOpen={this.state.setPassword} toggle={() => this.onAddUpdateUserModalClose()}>
               <ModalHeader toggle={() => this.onAddUpdateUserModalClose()}>
                  Edit Password
					</ModalHeader>
               <ModalBody>
                  <Form>
                     <FormGroup>
                        <Label for="orignalPass ">Old Password</Label>
                        <Input
                           type="password"
                           name="orignalPass"
                           id="orignalPass"
                           placeholder="Enter Password"
                           onChange={(e) => this.onUpdateUserDetail(e)}
                        />
                     </FormGroup>
                     <FormGroup>
                        <Label for="newPass">New Password</Label>
                        <Input
                           type="password"
                           name="newPass"
                           id="newPass"
                           placeholder="Enter Password"
                           onChange={(e) => this.onUpdateUserDetail(e)}
                        />
                     </FormGroup>
                     <FormGroup>
                        <Label for="confirmPass">Confirm Password</Label>
                        <Input
                           type="password"
                           name="confirmPass"
                           id="confirmPass"
                           placeholder="Enter Password"
                           onChange={(e) => this.onUpdateUserDetail(e)}
                        />
                     </FormGroup>
                  </Form>
                  {response_errorPass && <div className="danger-msg">{this.state.response_errorPass}</div>}
                  {response_messagePass && <div className="success-msg">{this.state.response_messagePass}</div>}
               </ModalBody>
               <ModalFooter>
                  <Button variant="contained" color="primary" className="text-white" onClick={() => this.updateUser()}>Update</Button>

                  <Button variant="contained" className="text-white btn-danger" onClick={() => this.onAddUpdateUserModalClose()}>Cancel</Button>
               </ModalFooter>
            </Modal>
            {/* <h2 className="heading"><IntlMessages id="widgets.personalDetails" /></h2> */}
            <Form>
               <FormGroup row>
                  <Label for="firstName" sm={3}><IntlMessages id="components.firstName" /></Label>
                  <Col sm={9}>
                     <Input type="text" name="firstName" onChange={this.onChange} value={agent.firstName ? agent.firstName : ''} />
                  </Col>
               </FormGroup>
               <FormGroup row>
                  <Label for="lastName" sm={3}><IntlMessages id="components.lastName" /></Label>
                  <Col sm={9}>
                     <Input type="text" name="lastName" onChange={this.onChange} value={agent.lastName ? agent.lastName : ''} />
                  </Col>
               </FormGroup>
               {agent.userType == 'agent_admin' && <FormGroup row>
                  <Label for="name" sm={3}>Business Name</Label>
                  <Col sm={9}>
                     <Input type="text" name="name" onChange={this.onChange} value={agent.name ? agent.name : ''} />
                  </Col>
               </FormGroup>}
               <FormGroup row>
                  <Label for="contact" sm={3}>Mobile Number</Label>
                  <Col xs="6" sm="6" md={4}>
                     <FormGroup>
                        <Select onChange={this.handleContact} placeholder="Country" options={countryList} value={agent.countryCode ? agent.countryCode : null} />
                     </FormGroup>
                  </Col>
                  <Col xs="6" sm="6" md={5}>
                     <FormGroup>
                        <Input type="text" name="contact" onChange={this.onChange} value={agent.contact ? agent.contact : ''} />
                     </FormGroup>
                  </Col>
                  <Col xs="12" sm="12" md={12}>
                     <div className="note-msg">For the mobile numbers you must select the international dialing code and then enter the local number omitting the first zero</div>
                  </Col>
               </FormGroup>
            </Form>
            {this.state.response_message && <div className="success-msg">{this.state.response_message}</div>}
            {this.state.response_error && <div className="danger-msg">{this.state.response_error}</div>}
            <div>
               <Button variant="contained" color="primary" className="text-white" onClick={() => this.onUpdateProfile()}><IntlMessages id="widgets.updateProfile" /></Button>
               <Button variant="contained" color="primary" className="text-white" onClick={() => this.onAddUpdateUserModalOpen()} style={{marginLeft:10}}>Change Password</Button>
            </div>

         </div>
      );
   }
}


const mapStateToProps = (state) => {
   const { user, token, userType } = state.authUser;
   return {
      user, token, userType
   };
}

const mapDispatchToProps = dispatch => bindActionCreators({ signinUserSuccess }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);