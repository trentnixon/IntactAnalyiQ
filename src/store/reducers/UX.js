const InitialState ={
    STRAPIRECEIVED:false,
   
    SelectedArea:null,
  
    AreaSelectFilter:{ 
        ByResourceType:false,
        ByClusterType:false,
        ByClient:false, 
        ByModel:false,
        ByPolygon:false,
        ByMarkerType:'Show All',
        ByColorScheme:'Cluster'
    },

    MapParameters:{
        LatLngBoundaries:{
            lat: -25.274399,
            lng: 133.775131
        },
        BoundaryCenterPoint:null,
        zoom:4,
        Location:"Australia",
    },
    ClusterParameters:{
        SelectedCluster:false,
        SelectedLocation:false,
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
        case "SETMAPCLUSTERTYPE":{
                return {...state, AreaSelectFilter:{...state.AreaSelectFilter, ByClusterType:action.payload}}
                                // eslint-disable-next-line 
                break
            }
        case "SETMAPRESOURCETYPE":{
            return {...state, AreaSelectFilter:{...state.AreaSelectFilter, ByResourceType:action.payload}}
                            // eslint-disable-next-line 
            break
        }
        case "SETFILTERCLIENT":{
            return {...state, AreaSelectFilter:{...state.AreaSelectFilter, ByClient:action.payload}}
                            // eslint-disable-next-line 
            break
        }     

        case "SETFILTERMODEL":{
            return {...state, AreaSelectFilter:{...state.AreaSelectFilter, ByModel:action.payload}}
                            // eslint-disable-next-line 
            break
        }  
        case "SETFILTERPOLYGON":{
            return {...state, AreaSelectFilter:{...state.AreaSelectFilter, ByPolygon:action.payload}}
                            // eslint-disable-next-line 
            break
        }
        case "SETFILTERMARKERTYPE":{
            return {...state, AreaSelectFilter:{...state.AreaSelectFilter, ByMarkerType:action.payload}}
                            // eslint-disable-next-line 
            break
        }   

        case "SETFILTERCOLORSCHEME":{
            return {...state, AreaSelectFilter:{...state.AreaSelectFilter, ByColorScheme:action.payload}}
                            // eslint-disable-next-line 
            break
        }   
        
        
        // Selected CLuster
        case "SETSELECTEDCLUSTER":{
            return {...state, ClusterParameters:{...state.ClusterParameters, SelectedCluster:action.payload}}
                            // eslint-disable-next-line 
            break
        }  
        case "SETSELECTEDLOCATION":{
            return {...state, ClusterParameters:{...state.ClusterParameters, SelectedLocation:action.payload}}
                            // eslint-disable-next-line 
            break
        }   

    }
    return state;
}
export default UX;