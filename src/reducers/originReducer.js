import { 
    ORIGIN_LOAD_SUCCESS,
    ORIGIN_LOAD_FAILURE,
    ORIGIN_INSERT_SUCCESS,
    ORIGIN_INSERT_FAILURE
} from '../actions/types';


const initialState = {
    origins: [],
    error: ''
}


export const originReducer = (state=initialState, actions) =>
{
    switch(actions.type)
    {
        case ORIGIN_LOAD_SUCCESS:
            return {...state, origins: actions.payload, error: ''};
        case ORIGIN_LOAD_FAILURE:
            return {...state, origins: [], error: actions.error};
        case ORIGIN_INSERT_SUCCESS:
            return {...state, origins: [actions.payload, ...state.origins], error: ''}
        case ORIGIN_INSERT_FAILURE:
            return {...state, origins: [...state.origins], error: actions.error };
        default:
            return state;
    }
}