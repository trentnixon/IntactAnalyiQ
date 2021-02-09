import React, { useEffect } from 'react'
import {useContext_UX_FULL} from "Context/UX";
import {LogoMainWhite} from "../../../Assets/logo"
import { useHistory, withRouter } from "react-router-dom";
const Loading=()=>{
    const UX = useContext_UX_FULL();
    const Pushhistory = useHistory();
    useEffect(()=>{
        //console.log(UX)
        if(UX.STRAPIRECEIVED){ Pushhistory.push("/demo");}
    },[UX])
    return(
        <div className="App">
            <div className="LoadThis">
                
                <LoadingCopy />
                <div className="loader">
                <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>
                <LogoMainWhite />
              <Disclaimer />
            </div>
      
        </div>
    )
}

export default Loading;



const LoadingCopy=()=>{
    return(
      <div>
           <h1>Intact AnalytiQ</h1>
            <h2>Fetching Data</h2>
      </div>
    )
  }

  const Disclaimer = ()=>{
      return(
            <div className="disclaimer">
                <p>This is a prototype build of Intact Analyiq alpha v0.1 </p>
                <p>Please wait whilst we fire up the Dyno's</p>
            </div>
      )
  }