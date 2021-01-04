
// Private Functions
import store from "../store/index"
import axios from 'axios';
/*
export function LoginSequence(arr){
    let State = arr.map((Value,i)=>{
       store.dispatch({ type:Value.Type, payload:Value.Value });
       return true;
    })
    return State;
} 
 */

export function LoadPrototype(){


    this.Fetch = ()=>{
            console.log("Prep App");
            const API='https://intact-analtyiq.herokuapp.com/'
    
            const FetchOrder=[
                    axios.get(`${API}countries?_limit=-1`),
                    axios.get(`${API}states?_limit=-1`),
                    axios.get(`${API}regions?_limit=-1`),
                    axios.get(`${API}customers?_limit=-1`),
                    axios.get(`${API}job-types?_limit=-1`),
                    axios.get(`${API}trade-types?_limit=-1`),
                    axios.get(`${API}industry-types?_limit=-1`),
                    axios.get(`${API}ratio-models`)
                    
                ]
//
            axios.all(FetchOrder)
                        .then(axios.spread(function (countries, states, regions, customers,jobtype, tradeType, industryType, ratiomodels) {
                                // Both requests are now complete
                            
                                store.dispatch({ type:'STORECUSTOMERS', payload:customers.data});
                                store.dispatch({ type:'STORECOUNTRIES', payload:countries.data});
                                store.dispatch({ type:'STORESTATES', payload:states.data});
                                store.dispatch({ type:'STOREREGIONS', payload:regions.data});
                                store.dispatch({ type:'STOREJOBTYPE', payload:jobtype.data});
                                store.dispatch({ type:'STORETRADETYPE', payload:tradeType.data});
                                store.dispatch({ type:'STOREINDUSTRYTYPE', payload:industryType.data});
                                store.dispatch({ type:'STOREINDUSTRYTYPE', payload:industryType.data});
                                store.dispatch({ type:'STORERATIOMODELS', payload:ratiomodels.data});
                                
                                
                            }))
                        .then(()=>{
                                console.log("DATA LOAD COMPLETE");
                                store.dispatch({ type:'DATARECEIVED', payload:true});
                        }).catch(error => {
                            console.log("Error fetching Data", error)
                        });;    
          
        }
} 