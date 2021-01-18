import React from 'react';
import { Route, Switch } from "react-router-dom";
import PublicLayout from "../../Template/PublicLayout";
// Components
import history from  '../../History'

import ComponentAbout from "./About/about";
import ComponentLanding from "./Landing/index"
import ComponentContact from "./Contact/contact";
import ComponentLogin from "./AuthLogin/index";
import ComponentUnAuth from "./unAuth/UnAuth";

const publicPath='demo'
const routes = [
    { Rpath: `/${publicPath}/`, component: ComponentLanding, exact:true},
    { Rpath: `/${publicPath}/about`, component: ComponentAbout, exact:false},
    { Rpath: `/${publicPath}/contact`, component: ComponentContact, exact:false},
    { Rpath: `/${publicPath}/login`, component: ComponentLogin, exact:false},
    { Rpath: `/${publicPath}/unauthorized`, component: ComponentUnAuth, exact:false},
  ];


const Landing = (props)=>{

    return(

                <Switch  history={history}>
                    <PublicLayout>
                    {
                        routes.map((route, i) => (<Route key={i}  exact={route.exact} path={route.Rpath} render={()=> <route.component {... props}/> }/> ))
                    }
                    </PublicLayout>
                </Switch> 
    )
}

export default Landing

// </Switch>
/**
 * *
 *  <div className="InnerFrame">
            <h1>Landing Page</h1>
            <h2>Asset Set List</h2>
            <h3>Header 3</h3>
            <p>Paragragh</p>
            <ul>
                <li>List item</li>
                <li>List item</li>
                <li>List item</li>
            </ul>

        <h2> For Testing </h2>
            <Login />

        </div>
 */