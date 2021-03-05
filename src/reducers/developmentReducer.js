import {
    GET_AGENT_STATUS,
    GET_DEVELOPMENT,
    GET_DEVELOPMENT_DASHBOARD
} from 'Actions/types';

const INITIAL_STATE = {
    developments: {},
    developmentStatus: {},
    unitStatus: {}
};



const developmentReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_DEVELOPMENT:
            return {
                ...state,
                developments: action.payload.developments
            }
        case GET_AGENT_STATUS:
            return {
                ...state,
                developmentStatus: action.payload.developmentStatus,
                unitStatus: action.payload.unitStatus
            }
            case GET_DEVELOPMENT_DASHBOARD:
                return{
                    ...state,
                    developmentDashboard: action.payload.developmentDashboard

                }
        default:
            return state
    }
}
export default developmentReducer