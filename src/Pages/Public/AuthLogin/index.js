import React, { useEffect } from 'react';
import {useContext_AUTH_FULL} from "../../../Context/AUTH";
import { useHistory } from "react-router-dom";


import LoginForm from "../../../venders/MaterialUI/Forms/LoginForm"


const AuthLogin = ()=>{

    const AUTH = useContext_AUTH_FULL();
    const Pushhistory = useHistory();
    
 
    
    useEffect(()=>{ if(AUTH.jwt !== false){Pushhistory.push("/auth");}},[AUTH])
    return(
        <>
            <h1>Login</h1>
            <LoginForm />
            
        </>
    )
}

export default AuthLogin;