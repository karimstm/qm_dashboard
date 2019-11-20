import axios from '../services/axios_default';
import {
    USERS_WAITING_LOAD_FAILURE,
    USERS_WAITING_LOAD_SUCCESS,
    USERS_WAITING_PATCH_FAILURE,
    USERS_WAITING_PATCH_SUCCESS,
    USERS_LOAD_SUCCESS,
    USERS_LOAD_FAILURE,
    USERS_UPDATE_SUCCESS,
    USERS_UPDATE_FAILURE,
} from './types';

export const fetchWaitingUsers = () => async dispatch => {
    const response = await axios.get('users/?is_refused=true')
    .catch(err => {
        if (navigator.onLine === false)
            return dispatch({ type: USERS_WAITING_LOAD_FAILURE, error: "Check your internet connection" })
        return dispatch({ type: USERS_WAITING_LOAD_FAILURE, error: 'Users: ' + err.response.detail })
    })
    if (response.status === 200 )
        return dispatch({ type: USERS_WAITING_LOAD_SUCCESS, payload: response.data })
    return response;
}

export const PatchUserApproval = (userId, is_refused) => async dispatch => {
    const response = await axios.patch(`users/${userId}/is_refused/`, { is_refused })
    .catch(err => {
        if (navigator.onLine === false)
            return dispatch({ type: USERS_WAITING_PATCH_FAILURE, error: "Check your internet connection" })
        return dispatch({ type: USERS_WAITING_PATCH_FAILURE, error: 'User Approval: ' + err.response.detail })
    })
    if (response.status === 201 || response.status === 200 )
        return dispatch({ type: USERS_WAITING_PATCH_SUCCESS, payload: userId, status: response.status })
    return response;
}



export const fetchUsers = (
                is_refused = 'unknown',
                is_active = 'unknown',
                email='',
                first_name='',
                last_name=''
    ) => async dispatch => {
    const response = await axios.get(`users/?is_refused=${is_refused}&is_active=${ is_active }&first_name=${first_name}&last_name=${last_name}&email=${email}`)
    .catch(err => {
        if (navigator.onLine === false)
            return dispatch({ type: USERS_LOAD_FAILURE, error: "Check your internet connection" })
        return dispatch({ type: USERS_LOAD_FAILURE, error: 'Users: ' + err.response.detail })
    })
    if (response.status === 200 )
        return dispatch({ type: USERS_LOAD_SUCCESS, payload: response.data })
    return response;
}


// Disable a user

export const DisableEnableUser = (userId, is_active) => async dispatch => {
    const response = await axios.patch(`users/${userId}/is_active/`, { is_active })
    .catch(err => {
        if (navigator.onLine === false)
            return dispatch({ type: USERS_UPDATE_FAILURE, error: "Check your internet connection" })
        return dispatch({ type: USERS_UPDATE_FAILURE, error: 'Users: ' + err.response.detail })
    })
    if (response.status === 200 )
        return dispatch({ type: USERS_UPDATE_SUCCESS, payload: response.data })
    return response;
}