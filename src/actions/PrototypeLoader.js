
// Private Functions
import store from "../store/index"
import axios from 'axios';
import {useAPILOCATION} from "./authUser"


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

    console.log("LOAD ME")
    this.API=useAPILOCATION()+'graphql'

    this.Limit=100;

   

    this.RegionRequest= `
         {name id combined long lat  
          count{ WorkOrders JobTypes TradeTypes Customers} 
          sites{name id lat long delivery_model{name id} combined count{ WorkOrders JobTypes TradeTypes Customers} }
          cities{name id }
        }
      `
    this.LimitedRequest = `{ name id }`

    
    this.Store={customers:true,SmallFetch:true, sites:true}

    this.SmallReturnsQuery = `query{ 
        states {name id combined long lat count{ WorkOrders } }
        countries { country lat long combined count{ WorkOrders }}
      }`
    // THIS IS HORRIBLE FIX IT
    this.SitesRequest =`{ name lat long combined siteweighting count{ WorkOrders}  region_type{name} postcode{name} }`
    this.StoreSites=[]
    this.SitesQuery =` query { sites (start: 0) ${ this.SitesRequest} }`;

    this.StoreRegions=[]
    this.RegionQuery = `query {regions (start: 0) ${this.RegionRequest}}`

    this.StoreCustomers=[]
    this.CustomerQuery = `query { customers (start: 0) ${this.LimitedRequest}}`;

    
    this.GraphQL=(Query, CallBack)=>{
        axios({  url: this.API,  method: 'post', data: { query: Query} }).then((result) => { CallBack(result.data) });
    }


    this.Fetch = ()=>{
        console.log("Prep App");
        // Large Data Fetch
        
        // commented out for dev
        //this.GraphQL(this.SitesQuery, this.ProcessSites)
        //this.GraphQL(this.RegionQuery, this.ProcessRegions)

    //    this.GraphQL(this.CustomerQuery, this.ProcessCustomer)

        // Small Data Fetch
    //    this.GraphQL( this.SmallReturnsQuery, this.ProcessSmallReturns)
    this.processCheck()
    }



    /* *************************************************************************************************** */
    // Process Small
    /* *************************************************************************************************** */       
        this.ProcessSmallReturns = (Data)=>{
            //console.log(Data.data)

            store.dispatch({ type:'STORECOUNTRIES', payload:Data.data.countries});
            store.dispatch({ type:'STORETRADETYPE', payload:Data.data.tradeTypes});
            store.dispatch({ type:'STOREJOBTYPE', payload:Data.data.jobTypes});
            store.dispatch({ type:'STOREINDUSTRYTYPE', payload:Data.data.industryTypes});
            store.dispatch({ type:'STORERATIOMODELS', payload:Data.data.ratioModels});
            store.dispatch({ type:'STORESTATES', payload:Data.data.states});

            this.Store.SmallFetch=true;
            this.processCheck()
        }     

        
  /* *************************************************************************************************** */
    // Sites
     /* *************************************************************************************************** */
     this.ProcessSites=(Data)=>{ 
        this.StoreSites = [...this.StoreSites,...Data.data.sites];

      //  console.log("modulus", this.StoreSites.length % this.Limit);

        //console.log(this.StoreSites)

        if((this.StoreSites.length % this.Limit) === 0){  
            this.GraphQL(`query {sites (start: ${this.StoreSites.length}) ${this.SitesRequest}}`, this.ProcessSites)
        }
        else{ this.Store.sites=true}

        store.dispatch({ type:'STORESITES', payload:this.StoreSites});

        this.processCheck()
    }

  /* *************************************************************************************************** */
    // Regions
     /* *************************************************************************************************** */
     this.ProcessRegions=(Data)=>{ 
        this.StoreRegions = [...this.StoreRegions,...Data.data.regions];

           // console.log("modulus", this.StoreRegions.length % this.Limit)
        if((this.StoreRegions.length % this.Limit) === 0){  
            this.GraphQL(`query {regions (start: ${this.StoreRegions.length}) ${this.RegionRequest}}`, this.ProcessRegions)
        }
        else{ this.Store.Region=true}

        store.dispatch({ type:'STOREREGIONS', payload:this.StoreRegions});

        this.processCheck()
    }

  /* *************************************************************************************************** */
  // Customer
   /* *************************************************************************************************** */
   this.ProcessCustomer=(Data)=>{ 
    this.StoreCustomers = [...this.StoreCustomers,...Data.data.customers];

    if(this.StoreCustomers.length === this.Limit){  
        this.GraphQL(`query {customers (start: ${Data.data.customers.length}) ${this.LimitedRequest}}`, 
        this.ProcessCustomer)
    }
    else{ this.Store.customers=true}

    store.dispatch({ type:'STORECUSTOMERS', payload:this.StoreCustomers});

    this.processCheck()
    }


    /* Is Process Complete?  */
    this.processCheck=()=>{ 
        let Load = true
        Object.keys(this.Store).map((k,i)=>{
            if(!this.Store[k])
                Load=false
        })
        console.log("Load", Load)
            if(Load)
                store.dispatch({ type:'DATARECEIVED', payload:true});
            
    }



/*
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
        */
} 