const InitialState ={
   user:false,
   jwt:false,
   process:false,
   error:false,
   ScanHistory:[],
   RefreshScanHistory:false
} 
 

const AUTH = (state=InitialState, action) =>{ 
    // eslint-disable-next-line 
    switch(action.type){

         // UI State
         case "AUTHUSERJWT":{
            return {...state, jwt :action.payload}
                // eslint-disable-next-line 
            break
            }
        case "AUTHUSER":{
                return {...state, user :action.payload}
                    // eslint-disable-next-line 
                break
                }  
        case "PROCESSAUTH":{
                    return {...state, process :action.payload}
                        // eslint-disable-next-line 
                    break
        }  
        case "PROCESSAUTHERROR":{
            return {...state, error :action.payload}
                // eslint-disable-next-line 
            break
        }  
        
        case "AUTHSTORESCANHISTORY":{
            return {...state, ScanHistory :action.payload}
                // eslint-disable-next-line 
            break
        }  
        case "REFRESHSCANHISTORY":{
            return {...state, RefreshScanHistory :action.payload}
                // eslint-disable-next-line 
            break
        }  

    }
    return state;
}
export default AUTH;