const InitialState ={
    
    UserData:{
        Customers:false,
        tradeAllocationRatio:false,
        tradetypes:false
    },
    IntegrityData:{
        sites:null, 
    },

    DataError:false
    /*
    sites:null,
    Customers:null,
    Countries:null,
    States:null,
    Regions:null,
    JobType:null,
    tradeType:null,
    industryType:null,
    ratioModel:null,
     */
}
 

const STRAPI = (state=InitialState, action) =>{ 
    // eslint-disable-next-line 
    switch(action.type){

         // UI State
         case "STORESITES":{
            return {...state, sites :action.payload}
                        // eslint-disable-next-line 
            break
            }

        case "DATAFETCHFAIL":{
                return {...state, DataError:action.payload}
                            // eslint-disable-next-line 
                break
                }
               
         case "STORECUSTOMERS":{
            return {...state, UserData:{...state.UserData, Customers :action.payload} }
                // eslint-disable-next-line 
            break
            }
        case "STORETRADEALLOCATION":{
                return {...state, UserData:{...state.UserData, tradeAllocationRatio :action.payload} }
                    // eslint-disable-next-line 
                break
                }
        case "STORETRADETYPES":{ 
                    return {...state, UserData:{...state.UserData, tradetypes :action.payload} }
                        // eslint-disable-next-line 
                    break
                    }
                
         case "STORESTATES":{
            return {...state, States :action.payload}
                // eslint-disable-next-line 
            break
            }
        case "STORECOUNTRIES":{
            return {...state, Countries :action.payload}
                    // eslint-disable-next-line 
            break
            }
         case "STOREREGIONS":{
            return {...state, Regions :action.payload}
                        // eslint-disable-next-line 
            break
            }
        case "STOREJOBTYPE":{
                return {...state, JobType :action.payload}
                            // eslint-disable-next-line 
                break
                }
        case "STORETRADETYPE":{
                return {...state, tradeType :action.payload}
                                // eslint-disable-next-line 
                break
            }
        case "STOREINDUSTRYTYPE":{
                return {...state, industryType :action.payload}
                                // eslint-disable-next-line 
                break
            }
        case "STORERATIOMODELS":{
                return {...state, ratioModel :action.payload}
                                // eslint-disable-next-line 
                break
            }
             
            

    }
    return state;
}
export default STRAPI;