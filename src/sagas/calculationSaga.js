/**
 * Email Sagas
 */
import { all, call, fork, put, takeEvery, takeLatest, takeLeading } from 'redux-saga/effects';
import APIURL from '../../globalvariables'
// api
import axios from "axios";

import {
    CALCULATION_SUCCESS,
    CALCULATION_FAILED,
    ADD_CALCULATION,
    GET_CALCULATION,
} from 'Actions/types';


const token = localStorage.getItem('token');
const headers = {
    'token': `Bearer ${token}`,
    'Content-Type': 'application/json'
}

// 5f92e196de830a557c1bc52c
const addNewCalculationApi = async (dataset) => {
    try {
        return axios({
            url: `${APIURL.urls.addCalculation}`,
            method: "post",
            data: JSON.stringify(dataset),
            headers: {
                'token': `Bearer ${dataset.token}`,
                'Content-Type': 'application/json'
            }
        })
    }
    catch (error) {
        console.log('Reducer error', error)
    }
}


const getCalculationApi = async (dataset) => {
    try {
        const api = `${APIURL.urls.getOneCalculation}`
        return axios({
            url: `${api}`,
            method: "get",
            headers: {
                'token': `Bearer ${dataset.token}`,
                'Content-Type': 'application/json'
            }
        })
    }
    catch (error) {
        console.log('Reducer error', error)
    }
}


/**
 * Get Emails From Server
 */
function* addCalculationSaga(action) {
    try {
        const response = yield call(addNewCalculationApi, action.payload)
        action.callback({ error: false, message: response.data.message, data: response.data.data })
        yield put({ type: CALCULATION_SUCCESS, payload: response.data.data });
    } catch (error) {
        action.callback({ error: true, message: error.message })
    }
}



/**
 * Get Emails From Server
 */
function* getCalculationSaga(action) {
    try {
        const response = yield call(getCalculationApi, action.payload)
        action.callback({ error: false, message: response.data.message, data: response.data.data })
        yield put({ type: CALCULATION_SUCCESS, payload: response.data.data });
    } catch (error) { 
        action.callback({ error: true, message: error.message })
        console.log('Error in saga', error)
    }
}


/** 
 * Root Saga
 */
export function* CalculationWatcherSaga() {

    yield takeLatest(ADD_CALCULATION, addCalculationSaga);
}

export function* getCalculationWatcherSaga() {

    yield takeLatest(GET_CALCULATION, getCalculationSaga);
}
/**
 * Auth Root Saga
 */
export default function* rootSaga() {
    yield all([
        CalculationWatcherSaga(),
        getCalculationWatcherSaga()
    ]);
}
