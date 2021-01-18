import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router} from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Route, Switch } from "react-router-dom";

import {useContext_AUTH_FULL} from "../../Context/AUTH";
import {useContext_STRAPI_FULL} from "../../Context/STRAPI";

// actions
import {FetchDataIntegrity} from "../../actions/authUser";
// Components
import history from  '../../History'
import DashBoard from "../../Template/AuthDashboard"

// Routes
import ComponentLanding from "./Landing";
import ComponentDataDump from "./DataDump"
import ComponentScan from "./ResourceAllocationScan"
import ComponentNewScan from "./CreateNewScan";
import ComponentScanHistory from "./ScanHistory";
import ResultsComponent from "./MarkerBasedScan/MarkerBasedScan";

const routes = [
    { Rpath: "/", component: ComponentLanding, exact:true},
    { Rpath: "/scan-history", component: ComponentScanHistory, exact:true},
    { Rpath: "/new-scan", component: ComponentNewScan, exact:false},
    { Rpath: "/MarkerBasedScan", component: ComponentScan, exact:false},
    { Rpath: "/integity", component: ComponentDataDump, exact:false},
    { Rpath: "/results", component: ResultsComponent, exact:false},

];

const Auth = (props)=>{

    const AUTH = useContext_AUTH_FULL();
    const Pushhistory = useHistory();
    const STRAPI = useContext_STRAPI_FULL();

    const [DataStatus, setDataStatus] = useState(true)

    useEffect(()=>{
        //console.log(AUTH)
        if(AUTH.jwt === false){
            console.log("USER DENIED")
            Pushhistory.push("/demo/login");
        }else{ 
            console.log("USER AUTHED")
        }
    }, [AUTH])


    const checkDataStatus=()=>{
        let DS=true
        Object.keys( STRAPI.UserData).map(function(key, index) { 
            if(STRAPI.UserData[key] === false){
                DS = STRAPI.UserData[key] 
            }
        });
        setDataStatus(DS)
    }

    useEffect(()=>{ checkDataStatus() },[STRAPI.UserData])

    return(
           <>
            { DataStatus ? <AuthRouters {...props} />:<FetchData /> }
           </>
    )
}

export default Auth
//   </Switch> 


const FetchData=()=>{
    FetchDataIntegrity()

    return(
        <>
            <h2>Fetching Data.. Make me look pretty!!!</h2>
        </>
    )
}


const AuthRouters = (props)=>{

    const AUTH = useContext_AUTH_FULL();
    const Pushhistory = useHistory();
    const STRAPI = useContext_STRAPI_FULL();

    const [DataStatus, setDataStatus] = useState(true)

    useEffect(()=>{
        //console.log(AUTH)
        if(AUTH.jwt === false){
            console.log("USER DENIED")
            Pushhistory.push("/demo/login");
        }else{ 
            console.log("USER AUTHED")
        }
    }, [AUTH])

    return(
      
        <Router  basename={'/auth/'} >
            <Switch history={history}>
                <DashBoard>
                {
                    routes.map((route, i) => (<Route key={i}  exact={route.exact} path={route.Rpath} render={()=> <route.component {... props}/> }/> ))
                }
                </DashBoard>
                </Switch>
        </Router>
    
)
}