import React ,  { createContext, useContext, useMemo }from 'react';
import { useSelector } from "react-redux";

/*

Reducer State


*/
// Create Draft Context for provider

export const Context_COMMS_FULL = createContext()

// Custom Hooks

export const useContext_COMMS_FULL = ()=>{
    return useContext(Context_COMMS_FULL)
}

 
export const COMMSContextProvider = ({children})=>{
    const COMMS = useSelector(state => state.COMMS );

    useMemo(()=>{  },[COMMS]) 

    return(
            <Context_COMMS_FULL.Provider value={COMMS}>
                {children}            
            </Context_COMMS_FULL.Provider>     
    )
}