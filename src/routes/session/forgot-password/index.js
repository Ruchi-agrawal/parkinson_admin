import React, { Component } from 'react';
import { Form, FormGroup, Input } from 'reactstrap';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import QueueAnim from 'rc-queue-anim';
import APIURL from './../../../../globalvariables';
// app config
import axios from "axios";
import {forgotPassword} from 'Actions'
import AppConfig from 'Constants/AppConfig';
import { connect } from 'react-redux';
class Forgotpwd extends Component {

   onSubmit = () => {
      let self = this
      let { email, submitForm, errorMsg, uid } = this.state;
      this.setState({ submitForm: true });
      let errors = {}
      if (email == '') {
          errors.errorMsg = "\nPlease enter password";
      }

      if (Object.keys(errors).length) {
          let error_message = "";
          for (var key in errors) {
              error_message = error_message + errors[key];
          }
          self.setState({
              loader: false,
              response_message: error_message,
              error_flag: true,
              validation_error: true
          })
      } else {

          let body = {
              email: email
          }
          this.props.forgotPassword(email,(res)=>{

          })
         //  let url = APIURL.urls.forgotPassword
         //  axios.post(url, body, {
         //      headers: {
                 
         //          'Content-Type': 'application/json'
         //      }
         //  })
         //      .then(res => {
         //          if (res.data.success) {
         //             //  self.setState({ response_message: 'Succefully set the password' })
         //              setTimeout(() => {
         //                //   this.props.history.push('/system_admin/signin');
         //              }, 2000);
         //          }
         //          else {

         //          }
         //      })
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
                           {/* <div className="session-social-icon">
                              <IconButton className="text-white" aria-label="facebook">
                                 <i className="zmdi zmdi-facebook"></i>
                              </IconButton>
                              <IconButton className="text-white" aria-label="twitter">
                                 <i className="zmdi zmdi-twitter"></i>
                              </IconButton>
                              <IconButton className="text-white" aria-label="google">
                                 <i className="zmdi zmdi-google"></i>
                              </IconButton>
                           </div> */}
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
                              <FormGroup className="has-wrapper">
                                 <Input type="mail" name="user-mail" id="user-mail" className="has-input input-lg" placeholder="Enter Email Address" onChange={(event) => this.setState({ email: event.target.value })} />
                                 <span className="has-icon"><i className="ti-email"></i></span>
                              </FormGroup>
                              <FormGroup>
                                 <Button variant="contained" onClick={this.onSubmit} className="btn-info text-white btn-block btn-large w-100" disabled={this.props.loading}>Reset Password</Button>
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

// map state to props
const mapStateToProps = ({ authUser }) => {
   const { user, loading } = authUser;
   return { user, loading }
}

export default connect(mapStateToProps, {
   forgotPassword
})(Forgotpwd);
