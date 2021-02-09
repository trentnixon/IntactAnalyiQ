import React ,  { createContext, useContext, useMemo }from 'react';
import { useSelector } from "react-redux";

/*

Reducer State

*/
// Create Draft Context for provider

export const Context_SINGLE_FULL = createContext()

// Custom Hooks

export const useContext_SINGLE_FULL = ()=>{
    return useContext(Context_SINGLE_FULL)
}


 
export const SINGLEContextProvider = ({children})=>{
    const SINGLE = useSelector(state => state.SINGLE );

    useMemo(()=>{  },[SINGLE]) 

    return(
            <Context_SINGLE_FULL.Provider value={SINGLE}>
                {children}            
            </Context_SINGLE_FULL.Provider>     
    )
}