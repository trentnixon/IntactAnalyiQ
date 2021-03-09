import {combineReducers} from 'redux';
import UXReducer from "./UX";
import STRAPI from "./STRAPI";
import SCANSTATE from "./SCANSTATE";
import AUTH from "./AUTH";
import COMPARE from "./COMPARE";
import MODELSINGLEREVIEW from "./ModelSingleReview";
import COMMS from "./COMMUNICATION";

export default combineReducers({
  UX: UXReducer,
  STRAPI:STRAPI,
  SCANSTATE:SCANSTATE,
  AUTH:AUTH,
  COMPARE:COMPARE,
  SINGLE:MODELSINGLEREVIEW,
  COMMS:COMMS
}) 
  