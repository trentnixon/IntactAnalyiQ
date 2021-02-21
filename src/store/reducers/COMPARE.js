const InitialState ={
    CompareStatus:false,
    CompareProcessing:false,
    CompareData:{
        UserSelected:[],
        FetchedModels:[]
    },
}
 

const COMPARE = (state=InitialState, action) =>{ 
    // eslint-disable-next-line 
    switch(action.type){

         // UI State

         case "COMPARESTATUS":{
            return {...state, CompareStatus :action.payload }
                // eslint-disable-next-line 
            break
            }
        case "COMPAREPROCESSING":{
            return {...state, CompareProcessing :action.payload }
                // eslint-disable-next-line 
            break
            }          
            
         case "STOREUSERSELECTED":{
            return {...state, CompareData:{...state.CompareData, UserSelected :action.payload} }
                // eslint-disable-next-line 
            break
            }
            case "STOREMODELS":{
                return {...state, CompareData:{...state.CompareData, FetchedModels :action.payload} }
                    // eslint-disable-next-line 
                break
                }

    }
    return state;
}
export default COMPARE;