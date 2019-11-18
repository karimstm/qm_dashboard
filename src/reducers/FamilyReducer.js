import { 
    FAMILY_LOAD_SUCCESS,
    FAMILY_LOAD_FAILURE,
    FAMILY_INSERT_SUCCESS,
    FAMILY_INSERT_FAILURE
} from '../actions/types';


const initialState = {
    families: [],
    error: ''
}


export const familyReducer = (state=initialState, actions) =>
{
    switch(actions.type)
    {
        case FAMILY_LOAD_SUCCESS:
            return {...state, families: actions.payload, error: ''};
        case FAMILY_LOAD_FAILURE:
            return {...state, families: [], error: actions.error};
        case FAMILY_INSERT_SUCCESS:
            return {...state, families: [actions.payload, ...state.families], error: ''}
        case FAMILY_INSERT_FAILURE:
            return {...state, families: [...state.families], error: actions.error };
        default:
            return state;
    }
}