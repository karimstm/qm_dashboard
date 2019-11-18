
import axios from '../services/axios_default';
import { 
    PRODUCT_LOAD_SUCCESS,
    PRODUCT_LOAD_FAILURE,
    CATEGORY_LOAD_SUCCESS,
    CATEGORY_LOAD_FAILURE,
    PRODUCT_INSERT_FAILURE,
    PRODUCT_INSERT_SUCCESS,
    CATEGORY_INSERT_FAILURE,
    CATEGORY_INSERT_SUCCESS,
    FAMILY_LOAD_FAILURE,
    FAMILY_LOAD_SUCCESS,
    FAMILY_INSERT_FAILURE,
    FAMILY_INSERT_SUCCESS,
    TYPE_INSERT_FAILURE,
    TYPE_INSERT_SUCCESS,
    TYPE_LOAD_FAILURE,
    TYPE_LOAD_SUCCESS
 } from './types';


export const FetchProducts = () => async dispatch => {
    const response = await axios.get('products/')
    .catch(err => {
        return dispatch({type: PRODUCT_LOAD_FAILURE, error: "Products: " + err.response.data.detail })
    });
    if (response.status === 200)
        return dispatch({ type: PRODUCT_LOAD_SUCCESS, payload: response.data})
    return response
}


export const FetchCategroy = () => async dispatch => {
    const response = await axios.get('productcategory/')
    .catch(err => {
        return dispatch({ type: CATEGORY_LOAD_FAILURE, error: "Categories: " + err.response.data.detail })
    });
    if (response.status === 200)
        return dispatch({ type: CATEGORY_LOAD_SUCCESS, payload: response.data})
    return response
}

export const PostProduct = (data) => async dispatch => {
    const response = await axios.post('product/', data)
    .catch(err => {
        if (err.response.data.name)
            return dispatch({ type: PRODUCT_INSERT_FAILURE, error: "Product Insert: " + err.response.data.name[0] })
        return dispatch({ type: PRODUCT_INSERT_FAILURE, error: "Product Insert: " + err.response.data.detail })
    })
    if (response.status === 201)
        return dispatch({ type: PRODUCT_INSERT_SUCCESS, payload: response.data})
    return response
}

export const PostCategory = (data) => async dispatch => {
    const response = await axios.post('productcategory/', data)
    .catch(err => dispatch({ type: CATEGORY_INSERT_FAILURE, error: "Category Insert: " + err.response.data.detail}))
    if (response.status === 201 )
        return dispatch({ type: CATEGORY_INSERT_SUCCESS, payload: response.data })
    return response
}

export const FetchFamily = () => async dispatch => {
    const response = await axios.get('productfamily/')
    .catch(err => {
        return dispatch({ type: FAMILY_LOAD_FAILURE, error: "Product Family: " + err.response.data.detail })
    });
    if (response.status === 200)
        return dispatch({ type: FAMILY_LOAD_SUCCESS, payload: response.data})
    return response
}

export const PostFamily = (data) => async dispatch => {
    const response = await axios.post('productfamily/', data)
    .catch(err => {
        return dispatch({ type: FAMILY_INSERT_FAILURE, error: "Product Family Insert: " + err.response.data.detail })
    });
    if (response.status === 201)
        return dispatch({ type: FAMILY_INSERT_SUCCESS, payload: response.data})
    return response
}


export const FetchType = () => async dispatch => {
    const response = await axios.get('productype/')
    .catch(err => dispatch({ type: TYPE_LOAD_FAILURE, error: 'Product Type: ' + err.response.detail }))
    if (response.status === 200 )
        return dispatch({ type: TYPE_LOAD_SUCCESS, payload: response.data })
    return response;
}

export const PostType = (data) => async dispatch => {
    const response = await axios.post('productype/', data)
    .catch(err => dispatch({ type: TYPE_INSERT_FAILURE, error: 'Product Type Insert : ' + err.response.detail }))
    if (response.status === 201 )
        return dispatch({ type: TYPE_INSERT_SUCCESS, payload: response.data })
    return response;
}