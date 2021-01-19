import {combineReducers} from 'redux';
import UXReducer from "./UX";
import STRAPI from "./STRAPI";
import SCANSTATE from "./SCANSTATE";
import AUTH from "./AUTH";
import COMPARE from "./COMPARE";

export default combineReducers({
  UX: UXReducer,
  STRAPI:STRAPI,
  SCANSTATE:SCANSTATE,
  AUTH:AUTH,
  COMPARE:COMPARE
}) 
  