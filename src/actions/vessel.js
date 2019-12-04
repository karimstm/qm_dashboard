import axios from '../services/axios_default';

import { VESSEL_INSERT_FAILURE, VESSEL_INSERT_SUCCESS, VESSEL_LOAD_FAILURE, VESSEL_LOAD_SUCCESS } from './types';


export const FetchVessels = () => async dispatch => {
    const response = await axios.get('vessel/')
    .catch(err => {
        return dispatch({type: VESSEL_LOAD_FAILURE, error: "Products: " + err.response.data.detail })
    });
    if (response.status === 200)
        return dispatch({ type: VESSEL_LOAD_SUCCESS, payload: response.data})
    return response
}

export const PostVessel = (data) => async dispatch => {
    const response = await axios.post('vessel/', data)
    .catch(err => {
        if (err.response.data.name)
            return dispatch({ type: VESSEL_INSERT_FAILURE, error: "Vessel Insert: " + err.response.data.name[0] })
        return dispatch({ type: VESSEL_INSERT_FAILURE, error: "Vessel Insert: " + err.response.data.detail })
    })
    if (response.status === 201)
        return dispatch({ type: VESSEL_INSERT_SUCCESS, payload: response.data})
    return response
}