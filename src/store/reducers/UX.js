const InitialState ={
    STRAPIRECEIVED:false,
    AreaSelectFilter:{country:null,state:null,region:null,city:null},
    SelectedArea:null,
    MapParameters:{
        LatLngBoundaries:null,
        BoundaryCenterPoint:null,
        zoom:null,
        markers:null,
        SetMap:false
    }
} 
 

const UX = (state=InitialState, action) =>{ 
    // eslint-disable-next-line 
    switch(action.type){

         // UI State
         case "DATARECEIVED":{
            return {...state, STRAPIRECEIVED :action.payload}
                // eslint-disable-next-line 
            break
            }
      
        case "AREAFILTER":{
            return {...state, AreaSelectFilter :action.payload}
                // eslint-disable-next-line 
            break
            }
        case "AREAFILTERCOUNTRY":{
            return {...state, AreaSelectFilter: {...state.AreaSelectFilter, country:action.payload }}
                    // eslint-disable-next-line 
                break
            }
        case "AREAFILTERSTATE":{
            return {...state, AreaSelectFilter: {...state.AreaSelectFilter, state:action.payload }}
                        // eslint-disable-next-line 
             break
            }       
        case "AREAFILTERREGION":{
                return {...state, AreaSelectFilter: {...state.AreaSelectFilter, region:action.payload }}
                            // eslint-disable-next-line 
                 break
                }                   
        case "STORESELECTEDAREA":{
            
                return {...state, SelectedArea:action.payload}
                                // eslint-disable-next-line 
                break
            }                

        // MAP DETAILS
        case "STOREMAPPARAMETERS":{
                return {...state, MapParameters:action.payload}
                                // eslint-disable-next-line 
                break
            }            

    }
    return state;
}
export default UX;