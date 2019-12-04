import { 
    VESSEL_LOAD_SUCCESS,
    VESSEL_LOAD_FAILURE,
    VESSEL_INSERT_SUCCESS,
    VESSEL_INSERT_FAILURE
} from '../actions/types';


const initialState = {
    vessels: [],
    error: ''
}


export const vesselReducer = (state=initialState, actions) =>
{
    switch(actions.type)
    {
        case VESSEL_LOAD_SUCCESS:
            return {...state, vessels: actions.payload, error: ''};
        case VESSEL_LOAD_FAILURE:
            return {...state, vessels: [], error: actions.error};
        case VESSEL_INSERT_SUCCESS:
            return {...state, vessels: [actions.payload, ...state.vessels], error: ''}
        case VESSEL_INSERT_FAILURE:
            return {...state, vessels: [...state.vessels], error: actions.error };
        default:
            return state;
    }
}