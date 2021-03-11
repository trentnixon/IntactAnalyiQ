
// Private Functions
import store from "../store/index"
import axios from 'axios';
import { P } from "Pages/Auth/Components/Type";

export const StoreCompareItem = (scan,i)=>{
    const UserSelected = store.getState().COMPARE.CompareData.UserSelected;
    UserSelected[i] = scan
    //console.log(scan,i, UserSelected)
    store.dispatch({ type:'STOREUSERSELECTED', payload:UserSelected});
}



export const ConfirmCompare = (bool)=>{
    store.dispatch({ type:'COMPAREPROCESSING', payload:true}); 
   
    const UserSelected = store.getState().COMPARE.CompareData.UserSelected;
   

    UserSelected.map((models,i)=>{
        //console.log(i)
        if(i === 0){ store.dispatch({ type:'STORESELECTEDMODELMETA', payload:models}) }
        FetchCompareModel(models.id, i, UserSelected.length) 
    })
}

//store.dispatch({ type:'STORESELECTEDMODEL', payload:result.data}); 
//store.dispatch({ type:'STORESELECTEDMODELMETA', payload:scan}); 

export const ResetCompare = ()=>{

    store.dispatch({ type:'COMPARESTATUS', payload:false}); 
    store.dispatch({ type:'COMPAREPROCESSING', payload:false}); 
    store.dispatch({ type:'STOREUSERSELECTED', payload:[]});
    store.dispatch({ type:'STOREMODELS', payload:[]});
}

 
export const FetchCompareModel = (scanID, int, total)=>{

    const AWSURL=' https://intactanalytiq.s3-ap-southeast-2.amazonaws.com/';
   
    // headers: axiosHeader
   axios({ url: AWSURL+scanID+'.json', method: 'get'})
    .then((result) => { 
    

            const FetchedModels = store.getState().COMPARE.CompareData.FetchedModels;

            FetchedModels[int] = result.data
            if(int === 0){ store.dispatch({ type:'STORESELECTEDMODEL', payload:result.data}) }
            store.dispatch({ type:'STOREMODELS', payload:FetchedModels}); 

            // Check Data State
            if(FetchedModels.length === total)
                SetState()

            }).catch(function (thrown) {
                    if (axios.isCancel(thrown)) { console.log('Request canceled', thrown.message);
                    } else { console.log("ERROR", thrown);}
            });
}

const SetState = ()=>{
    const FetchedModels = store.getState().COMPARE.CompareData.FetchedModels;
 
    if(FetchedModels.includes(undefined) === false){
        store.dispatch({ type:'COMPAREPROCESSING', payload:false}); 
        store.dispatch({ type:'COMPARESTATUS', payload:true}); 
    }
}


// Use this if the user has selected a model in Storage
export const SelectSingleScanResult = (ModelMeta, Model)=>{
    store.dispatch({ type:'STORESELECTEDMODEL', payload:Model}); 
    store.dispatch({ type:'STORESELECTEDMODELMETA', payload:ModelMeta});
}