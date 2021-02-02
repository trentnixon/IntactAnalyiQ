import React from 'react';
import { BrowserRouter as Router} from "react-router-dom";
import { Route, Switch } from "react-router-dom";

// Context 
 import {STRAPIContextProvider} from "Context/STRAPI";
 import {SCANContextProvider} from "Context/SCAN";
 import {AUTHContextProvider} from "Context/AUTH";
 import {COMPAREContextProvider} from "Context/COMPARE";

 //import {UXContextProvider} from "Context/UX";
// Components
import history from  '../History'


// Non Auth
import ComponentLanding from '../Pages/Public/index'; 
import ComponentAuthUser from "../Pages/Auth/index"; 
import ComponentLoading from "../Pages/Public/Loading/Loading"
const publicPath='demo'
const AuthPath='auth'
const routes = [
  { Rpath: `/`, component: ComponentLoading, exact:true},
  { Rpath: `/${publicPath}/`, component: ComponentLanding, exact:false},
  { Rpath: `/${AuthPath}/`, component: ComponentAuthUser, exact:false},
];
 
const Main_Routes = (props)=>{
  return (
    <SCANContextProvider>
      <STRAPIContextProvider>
        <AUTHContextProvider> 
          <COMPAREContextProvider>
            <Router  history={history}>
              <Switch>
                  <>
                            {
                                routes.map((route, i) => (<Route key={i}  exact={route.exact} path={route.Rpath} render={()=> <route.component {... props}/> }/> ))
                            }
                    </>
              </Switch>
            </Router>
          </COMPAREContextProvider>
        </AUTHContextProvider>
      </STRAPIContextProvider>
    </SCANContextProvider>
    )  
  
}

export default Main_Routes;

// <Switch >  </Switch> 