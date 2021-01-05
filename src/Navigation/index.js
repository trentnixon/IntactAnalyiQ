import React from 'react';
import { BrowserRouter as Router} from "react-router-dom";
import { Route, Switch } from "react-router-dom";

// Context 
 import {STRAPIContextProvider} from "../Context/STRAPI";
 import {SCANContextProvider} from "../Context/SCAN";

 //import {UXContextProvider} from "../Context/UX";
// Components
import history from  '../History'
 
import ComponentLogin from "../Pages/Login/index";
import ComponentPrototype from "../Pages/DataDump/index";
import ComponentPrimaryFeature from "../Pages/Prototype/PrimaryFeature";
import ComponentPortfolio from "../Pages/Portfolio/index";
import ComponentMarkerBasedScan from "../Pages/MarkerBasedScan/MarkerBasedScan";

import DashBoard from "../Template/Dashboard"

// Stattos Parent Routes
const routes = [
  { Rpath: "/", component: ComponentLogin, exact:true},
  { Rpath: "/listData", component: ComponentPrototype, exact:true},
  { Rpath: "/prototype/primaryfeature", component: ComponentPrimaryFeature, exact:true},
  { Rpath: "/portfolio", component: ComponentPortfolio, exact:true},
  { Rpath: "/MarkerBasedScan", component: ComponentMarkerBasedScan, exact:true},
  
];
 
const Main_Routes = (props)=>{
  return (
    <SCANContextProvider>
      <STRAPIContextProvider>
        <Router  basename={'/'}>
            <Switch history={history}>
              <DashBoard>
              <div className="Main">
                        {
                            routes.map((route, i) => (<Route key={i}  exact={route.exact} path={route.Rpath} render={()=> <route.component {... props}/> }/> ))
                        }
                </div>
              </DashBoard>
          </Switch> 
        </Router>
      </STRAPIContextProvider>
    </SCANContextProvider>
    )  
  
}

export default Main_Routes;