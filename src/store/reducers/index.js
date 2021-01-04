import {combineReducers} from 'redux';
import UXReducer from "./UX";
import STRAPI from "./STRAPI";
import SCANSTATE from "./SCANSTATE";

export default combineReducers({
  UX: UXReducer,
  STRAPI:STRAPI,
  SCANSTATE:SCANSTATE
}) 
  