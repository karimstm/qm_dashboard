import axios from '../services/axios_default';

import { PORT_INSERT_FAILURE, PORT_INSERT_SUCCESS, PORT_LOAD_FAILURE, PORT_LOAD_SUCCESS } from './types';


export const FetchPorts = () => async dispatch => {
    const response = await axios.get('port/')
    .catch(err => {
        return dispatch({type: PORT_LOAD_FAILURE, error: "Ports: " + err.response.data.detail })
    });
    if (response.status === 200)
        return dispatch({ type: PORT_LOAD_SUCCESS, payload: response.data})
    return response
}

export const PostPorts = (data) => async dispatch => {
    const response = await axios.post('port/', data)
    .catch(err => {
        if (err.response.data.name)
            return dispatch({ type: PORT_INSERT_FAILURE, error: "Ports Insert: " + err.response.data.name[0] })
        return dispatch({ type: PORT_INSERT_FAILURE, error: "Ports Insert: " + err.response.data.detail })
    })
    if (response.status === 201)
        return dispatch({ type: PORT_INSERT_SUCCESS, payload: response.data})
    return response
}