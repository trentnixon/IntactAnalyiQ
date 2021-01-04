const InitialState ={
    active:false,
    LocationFilter:{
        GridSpacing:.5,
        Area:.5,
        SearchRadius:.5,
        minSites:2,
        MinWorkOrder:0,
        MaxOrderOrders:10000
    },
    Results:[],
    ResultsVisibleAll:true
}
 
const RegionScan = (state=InitialState, action) =>{ 
    // eslint-disable-next-line 
    switch(action.type){

         // UI State
         case "SCANSTATE":{
            return {...state, active :action.payload}
                // eslint-disable-next-line 
            break
            }
         
         
         case "STORERESULTS":{
            return {...state, Results :action.payload}
                // eslint-disable-next-line 
            break
            }
     
        
        case "STORERESULTSVISIBLE":{
                return {...state, ResultsVisibleAll:action.payload}
                    // eslint-disable-next-line 
                break
                }


// Filter Reducer Options
case "CHANGERADIUS":{
    return {...state, LocationFilter:{...state.LocationFilter, SearchRadius:action.payload}}
        // eslint-disable-next-line 
    break
    }
case "CHANGEGRIDSPACING":{
        return {...state, LocationFilter:{...state.LocationFilter, GridSpacing:action.payload}}
            // eslint-disable-next-line 
        break
        }
case "CHANGEMINSITES":{
    return {...state, LocationFilter:{...state.LocationFilter, minSites:action.payload}}
        // eslint-disable-next-line 
    break
    }
case "CHANGEMINWORKORDERS":{
return {...state, LocationFilter:{...state.LocationFilter, MinWorkOrder:action.payload}}
    // eslint-disable-next-line 
break
}
case "CHANGEMAXWORKORDERS":{
    return {...state, LocationFilter:{...state.LocationFilter, MaxOrderOrders:action.payload}}
        // eslint-disable-next-line 
    break
    }
         
    }
    return state;
}
export default RegionScan;