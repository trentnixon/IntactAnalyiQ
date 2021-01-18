
// Private Functions
import store from "../store/index"
import axios from 'axios';



const useAPILOCATION = () => {
        //const APILOCATION = 'https://intact-analtyiq.herokuapp.com/'
        const APILOCATION = 'http://localhost:1337/'
        return APILOCATION
    }


export const CreateNewScan = (value)=>{  store.dispatch({ type:'CREATENEWDATASET', payload:value});} 


export const SetSelected = (value)=>{
    store.dispatch({ type:'USERDATASETSELECTEDDATABASE', payload:value});
    
}

export const StoreSelected_Single =(Data)=>{

    console.log(Data);
    store.dispatch({ type:'USERSTORESINGLEDATASET', payload:Data});
} 

export const BacktoScanOptions = ()=>{
        console.log("BACK");
        CreateNewScan(false)
        SetSelected(false)
        StoreSelected_Single([])    
}

export const BacktoAddItemsSingle = ()=>{
    console.log("BACK to Select");
    
    SetSelected(false)
   // StoreSelected_Single([]) 
}


export const ResetCreateNewModel = ()=>{

  
    store.dispatch({ type:'CREATENEWDATASET', payload:false})
    store.dispatch({ type:'USERDATASETSELECTEDDATABASE', payload:false})
    store.dispatch({ type:'USERSTORESINGLEDATASET', payload:[]})
    store.dispatch({ type:'USERSCANPROCESSING', payload:false})
}

export const FetchSelectedItems = async  (DATA, TITLE, DESCRIPTION)=>{

    let IDStr=[];
    DATA.map((customer,i)=>{
            IDStr.push(customer.id)
    })

    const ENDPOINT=useAPILOCATION()+'sites/scan'
    const JWTToken = store.getState().AUTH.jwt;
    const AuthUSer = store.getState().AUTH.user
    const axiosHeader = {Authorization: "Bearer " + JWTToken}

    
    

    console.log("Items sent to Strapi ", IDStr.length)
    console.log(AuthUSer.id,  TITLE, DESCRIPTION)
    const ScanName=TITLE
    const ScanDescription=DESCRIPTION
    
    
    store.dispatch({ type:'USERSCANPROCESSING', payload:true}); 

    //await axios.get(ENDPOINT+IDStr.toString()) 

   await axios({ url: ENDPOINT+'/'+ScanName+'/'+ScanDescription+'/'+AuthUSer.id+'/'+IDStr.toString(), method: 'get', headers: axiosHeader})
        .then(function (res) {
            console.log("Create Model Return Value from Server", res.data);
            
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
            // always executed
        });
}