import { PRODUCT_LOAD_FAILURE, PRODUCT_LOAD_SUCCESS, PRODUCT_INSERT_SUCCESS, PRODUCT_INSERT_FAILURE } from '../actions/types';

const initialState = {
    products: [],
    error: ''
}

export const ProductsReducer = (state = initialState, actions) =>
{
    switch(actions.type)
    {
        case PRODUCT_LOAD_SUCCESS:
            return {...state, products: actions.payload, error: ''}
        case PRODUCT_LOAD_FAILURE:
            return {...state, products: [], error: actions.error}
        case PRODUCT_INSERT_SUCCESS:
            return {...state, products: [actions.payload, ...state.products ], error: ''}
        case PRODUCT_INSERT_FAILURE:
            return {...state, products: [...state.products], error: actions.error}
        default:
            return state
    }
}