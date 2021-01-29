import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { LoadScript } from '@react-google-maps/api';
import {UXContextProvider} from "./Context/UX";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import store from './store/'; 
import {LoadPrototype} from "./actions/PrototypeLoader";
import {JWT} from "./actions/authUser";

/*
git add .
git commit -am "FirstPushTest"
git push heroku master

*/
const PrepApp = new LoadPrototype();
const JWTCHECK = JWT();
PrepApp.Fetch();
//let APIKEY='AIzaSyBeaJXqrVv11ir4TY77jJZKhO1iDhGIfiM'
let APIKEY= process.env.googleapi;

ReactDOM.render(
    <Provider store={ store }>
      <LoadScript  googleMapsApiKey={APIKEY} >
        <UXContextProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </UXContextProvider>
      </LoadScript>
    </Provider>,
  document.getElementById('root')
); 

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
