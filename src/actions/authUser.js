// Private Functions
import store from "../store/index"
import axios from 'axios';




// lazy testing only Fix this!

const useAPILOCATION = () => {
        //const APILOCATION = 'https://intact-analtyiq.herokuapp.com/'
        const APILOCATION = 'http://localhost:1337/'
        return APILOCATION
}


export const StrapiAuth = async (u,p)=>{
        store.dispatch({ type:'PROCESSAUTH', payload:true});
   
        await axios.post(useAPILOCATION()+'auth/local', {
        identifier: u,
        password:p,
        }).then((res)=>{
                console.log(res.data.jwt);
                console.log(res.data.user)

                store.dispatch({ type:'PROCESSAUTH', payload:false});
                store.dispatch({ type:'AUTHUSERJWT', payload:res.data.jwt});
                store.dispatch({ type:'AUTHUSER', payload:res.data.user});

                // TODO
                // for dev only, change this for production
                localStorage.setItem('jwt', res.data.jwt);
                localStorage.setItem('jwtid', res.data.user.id);


        }).catch(function (thrown) {
                if (axios.isCancel(thrown)) {
                  console.log('Request canceled', thrown.message);
                } else {
                  // handle error
                  console.log("ERROR");
                  store.dispatch({ type:'PROCESSAUTH', payload:false});
                  store.dispatch({ type:'PROCESSAUTHERROR', payload:true});
                }
        });
}


export const JWT=()=>{
        
        let JWT = localStorage.getItem('jwt');
        let JWTID = localStorage.getItem('jwtid');
        console.log(JWT);
        if(JWT !== null){
                store.dispatch({ type:'AUTHUSERJWT', payload:JWT});
        }
        if(JWTID !== null){
                store.dispatch({ type:'AUTHUSER', payload:{id:JWTID} });
        }
        
}



/* ************************************************************************* */
// Scan Related functions
export const FetchPreviousScans = ()=>{
        
        const axiosHeader = {Authorization: "Bearer " + store.getState().AUTH.jwt}
        const APIFETCH = useAPILOCATION()+'scan-histories?UserID='+store.getState().AUTH.user.id+'&_sort=createdAt:DESC'
        
        // Tell UI whats going on;
        store.dispatch({ type:'REFRESHSCANHISTORY', payload:true});
        
        // Send API Request
        axios({ url: APIFETCH, method: 'get', headers: axiosHeader})
        .then((result) => { 

                store.dispatch({ type:'AUTHSTORESCANHISTORY', payload:result.data});
                store.dispatch({ type:'REFRESHSCANHISTORY', payload:false});
                }).catch(function (thrown) {
                        store.dispatch({ type:'REFRESHSCANHISTORY', payload:false});
                        if (axios.isCancel(thrown)) { console.log('Request canceled', thrown.message);
                        } else { console.log("ERROR", thrown);}
                });
}




export const FetchSingleScanResult = (scanID, scan)=>{

        store.dispatch({ type:'STORESELECTEDUI', payload:{active:false,processing:true,activeID:scanID} }); 


        console.log("scanID", scanID)
        const AWSURL=' https://intactanalytiq.s3-ap-southeast-2.amazonaws.com/';
       // 6002d5ece940b655642d22df.json
       // headers: axiosHeader
       axios({ url: AWSURL+scanID+'.json', method: 'get'})
        .then((result) => { 
        
                console.log(result.data);
                //result.data.SCANSTATE
                const UICHANGE={active:true,processing:false, activeID:scanID}   
                store.dispatch({ type:'STORESELECTEDMODEL', payload:result.data}); 
                store.dispatch({ type:'STORESELECTEDMODELMETA', payload:scan}); 
                
                store.dispatch({ type:'STORESELECTEDUI', payload:UICHANGE}); 
                console.log(scan)
                }).catch(function (thrown) {
                        if (axios.isCancel(thrown)) { console.log('Request canceled', thrown.message);
                        } else { console.log("ERROR", thrown);}
                });
}




const FetchAPI = (Route, TYPE)=>{
        const APIFETCH =useAPILOCATION()+Route
        const JWTToken = store.getState().AUTH.jwt;
        //console.log(JWTToken)
        const axiosHeader = {Authorization: "Bearer " + JWTToken}

        axios({ url: APIFETCH, method: 'get', headers: axiosHeader})
        .then((result) => { 
        
                console.log(result);
                store.dispatch({ type:TYPE, payload:result.data});

                }).catch(function (thrown) {
                        if (axios.isCancel(thrown)) { console.log('Request canceled', thrown.message);
                        } else { console.log("ERROR", thrown);}
                });
}

export const FetchDataIntegrity=()=>{
        // list out the items needed to fetch
        // do a look up to see if these items are already in the reducer
        GetCustomers();
        GetTradeAllocations()
        GetTradeTypes()
        FetchPreviousScans()
}


const GetCustomers=()=>{
        console.log("GetCustomers")
        if(store.getState().STRAPI.UserData.Customers === false)
                FetchAPI('customers/intact', 'STORECUSTOMERS')        
}

const GetSites=()=>{
        console.log("GetSites")
        if(store.getState().STRAPI.sites === false)
                FetchAPI('sites/intact', 'STORESITES')        
}

const GetTradeTypes=()=>{
        console.log("GetTradeTypes")
        if(store.getState().STRAPI.UserData.tradetypes === false)
                FetchAPI('trade-types', 'STORETRADETYPES')        
}

const GetTradeAllocations=()=>{
        console.log("GetTradeAllocations")
        if(store.getState().STRAPI.UserData.tradeAllocationRatio === false)
                FetchAPI('trade-allocation-ratios', 'STORETRADEALLOCATION')        
}

