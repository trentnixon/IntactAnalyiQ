
// Private Functions
import store from "../store/index"
import axios from 'axios';

export const StoreCompareItem = (scan,i)=>{
    const UserSelected = store.getState().COMPARE.CompareData.UserSelected;
    UserSelected[i] = scan
    console.log(scan,i, UserSelected)
    store.dispatch({ type:'STOREUSERSELECTED', payload:UserSelected});
}

export const ConfirmCompare = (bool)=>{
    store.dispatch({ type:'COMPAREPROCESSING', payload:true}); 

    const UserSelected = store.getState().COMPARE.CompareData.UserSelected;
    UserSelected.map((models,i)=>{
        FetchCompareModel(models.id, i, UserSelected.length)
    })

   
    store.dispatch({ type:'COMPARESTATUS', payload:true}); 
}


export const ResetCompare = ()=>{

    store.dispatch({ type:'COMPARESTATUS', payload:false}); 
    store.dispatch({ type:'COMPAREPROCESSING', payload:false}); 
    store.dispatch({ type:'STOREUSERSELECTED', payload:[]});
    store.dispatch({ type:'STOREMODELS', payload:[]});
}


export const FetchCompareModel = (scanID, int, total)=>{


    console.log("scanID", scanID, int)
    const AWSURL=' https://intactanalytiq.s3-ap-southeast-2.amazonaws.com/';
   // 6002d5ece940b655642d22df.json
   // headers: axiosHeader
   axios({ url: AWSURL+scanID+'.json', method: 'get'})
    .then((result) => { 
    
            console.log(result.data);
            //result.data.SCANSTATE
            const FetchedModels = store.getState().COMPARE.CompareData.FetchedModels;

            
            FetchedModels[int] = result.data
            store.dispatch({ type:'STOREMODELS', payload:FetchedModels}); 

            if(FetchedModels.length === total)
                store.dispatch({ type:'COMPAREPROCESSING', payload:false}); 
        
            }).catch(function (thrown) {
                    if (axios.isCancel(thrown)) { console.log('Request canceled', thrown.message);
                    } else { console.log("ERROR", thrown);}
            });
}