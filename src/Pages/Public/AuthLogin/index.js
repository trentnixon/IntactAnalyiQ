import React, { useEffect } from 'react';
import {useContext_AUTH_FULL} from "../../../Context/AUTH";
import { useHistory } from "react-router-dom";
import {LogoMain} from "../../../Assets/logo"
import LoginForm from "../../../venders/MaterialUI/Forms/LoginForm"


const AuthLogin = ()=>{

    const AUTH = useContext_AUTH_FULL();
    const Pushhistory = useHistory();
    
 
    
    useEffect(()=>{ if(AUTH.jwt !== false){Pushhistory.push("/auth");}},[AUTH])
    return(
        <div className="LoginForm">
             <LogoMain />
            <h1>Intact AnalytiQ</h1>
 
            <LoginForm />
           <Disclaimer />
        </div>
    )
}

export default AuthLogin;


const Disclaimer = ()=>{
    return(
          <div className="disclaimer">
              <p>This is a prototype build of Intact Analyiq alpha v0.1 </p>
              <p>Please wait whilst we fire up the Dyno's</p>
          </div>
    )
}