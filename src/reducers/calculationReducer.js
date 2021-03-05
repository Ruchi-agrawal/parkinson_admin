import {
    CALCULATION_SUCCESS,
} from 'Actions/types';

const INITIAL_STATE = {
    calculations: {}
};


const calculationReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CALCULATION_SUCCESS:
            return {
                ...state,
                calculations: action.payload
            }
        default:
            return state
    }
}
export default calculationReducer     