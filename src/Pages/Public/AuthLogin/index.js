import React, { useEffect, useState } from 'react';
import {useContext_AUTH_FULL} from "Context/AUTH";
import { useHistory } from "react-router-dom";
import {LogoMain,AlogoBlue,JLLMain,AlogoWhite} from "Assets/logo"

import LoginForm from "venders/MaterialUI/Forms/LoginForm"
import NivoPie from "venders/Nivo/NivoRadial";

const AuthLogin = ()=>{

    const AUTH = useContext_AUTH_FULL();
    const Pushhistory = useHistory();
    const RandomInt=()=>{
        return ((Math.random() * 100) + 1).toFixed(2);
    }

    const [SELETCED, setSELETCED] = useState([
            { 'name':'Same Building', 'Appearances':RandomInt()},
            { 'name':'CBD','Appearances':RandomInt()},
            { 'name':'Inner City','Appearances':RandomInt()},
            { 'name':'Metro','Appearances':RandomInt()},
            { 'name':'Outer Metro','Appearances':RandomInt()},
            { 'name':'Regional','Appearances':RandomInt()},
        ])
 
    //const SELETCED=[{ name:'inScope', Appearances:100},{ name:'Out of Scope',Appearances:200}]
    useEffect(()=>{ if(AUTH.jwt !== false){Pushhistory.push("/auth");}},[AUTH]);

    

    useEffect(()=>{
        setInterval(function(){ 
            //console.log(Math.floor((Math.random() * 100) + 1)); 

            setSELETCED([{ 'name':'Same Building', 'Appearances':RandomInt()},
            { 'name':'CBD','Appearances':RandomInt()},
            { 'name':'Inner City','Appearances':RandomInt()},
            { 'name':'Metro','Appearances':RandomInt()},
            { 'name':'Outer Metro','Appearances':RandomInt()},
            { 'name':'Regional','Appearances':RandomInt()}])
            

        }, 3000);
    },[])

    return(
        <div className="LoginForm">
            <div className="left">
               <div></div>
                <div className="LoginChart">
                    <AlogoBlue />
                    <h1>AnalytiQ</h1>
                    <div style={{height: 300, width:'50%'}}>
                        <NivoPie data={SELETCED} id={`name`} value={'Appearances'} />
                    </div>
                </div>
                <div className="productOf">
                   
                    <JLLMain />
                  
                    <p>Powered by Intact AnalytiQ</p>
                    
                    
                   
                </div>
                
            </div>
            <div className="right">
                <LoginForm />
                <Disclaimer />
             </div>
        </div> 
    )
}

export default AuthLogin;


const Disclaimer = ()=>{
    return(
          <div className="disclaimer">
              <p>Please wait whilst we fire up the Dyno's</p>
              <p>Build :  Dolores Beta 0.1</p>
          </div>
    )
}