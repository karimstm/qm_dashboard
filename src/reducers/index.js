import { combineReducers } from "redux";
import auth from "./auth";
import { ProductsReducer } from './products';
import { categoryReducer } from './categoryReducer';
import { familyReducer } from './FamilyReducer';
import { typeReducer } from './typeReducer';
import { clientReducer } from "./clientReducer";

export default combineReducers({
  auth,
  products: ProductsReducer,
  categories: categoryReducer,
  families: familyReducer,
  types: typeReducer,
  clients: clientReducer
});
