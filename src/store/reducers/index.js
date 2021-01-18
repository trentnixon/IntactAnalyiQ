import {combineReducers} from 'redux';
import UXReducer from "./UX";
import STRAPI from "./STRAPI";
import SCANSTATE from "./SCANSTATE";
import AUTH from "./AUTH";

export default combineReducers({
  UX: UXReducer,
  STRAPI:STRAPI,
  SCANSTATE:SCANSTATE,
  AUTH:AUTH
}) 
  