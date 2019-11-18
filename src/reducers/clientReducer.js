import { 
    CLIENT_INSERT_FAILURE,
    CLIENT_INSERT_SUCCESS,
    CLIENT_LOAD_FAILURE,
    CLIENT_LOAD_SUCCESS
} from '../actions/types';


const initialState = {
    clients: [],
    error: ''
}


export const clientReducer = (state=initialState, actions) =>
{
    switch(actions.type)
    {
        case CLIENT_LOAD_SUCCESS:
            return {...state, clients: actions.payload, error: ''};
        case CLIENT_LOAD_FAILURE:
            return {...state, clients: [], error: actions.error};
        case CLIENT_INSERT_SUCCESS:
            return {...state, clients: [actions.payload, ...state.clients], error: ''}
        case CLIENT_INSERT_FAILURE:
            return {...state, clients: [...state.clients], error: actions.error };
        default:
            return state;
    }
}