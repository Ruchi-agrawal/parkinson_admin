/**
 *  
 */
import {
    GET_CALCULATION,
    UPDATE_CALCULATION,
    ADD_CALCULATION,
} from './types';

export function addCalculationWatcher(data, callback) {
    return {
        type: ADD_CALCULATION,
        payload: data,
        callback: callback
    }
}


export function getCalculation(data, callback) {
    return {
        type: GET_CALCULATION,
        payload: data, 
        callback: callback
    }
}

export function getOneCalculationWatcher(data, callback) {
    console.log("data", data)
    return {
        type: GET_CALCULATION,
        payload: data,
        callback: callback
    }
}

export const updateSettingsCalculation = (data) => ({
    type: UPDATE_CALCULATION,
    payload: data
})
