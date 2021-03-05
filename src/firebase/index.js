/**
 * Firebase Login
 * Reactify comes with built in firebase login feature
 * You Need To Add Your Firsebase App Account Details Here
 */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import axios from "axios";
import APIURL from '../../globalvariables.js'
// Initialize Firebase 
const config = {
   apiKey: "AIzaSyD_2FLh1f_BJyKdzeqMvF-oB9Av2cLG6ps", // Your Api key will be here
   authDomain: "reactify-61b82.firebaseapp.com", // Your auth domain
   databaseURL: "https://reactify-61b82.firebaseio.com", // data base url
   projectId: "reactify-61b82", // project id
   storageBucket: "", // storage bucket
   messagingSenderId: "598228895769" // messaging sender id
};

firebase.initializeApp(config);

const auth = firebase.auth();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
const githubAuthProvider = new firebase.auth.GithubAuthProvider();
const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();
const database = firebase.database();

const appauth =  async(email,password) =>{
   return( axios.post(APIURL.urls.loginUser + "?email="+email+"&password="+password,{
    email:email,
    password:password
 }, {
       headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
       }
    })
    // .then(result=>{
    //    console.log("LOGIN RESPONSE", result)
    // })
   )
 }
export {
   auth,
   googleAuthProvider,
   githubAuthProvider,
   facebookAuthProvider,
   twitterAuthProvider,
   database,
   appauth
};