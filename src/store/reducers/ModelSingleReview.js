const InitialState ={
    ModelReviewReady:false,
    CLUSTEROCCURANCES:[]
}
 
const RegionScan = (state=InitialState, action) =>{ 
    // eslint-disable-next-line 
    switch(action.type){

    // ModelReviewReady 
    case "MODELREVIEWREADY":{
        return {...state, ModelReviewReady:action.payload}
            // eslint-disable-next-line 
        break
        }
   

        // Locations
        case "STORE_CLUSTEROCCURANCES":{
            return {...state, CLUSTEROCCURANCES:action.payload}
                // eslint-disable-next-line 
            break
            }



        // UserDataSets 
    case "CREATENEWDATASET":{
        return {...state, UserScanState:{...state.UserScanState, ScanOptionSelected:action.payload}}
            // eslint-disable-next-line 
        break
        }
 
            
   
         
    }
    return state;
}
export default RegionScan; 