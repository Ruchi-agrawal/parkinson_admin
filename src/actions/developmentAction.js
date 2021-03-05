/**
 *  
 */
import {
    GET_DEVELOPMENT,
    ADD_DEVELOPMENT,
    GET_AGENT_STATUS,
    UPDATE_DEVELOPMENT,
    GET_DEVELOPMENT_DASHBOARD
} from './types';

export function addCalculationWatcher(data, callback) {
    return {
        type: ADD_DEVELOPMENT,
        payload: data,
        callback: callback
    }
}


export function getDevelopments(data, callback) {
    return {
        type: GET_DEVELOPMENT,
        payload: data,
        callback: callback
    }
}

export function getDevelopmentsDashboard(data, callback) {
    return {
        type: GET_DEVELOPMENT_DASHBOARD,
        payload: data,
        callback: callback
    }
}


export function getAgentDevelopmentStatus(data,callback) {
    return {
        type: GET_AGENT_STATUS,
        payload: data,
        callback: callback
    }
}

export const updateDevelopment = (data) => ({
    type: UPDATE_DEVELOPMENT,
    payload: data
})
