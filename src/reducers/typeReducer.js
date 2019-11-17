import { 
    TYPE_LOAD_SUCCESS,
    TYPE_LOAD_FAILURE,
    TYPE_INSERT_SUCCESS,
    TYPE_INSERT_FAILURE
} from '../actions/types';


const initialState = {
    types: [],
    error: ''
}


export const typeReducer = (state=initialState, actions) =>
{
    switch(actions.type)
    {
        case TYPE_LOAD_SUCCESS:
            return {...state, types: actions.payload, error: ''};
        case TYPE_LOAD_FAILURE:
            return {...state, types: [], error: actions.error};
        case TYPE_INSERT_SUCCESS:
            return {...state, types: [actions.payload, ...state.types], error: ''}
        case TYPE_INSERT_FAILURE:
            return {...state, types: [...state.types], error: actions.error };
        default:
            return state;
    }
}