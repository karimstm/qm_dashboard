import { 
    PORT_LOAD_SUCCESS,
    PORT_LOAD_FAILURE,
    PORT_INSERT_SUCCESS,
    PORT_INSERT_FAILURE
} from '../actions/types';


const initialState = {
    ports: [],
    error: ''
}


export const portReducer = (state=initialState, actions) =>
{
    switch(actions.type)
    {
        case PORT_LOAD_SUCCESS:
            return {...state, ports: actions.payload, error: ''};
        case PORT_LOAD_FAILURE:
            return {...state, ports: [], error: actions.error};
        case PORT_INSERT_SUCCESS:
            return {...state, ports: [actions.payload, ...state.ports], error: ''}
        case PORT_INSERT_FAILURE:
            return {...state, ports: [...state.ports], error: actions.error };
        default:
            return state;
    }
}