import React ,  { createContext, useContext, useMemo }from 'react';
import { useSelector } from "react-redux";

/*

Reducer State
    Full
    Countries

*/
// Create Draft Context for provider

export const Context_STRAPI_FULL = createContext()
export const Context_STRAPI_Countries = createContext()
export const Context_STRAPI_Customers = createContext()
export const Context_STRAPI_Regions = createContext()
export const Context_STRAPI_States = createContext()



// Custom Hooks

export const useContext_STRAPI_FULL = ()=>{
    return useContext(Context_STRAPI_FULL)
}

export const useContext_STRAPI_Countries = ()=>{
    return useContext(Context_STRAPI_Countries)
}

export const useContext_STRAPI_Customers = ()=>{
    return useContext(Context_STRAPI_Customers)
}

export const useContext_STRAPI_Regions = ()=>{
    return useContext(Context_STRAPI_Regions)
}

export const useContext_STRAPI_States = ()=>{
    return useContext(Context_STRAPI_States)
}

 
export const STRAPIContextProvider = ({children})=>{
    const STRAPI = useSelector(state => state.STRAPI );
    //const UX = useSelector(state => state.UX );

    useMemo(()=>{  console.log("Context STRAPI ",  STRAPI); },[STRAPI]) 

    return(
            <Context_STRAPI_FULL.Provider value={STRAPI}>
                <Context_STRAPI_Countries.Provider value={STRAPI.Countries}>
                    <Context_STRAPI_Customers.Provider value={STRAPI.UserData.Customers}>
                        <Context_STRAPI_Regions.Provider value={STRAPI.Regions}>
                            <Context_STRAPI_States.Provider value={STRAPI.States}>
                                {children}
                            </Context_STRAPI_States.Provider>
                        </Context_STRAPI_Regions.Provider>
                    </Context_STRAPI_Customers.Provider >
                </Context_STRAPI_Countries.Provider>
            </Context_STRAPI_FULL.Provider>     
    )
}