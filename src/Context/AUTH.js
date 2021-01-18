import React ,  { createContext, useContext, useMemo }from 'react';
import { useSelector } from "react-redux";

/*

Reducer State


*/
// Create Draft Context for provider

export const Context_AUTH_FULL = createContext()

// Custom Hooks

export const useContext_AUTH_FULL = ()=>{
    return useContext(Context_AUTH_FULL)
}


 
export const AUTHContextProvider = ({children})=>{
    const AUTH = useSelector(state => state.AUTH );

    useMemo(()=>{  },[AUTH]) 

    return(
            <Context_AUTH_FULL.Provider value={AUTH}>
                {children}            
            </Context_AUTH_FULL.Provider>     
    )
}