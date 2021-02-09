const InitialState ={
    active:false,

    SelectedModelUI:{
        active:false,
        processing:false,
        activeID:null
    },
    SelectedModel:null,
    SelectedModelMeta:null,
    UserScanState:{
        ScanOptionSelected:false,
        SetSelectedDatabase:false,
        processing:false,
        UserScanSingleDataSets:[],
        UserWorkingDataSet_Single:[],
    },
}
 
const MODEL = (state=InitialState, action) =>{ 
    // eslint-disable-next-line 
    switch(action.type){

    // UserDataSets 
    case "CREATENEWDATASET":{
        return {...state, UserScanState:{...state.UserScanState, ScanOptionSelected:action.payload}}
            // eslint-disable-next-line 
        break
        }
    case "USERDATASETSELECTEDDATABASE":{
         return {...state, UserScanState:{...state.UserScanState, SetSelectedDatabase:action.payload}}
                // eslint-disable-next-line 
        break
        }   

    case "USERSTORESINGLEDATASET":{
            return {...state, UserScanState:{...state.UserScanState, UserScanSingleDataSets:action.payload}}
                   // eslint-disable-next-line 
           break
           }   
        
    case "USERSCANPROCESSING":{
    return {...state, UserScanState:{...state.UserScanState, processing:action.payload}}
            // eslint-disable-next-line 
    break
        } 

           



    // MARKER Based Scan OPtions

     // Store Selected Model
        
     case "STORESELECTEDMODEL":{
        return {...state, SelectedModel:action.payload}
            // eslint-disable-next-line 
        break
        }

        case "STORESELECTEDMODELMETA":{
            return {...state, SelectedModelMeta:action.payload}
                // eslint-disable-next-line 
            break
            }
                    


        // Store Selected Change to teh UI
        
        case "STORESELECTEDUI":{
            return {...state, SelectedModelUI:action.payload}
                // eslint-disable-next-line 
            break
            }




    case "STOREMARKERRESULTS":{
        return {...state, MarkerScanResults:action.payload}
            // eslint-disable-next-line 
        break
        }
    case "STOREMARKERCENTERPOINTS":{
        return {...state, MarkerScanCenterPoints:action.payload}
            // eslint-disable-next-line 
        break
        }
    case "STORERESIDUALMARKERS":{
            return {...state, MarkerScanResidual:action.payload}
                // eslint-disable-next-line 
            break
            }
        case "STORENOLONGLAT":{
            return {...state, NoLongLat:action.payload}
                    // eslint-disable-next-line 
            break
        }
            
    }
    return state;
}
export default MODEL;