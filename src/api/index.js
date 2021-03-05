import axios from 'axios';
import { call } from 'redux-saga/effects';
import APIURL from '../../globalvariables';
import auth from '../Auth/Auth'
import {
   USER_TYPE_SUCCESS, LOGOUT_USER

} from '../actions/types';
export const api = () => {
   axios.create({
      baseURL: 'https://reactify.theironnetwork.org/data/',
      timeout: 2000
   });
}



// Worked for Parkinsons

export const getAllPost = async (token) => {
   const config = {
      headers: {
         "Content-Type": "application/json",
         "Accept": "application/json"
      }
   }
   let response = await axios.get(APIURL.urls.getPosts)
   if (response) {
      return response
   }
}

export const getActivePost = async (token) => {
   const config = {
      headers: {
         "Content-Type": "application/json",
         "Accept": "application/json"
      }
   }
   let response = await axios.get(APIURL.urls.getActivePosts)
   if (response) {
      return response
   }
}

export const handlePostStatus = async (data) => {
   const config = {
      headers: {
         "Content-Type": "application/json",
         "Accept": "application/json"
      }
   }
   let response = await axios.post(APIURL.urls.handlePostStatus, data, config)
   if (response.data.statusCode == 200) {
      return response.data.data
   }
}

export const forgotPasswordApi = (searchform) => {
   return axios.post(APIURL.urls.forgotPassword, searchform, {
      headers: {
         'Content-Type': 'application/json'
      }
   })
}

export const deletePost = (data, token) => {
   return axios.post(APIURL.urls.deletePost, data, {
      headers: {
         "token": token,
         'Content-Type': 'application/json'
      }
   })
}

export const userList = (data, token) => {
   return axios.get(APIURL.urls.userList, {
      headers: {
         "token": token,
         'Content-Type': 'application/json'
      }
   })
}

export const checkUserStatus = (userId, token) => {
   let data={
      'userId':userId
   }
   return axios.post(APIURL.urls.checkUser, data, {
      headers: {
         "token": token,
         'Content-Type': 'application/json'
      }
   })
}

export const blockUser =(userId, event, token)=>{
   let data={
      "userId":userId, "event":event
   }
   return axios.post(APIURL.urls.handleUser, data, {
      headers: {
         "token": token,
         'Content-Type': 'application/json'
      }
   })
}
