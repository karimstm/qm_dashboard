import { USERS_WAITING_LOAD_FAILURE, USERS_WAITING_LOAD_SUCCESS, USERS_WAITING_PATCH_SUCCESS, USERS_WAITING_PATCH_FAILURE, USERS_LOAD_FAILURE, USERS_LOAD_SUCCESS} from '../actions/types';

const initialState = {
    users: [],
    error: ''
}

export const usersReducer = (state = initialState, actions) =>
{
    switch(actions.type)
    {
        case USERS_WAITING_LOAD_SUCCESS:
            return {...state, users: actions.payload, error: ''}
        case USERS_WAITING_LOAD_FAILURE:
            return {...state, users: [], error: actions.error}
        case USERS_WAITING_PATCH_SUCCESS:
            return {...state, users: state.users.filter((user) => user.id !== actions.payload), error: ''}
        case USERS_WAITING_PATCH_FAILURE:
            return {...state, users: [...state.users], error: actions.error}
        case USERS_LOAD_FAILURE:
            return {...state, users: [], error: actions.error}
        case USERS_LOAD_SUCCESS:
            return {...state, users: actions.payload, error: ''}
        default:
            return state;
    }
}