import React ,  { createContext, useContext, useMemo }from 'react';
import { useSelector } from "react-redux";

/*

Reducer State
    Full
    Countries

*/
// Create Draft Context for provider

export const Context_UX_FULL = createContext()

// Custom Hooks

export const useContext_UX_FULL = ()=>{
    return useContext(Context_UX_FULL)
}


 
export const UXContextProvider = ({children})=>{
        const UX = useSelector(state => state.UX );

    useMemo(()=>{  console.log("Context STRAPI ",  UX); },[UX]) 

    return(
            <Context_UX_FULL.Provider value={UX}>
                {children}            
            </Context_UX_FULL.Provider>     
    )
}