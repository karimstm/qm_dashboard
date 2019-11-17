import { 
    CATEGORY_LOAD_SUCCESS,
    CATEGORY_LOAD_FAILURE,
    CATEGORY_INSERT_SUCCESS,
    CATEGORY_INSERT_FAILURE
} from '../actions/types';


const initialState = {
    categories: [],
    error: ''
}


export const categoryReducer = (state=initialState, actions) =>
{
    switch(actions.type)
    {
        case CATEGORY_LOAD_SUCCESS:
            return {...state, categories: actions.payload, error: ''};
        case CATEGORY_LOAD_FAILURE:
            return {...state, categories: [], error: actions.error};
        case CATEGORY_INSERT_SUCCESS:
            return {...state, categories: [...state.categories, actions.payload ], error: ''}
        case CATEGORY_INSERT_FAILURE:
            return {...state, categories: [...state.categories], error: actions.error };
        default:
            return state;
    }
}