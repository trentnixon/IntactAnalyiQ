import React ,  { createContext, useContext, useMemo }from 'react';
import { useSelector } from "react-redux";

/*

Reducer State


*/
// Create Draft Context for provider

export const Context_COMPARE_FULL = createContext()

// Custom Hooks

export const useContext_COMPARE_FULL = ()=>{
    return useContext(Context_COMPARE_FULL)
}


 
export const COMPAREContextProvider = ({children})=>{
    const COMPARE = useSelector(state => state.COMPARE );

    useMemo(()=>{  },[COMPARE]) 

    return(
            <Context_COMPARE_FULL.Provider value={COMPARE}>
                {children}            
            </Context_COMPARE_FULL.Provider>     
    )
}