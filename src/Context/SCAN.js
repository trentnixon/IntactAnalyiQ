import React ,  { createContext, useContext, useMemo }from 'react';
import { useSelector } from "react-redux";

/*

Reducer State


*/
// Create Draft Context for provider

export const Context_SCAN_FULL = createContext()

// Custom Hooks

export const useContext_SCAN_FULL = ()=>{
    return useContext(Context_SCAN_FULL)
}


 
export const SCANContextProvider = ({children})=>{
        const SCAN = useSelector(state => state.SCANSTATE );

    useMemo(()=>{  console.log("Context STRAPI ",  SCAN); },[SCAN]) 

    return(
            <Context_SCAN_FULL.Provider value={SCAN}>
                {children}            
            </Context_SCAN_FULL.Provider>     
    )
}