import { 
    CLIENT_LOAD_FAILURE,
    CLIENT_LOAD_SUCCESS,
    CLIENT_INSERT_SUCCESS,
    CLIENT_INSERT_FAILURE
} from './types'

import axios from '../services/axios_default';

export const FetchClient = () => async dispatch => {
    const response = await axios.get('client/')
    .catch(err => {
        return dispatch({type: CLIENT_LOAD_FAILURE, error: "Client: " + err.response.data.detail })
    });
    if (response.status === 200)
        return dispatch({ type: CLIENT_LOAD_SUCCESS, payload: response.data})
    return response
}

export const PostClient = (data) => async dispatch => {
    const response = await axios.post('client/', data)
    .catch(err => {
        return dispatch({type: CLIENT_INSERT_FAILURE, error: "Client: " + err.response.data.detail })
    });
    if (response.status === 201)
        return dispatch({ type: CLIENT_INSERT_SUCCESS, payload: response.data})
    return response
}