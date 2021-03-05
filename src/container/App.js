/**
 * App.js Layout Start Here
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

// rct theme provider
import RctThemeProvider from './RctThemeProvider';

//Horizontal Layout
import HorizontalLayout from './HorizontalLayout';

//Agency Layout
import AgencyLayout from './AgencyLayout';

//Main App
import RctDefaultLayout from './DefaultLayout';

// boxed layout
import RctBoxedLayout from './RctBoxedLayout';
// CRM layout
import CRMLayout from './CRMLayout';
// app signin
import AppSignIn from './SigninFirebase';
import AppSignUp from './SignupFirebase';
import {userTypeSuccess, logoutUserFromFirebase} from './../actions/AuthActions';
import { bindActionCreators } from 'redux';

// async components
import {
   AsyncSessionLoginComponent,
   AsyncSessionRegisterComponent,
   AsyncSessionLockScreenComponent,
   AsyncSessionForgotPasswordComponent,
   AsyncSessionChangePasswordComponent,
   AsyncSessionPage404Component,
   AsyncSessionPage500Component,
   AsyncTermsConditionComponent
} from 'Components/AsyncComponent/AsyncComponent';

//Auth0
import Auth from '../Auth/Auth';

// callback component
import Callback from "Components/Callback/Callback";

//Auth0 Handle Authentication
const auth = new Auth();

const handleAuthentication = ({ location }) => {
   if (/access_token|id_token|error/.test(location.hash)) {
      auth.handleAuthentication();
   }
}

/**
 * Initial Path To Check Whether User Is Logged In Or Not
 */
const InitialPath = ({ component: Component, authUser, ...rest}) =>
   <Route
      {...rest}
      render={props =>
         authUser
            ? <Component {...props} />
            : <Redirect
               to={{
                  pathname: '/system_admin/signin',
                  state: { from: props.location }
               }}
            />}
   />;

class App extends Component {

   componentDidMount(){
   }

   render() {
      const { location, match, user, token } = this.props;
     
      if (location.pathname === '/'|| location.pathname === '/system_admin/' || location.pathname === '/system_admin') {
         if (token === null) {
            return (<Redirect to={'/system_admin/signin'} />);
         } else {
            return (<Redirect to={'/system_admin/app/admin/agents'} />);
         }
      }
      return (
         <RctThemeProvider>
            <NotificationContainer />
            <InitialPath
               path={`${match.url}system_admin/app`}
               authUser={token}
               component={RctDefaultLayout}
            />
            <Route path="/system_admin/signin" component={AppSignIn} />
            <Route path="/system_admin/signup" component={AppSignUp} />
            <Route
               path="/system_admin/session/forgot-password"
               component={AsyncSessionForgotPasswordComponent}
            />
            <Route
               path="/system_admin/session/change-password"
               component={AsyncSessionChangePasswordComponent}
            />
            <Route path="/system_admin/session/404" component={AsyncSessionPage404Component} />
            <Route path="/system_admin/session/500" component={AsyncSessionPage500Component} />
            <Route path="/system_admin/terms-condition" component={AsyncTermsConditionComponent} />
            <Route path="/system_admin/callback" render={(props) => {
               handleAuthentication(props);
               return <Callback {...props} />
            }} />
         </RctThemeProvider>
      );
   }
}

// map state to props
const mapStateToProps = ({ authUser }) => {
   const { token, user,loading } = authUser;
   return { token, user, loading };
};
const mapDispatchToProps = dispatch => bindActionCreators({ userTypeSuccess, logoutUserFromFirebase }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(App);
