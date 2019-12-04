import axios from '../services/axios_default';

import { ORIGIN_INSERT_FAILURE, ORIGIN_INSERT_SUCCESS, ORIGIN_LOAD_FAILURE, ORIGIN_LOAD_SUCCESS } from './types';


export const FetchOrigin = () => async dispatch => {
    const response = await axios.get('origin/')
    .catch(err => {
        return dispatch({type: ORIGIN_LOAD_FAILURE, error: "Origins: " + err.response.data.detail })
    });
    if (response.status === 200)
        return dispatch({ type: ORIGIN_LOAD_SUCCESS, payload: response.data})
    return response
}

export const PostOrigin = (data) => async dispatch => {
    const response = await axios.post('origin/', data)
    .catch(err => {
        if (err.response.data.name)
            return dispatch({ type: ORIGIN_INSERT_FAILURE, error: "ORIGIN Insert: " + err.response.data.name[0] })
        return dispatch({ type: ORIGIN_INSERT_FAILURE, error: "ORIGIN Insert: " + err.response.data.detail })
    })
    if (response.status === 201)
        return dispatch({ type: ORIGIN_INSERT_SUCCESS, payload: response.data})
    return response
}