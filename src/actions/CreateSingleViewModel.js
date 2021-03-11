/* Action file for Single Model Review Functions */
/*
    THIS IS FOR PROTOTYPE AND LIMITED DEV TIME ONLY
    ALL OF THIS WILL NEED REFACTORING WHEN YOU HAVE TIME!!!
    
*/

import store from "../store/index"
import {GroupArrayByOccurances, HandleResourceFilter, numberWithCommas,colorArray, RegionColor,TradecolorArray} from "actions/HandleUX";
import {CostPerWorkOrder} from 'actions/CostsandPricings'
import {findIndex,sumBy,orderBy,groupBy,find, remove} from 'lodash';
import {findClientName} from "actions/ClusterAnalysis"

 export const fixNumber=(num)=>{
    try {
        if(num != undefined)
        return parseFloat(num.toFixed(2)) 
            return 0
      }
      catch(err) {
        console.log(err, num)
      }
}

/* ******************************** */
// FILTERS

    const RunFilter=(filter,ByType)=>{
        if(ByType != false){
            if(filter != ByType )
                return false
        }return true        
    }

/**/



/* ************************************************************************************************* */
// OBJ BUILDER
// FULL OBJECTS BROKEN DOWN BY A ROOT CATEGORY
// Naming
// OBJ_[ROOT]_CALCULATED_FILTER
/* ************************************************************************************************* */

/************************* */ 
// MAIN OBJ "CLUSTERS vs Trade"
/************************* */

// Filters=['ByClusterType','ByResourceType','ByClient']


/************************* */
// MAIN OBJ "Cluster vs Global"
// model.ClientGroupedBy
/************************* */

export const OBJ_CLUSTER_GLOBAL=()=>{
    /*
        Exports
            {
                Clients: ["5fe1751dab400d456889ac5e"]
                Resource: 98.73
                Sites: (30) []
                Sum: 100
                Work Orders: 9247
                name: "SameBuilding" 
            }
    */
    const UX = store.getState().UX
    const MODEL = store.getState().SCANSTATE
    
    let Clusters_ByClient=[];

    MODEL.SelectedModel.STOREMARKERCENTERPOINTS.map((model,i)=>{

            let Index = findIndex(Clusters_ByClient,{name:model.scanCategory})

            if(Index === -1){ Clusters_ByClient.push({name:model.scanCategory,  Appearances:0})}
            Index = findIndex(Clusters_ByClient,{name:model.scanCategory})
            

            Clusters_ByClient[Index].Appearances = Clusters_ByClient[Index].Appearances + 1;

            Object.keys(model.ClientGroupedBy).map((key,ii)=>{

                model.ClientGroupedBy[key].map((q,ii)=>{
                    /* Run 'ByResourceType' Filter ********************************** */       
                    if(!RunFilter(q.Trade ,UX.AreaSelectFilter.ByResourceType)) return false
                    /* ********************************** */ 
                    /* Run 'ByClient'  Filter********************************** */       
                        if(!RunFilter(q.Customer ,UX.AreaSelectFilter.ByClient)) return false
                    /* ********************************** */ 

                    if(Clusters_ByClient[Index][`Resource_Count_${q.Trade}`] === undefined){
                        Clusters_ByClient[Index][`Resource_Count_${q.Trade}`] = fixNumber(q.Ratio) 
                    }else{
                        Clusters_ByClient[Index][`Resource_Count_${q.Trade}`] =   (fixNumber(Clusters_ByClient[Index][`Resource_Count_${q.Trade}`]  +q.Ratio))
                    }

                    if(Clusters_ByClient[Index][`work_order_${q.Trade}`] === undefined){
                        Clusters_ByClient[Index][`work_order_${q.Trade}`] = fixNumber(q.WOS) 
                    }else{
                        Clusters_ByClient[Index][`work_order_${q.Trade}`] =   (fixNumber(Clusters_ByClient[Index][`work_order_${q.Trade}`]  +q.WOS))
                    }


                    if(Clusters_ByClient[Index][`Sum`] === undefined){ Clusters_ByClient[Index][`Sum`] = 1 }
                    else{ Clusters_ByClient[Index][`Sum`] =  Clusters_ByClient[Index][`Sum`] + 1 }

                    if(Clusters_ByClient[Index][`Resource`] === undefined){ Clusters_ByClient[Index][`Resource`] = fixNumber(q.Ratio) }
                    else{ Clusters_ByClient[Index][`Resource`] =  fixNumber(Clusters_ByClient[Index][`Resource`]) + fixNumber(q.Ratio) }

                    if(Clusters_ByClient[Index][`Work Orders`] === undefined){ Clusters_ByClient[Index][`Work Orders`] = q.WOS }
                    else{ Clusters_ByClient[Index][`Work Orders`] =  Clusters_ByClient[Index][`Work Orders`] + q.WOS }

                    if(Clusters_ByClient[Index][`Clients`] === undefined){ Clusters_ByClient[Index][`Clients`] = [] }
                    if(Clusters_ByClient[Index][`Clients`].indexOf(q.Customer)=== -1){ Clusters_ByClient[Index][`Clients`].push(q.Customer)}
                
                    if(Clusters_ByClient[Index][`Sites`] === undefined){ Clusters_ByClient[Index][`Sites`] = [] }
                    if(Clusters_ByClient[Index][`Sites`].indexOf(q.site)=== -1){ Clusters_ByClient[Index][`Sites`].push(q.site)}
                
                    if(Clusters_ByClient[Index][`Trade`] === undefined){ Clusters_ByClient[Index][`Trade`] = [] }
                    if(Clusters_ByClient[Index][`Trade`].indexOf(q.Trade)=== -1){ Clusters_ByClient[Index][`Trade`].push(q.Trade)}
                
                })
            })
    });

    return Clusters_ByClient    
}

/************************* */
// MAIN OBJ "SITES vs Global"
// model.SitesGroupedBy
/************************* */

export const OBJ_SITE_GLOBAL = ()=>{ 
    /*
        Exports
        {
            Center: [{…}]
            Client: ["5fe1751dab400d456889ac5e"]
            Cluster: ["SameBuilding"]
            Resources: 42.620000000000005
            Trade: (16) ["HandyMan", "HandyMan", "Electrician", "Plumber", "Specialized", "HandyMan", "Plumber", "Specialized", "Electrician", "HandyMan", "Plumber", "HandyMan", "Electrician", "Plumber", "HandyMan", "Specialized"]
            Work Orders: 3927
            name: "5fe173efab400d456889aa2b"
        }
    */
    const UX = store.getState().UX
    const MODEL = store.getState().SCANSTATE;

    let Temp=[];
    //console.log(MODEL.SelectedModel)
    MODEL.SelectedModel.STOREMARKERCENTERPOINTS.map((model,i)=>{
     
        //console.log(model)
        /* Run 'ByClusterType' Filter ********************************** */       
            if(!RunFilter(model.scanCategory,UX.AreaSelectFilter.ByClusterType)) return false
        /* ********************************** */ 
                Object.keys(model.SitesGroupedBy).map(function(key, index) {
                    model.SitesGroupedBy[key].map((c,ii)=>{
                       
                        //console.log(model.sites.length,  Object.keys(model.SitesGroupedBy).length, i)
                    
                        /* Run 'ByResourceType' Filter ********************************** */       
                            if(!RunFilter(c.Trade ,UX.AreaSelectFilter.ByResourceType)) return false
                        /* ********************************** */ 
                        /* Run 'ByClient'  Filter********************************** */       
                            if(!RunFilter(c.Customer ,UX.AreaSelectFilter.ByClient)) return false
                        /* ********************************** */ 
                        
                        let Index = findIndex(Temp,{name:c.site})
                        if(Index === -1){  
                            Temp.push({name:c.site}); 
                            Index = findIndex(Temp,{name:c.site});
                        }

                        if(Temp[Index][`Client`] === undefined){Temp[Index][`Client`] = [];}
                        if(Temp[Index][`Client`].indexOf(c.Customer) === -1){ Temp[Index][`Client`].push(c.Customer)}
                     
                        if(Temp[Index][`Trade`] === undefined){Temp[Index][`Trade`] = [];}
                        Temp[Index][`Trade`].push(c.Trade)

                        if(Temp[Index][`Resources`] === undefined){ Temp[Index][`Resources`] = fixNumber(c.Ratio) }
                        else{ Temp[Index][`Resources`] =  fixNumber(Temp[Index][`Resources`]) + fixNumber(c.Ratio) }

                        if(Temp[Index][`Work Orders`] === undefined){ Temp[Index][`Work Orders`] = c.WOS }
                        else{ Temp[Index][`Work Orders`] =  Temp[Index][`Work Orders`] + c.WOS } 

                        if(Temp[Index][`Cluster`] === undefined){Temp[Index][`Cluster`] = [];}
                        if(Temp[Index][`Cluster`].indexOf(model.scanCategory) === -1){  Temp[Index][`Cluster`].push(model.scanCategory)}
                       
                        if(Temp[Index][`Center`] === undefined){Temp[Index][`Center`] = [];}
                        if(Temp[Index][`Center`].indexOf(model.center) === -1){  Temp[Index][`Center`].push(model.center)}
                    
                    })
                })
    })
    return Temp;
}


/************************* */
// MAIN OBJ "Client vs Resources"
// model.ResourcesGroupedBy
/************************* */

// MAIN OBJ RESOURCES
export const OBJ_CLIENT_RESOURCES=()=>{

    /*
        Exports 
        {
            Electrician: 7.390000000000001
            HandyMan: 94.44
            Plumber: 10.28
            Specialized: 12.41
            Sum: 124.52
            Work Orders: 10778
            name: "C13693 Telstra Corporation Limited"
        }
    */
    // Get Filters 
    const UX = store.getState().UX
    const MODEL = store.getState().SCANSTATE

    let Resources_Clients=[]

  
    MODEL.SelectedModel.STOREMARKERCENTERPOINTS.map((model,i)=>{
        
        //console.log(model)
          /* ********************************** */       
        // Run Filter
        if(!RunFilter(model.name,UX.AreaSelectFilter.ByPolygon)) return false
        /* ********************************** */ 
        /* ********************************** */       
        // Run Filter
        if(!RunFilter(model.scanCategory,UX.AreaSelectFilter.ByClusterType)) return false
        /* ********************************** */ 
        
           
        // loop
        Object.keys(model.ResourcesGroupedBy).map(function(key, index) {

            // Run Loop
            model.ResourcesGroupedBy[key].map((q,ii)=>{
                let Index;
                //console.log(q)
           
            /* ********************************** */       
            // Run Filter
                if(!RunFilter(q.Trade,UX.AreaSelectFilter.ByResourceType)) return false
            /* ********************************** */ 
            

                //console.log(q)
                Index = findIndex(Resources_Clients,{name:findClientName(q.Customer)})
                if(Index === -1){ 
                    Resources_Clients.push({name:findClientName(q.Customer)})
                    Index = findIndex(Resources_Clients,{name:findClientName(q.Customer)})
                }

               
                if(Resources_Clients[Index][key] === undefined)
                {Resources_Clients[Index][key] = fixNumber(q.Ratio)}
                else{Resources_Clients[Index][key] = fixNumber(Resources_Clients[Index][key]) + fixNumber(q.Ratio)}
                        

                if(Resources_Clients[Index][`Sum`] === undefined)
                {Resources_Clients[Index][`Sum`] = fixNumber(q.Ratio) }
                else{Resources_Clients[Index][`Sum`] = fixNumber(Resources_Clients[Index][`Sum`]) + fixNumber(q.Ratio)} 

                if(Resources_Clients[Index][`Work Orders`] === undefined)
                {Resources_Clients[Index][`Work Orders`] = q.WOS }
                else{Resources_Clients[Index][`Work Orders`] = Resources_Clients[Index][`Work Orders`] + q.WOS} 
                    
            })
        });
    })
  
 
   return orderBy(Resources_Clients, ['name'], [])

}



/************************* */
// MAIN OBJ "Resources GLOBAL"

// model.ResourcesGroupedBy
/************************* */

// MAIN OBJ RESOURCES
export const OBJ_RESOURCES_GLOBAL=(Filters=['ByClusterType','ByResourceType','ByClient'])=>{

    /*
        Exports 
        {
            Clients: ["5fe1751dab400d456889ac5e"]
            Date: (4) ["03/2018", "05/2018", "06/2018", "04/2018"]
            Sites: (10) ["5fe173efab400d456889aa2b", "5fe17408ab400d456889aa5a", "5fe17409ab400d456889aa5b", "5fe17408ab400d456889aa59", "5fe1740fab400d456889aa66", "5fe17427ab400d456889aa94", "5fe173e8ab400d456889aa1a", "5fe17404ab400d456889aa52", "5fe173feab400d456889aa48", "5fe173fcab400d456889aa40"]
            Resources: 7.390000000000001
            Work Orders: 470
            name: "Electrician"
        } 
    */
    // Get Filters 
    const UX = store.getState().UX
    const MODEL = store.getState().SCANSTATE
    const COSTPERWORKORDER = CostPerWorkOrder()
    let Resources_Clients=[]

  
    MODEL.SelectedModel.STOREMARKERCENTERPOINTS.map((model,i)=>{
        //console.log(model)
        
        /* ********************************** */       
        // Run Filter
        if(!RunFilter(model.name,UX.AreaSelectFilter.ByPolygon)) return false
        /* ********************************** */ 

        /* ********************************** */       
        // Run Filter
        if(Filters.indexOf('ByClusterType') !== -1){
            if(!RunFilter(model.scanCategory,UX.AreaSelectFilter.ByClusterType)) return false
        }
        
        /* ********************************** */ 
        
           
        // loop
        Object.keys(model.ResourcesGroupedBy).map(function(key, index) {

            // Run Loop
            model.ResourcesGroupedBy[key].map((q,ii)=>{
                let Index;
          
           
            /* ********************************** */       
            // Run Filter
            if(Filters.indexOf('ByResourceType') !== -1){
                if(!RunFilter(q.Trade,UX.AreaSelectFilter.ByResourceType)) return false
            }
            /* ********************************** */ 
             /* ********************************** */       
            // Run Filter
            if(Filters.indexOf('ByClient') !== -1){
                if(!RunFilter(q.Customer ,UX.AreaSelectFilter.ByClient)) return false
                
            }
            /* ********************************** */ 
            

                //console.log(q)
                Index = findIndex(Resources_Clients,{name:q.Trade})
                if(Index === -1){ 
                    Resources_Clients.push({name:q.Trade})
                    Index = findIndex(Resources_Clients,{name:q.Trade})
                }
     
  
                if(Resources_Clients[Index][`Resources`] === undefined)
                {Resources_Clients[Index][`Resources`] = fixNumber(q.Ratio) }
                else{Resources_Clients[Index][`Resources`] = fixNumber(Resources_Clients[Index][`Resources`]) + fixNumber(q.Ratio)} 

                if(Resources_Clients[Index][`ResourceCost`] === undefined)
                {Resources_Clients[Index][`ResourceCost`] = fixNumber(q.Ratio) }
                else{Resources_Clients[Index][`ResourceCost`] = fixNumber(Resources_Clients[Index][`Resources`]*COSTPERWORKORDER)} 



                if(Resources_Clients[Index][`Work Orders`] === undefined)
                {Resources_Clients[Index][`Work Orders`] = fixNumber(q.WOS) }
                else{Resources_Clients[Index][`Work Orders`] = fixNumber(Resources_Clients[Index][`Work Orders`]) + fixNumber(q.WOS)} 
                
                if(Resources_Clients[Index][`Sites`] === undefined){Resources_Clients[Index][`Sites`] = [] }
                if(Resources_Clients[Index][`Sites`].indexOf(q.site) === -1){Resources_Clients[Index][`Sites`].push(q.site)}

                if(Resources_Clients[Index][`Clients`] === undefined){Resources_Clients[Index][`Clients`] = [] }
                if(Resources_Clients[Index][`Clients`].indexOf(q.Customer) === -1){Resources_Clients[Index][`Clients`].push(q.Customer)}
                
                if(Resources_Clients[Index][`Date`] === undefined){Resources_Clients[Index][`Date`] = [] }
                if(Resources_Clients[Index][`Date`].indexOf(q.Date) === -1){Resources_Clients[Index][`Date`].push(q.Date)}

                
            })
        });
    })
  
 
    //console.log(orderBy(Resources_Clients, ['name'], []))
   return orderBy(Resources_Clients, ['name'], [])

}


/************************* */
// MAIN OBJ "Client vs Global"

// model.ClientGroupedBy
/************************* */
 
// Main Client OBJ Creator
export const OBJ_CLIENT_GLOBAL_Filter =  ()=>{
    /*
        EXPORTS
        {
            Clusters: 185
            Resources: 124.52
            Sites: (83) [""]
            Total Sites: 113
            Work Orders: 10778
            name: "C13693 Telstra Corporation Limited"
        }
    */


    const UX = store.getState().UX
    const MODEL = store.getState().SCANSTATE;

    let Temp=[];
    let SiteCount=[];

    MODEL.SelectedModel.STOREMARKERCENTERPOINTS.map((model,i)=>{
        
        /* ********************************** */       
        // Run Filter
        if(!RunFilter(model.name,UX.AreaSelectFilter.ByPolygon)) return false

       //console.log(model)
        /* ********************************** */ 
        /* Run 'ByClusterType' Filter ********************************** */       
            if(!RunFilter(model.scanCategory,UX.AreaSelectFilter.ByClusterType)) return false
        /* ************************************************************* */ 

                Object.keys(model.ClientGroupedBy).map(function(key, index) {
                    
                    model.ClientGroupedBy[key].map((c,ii)=>{
                        //console.log(model.ClientGroupedBy[key])
                        //console.log(c)
                        /* Run 'ByResourceType' Filter ********************************** */       
                            if(!RunFilter(c.Trade ,UX.AreaSelectFilter.ByResourceType)) return false
                        /* ********************************** */ 
                        /* Run 'ByClient'  Filter********************************** */       
                           // if(!RunFilter(c.Customer ,UX.AreaSelectFilter.ByClient)) return false
                        /* ********************************** */ 
                        
                        let Index = findIndex(Temp,{name:findClientName(c.Customer)})
                        if(Index === -1){  
                            Temp.push({name:findClientName(c.Customer)}); 
                            Index = findIndex(Temp,{name:findClientName(c.Customer)});
                        }

                        if(Temp[Index][`Clusters`] === undefined){ Temp[Index][`Clusters`] = 1 }
                        else{ Temp[Index][`Clusters`] =  Temp[Index][`Clusters`] + 1 }

                        if(Temp[Index][`Resources`] === undefined){ Temp[Index][`Resources`] = fixNumber(c.Ratio) }
                        else{ Temp[Index][`Resources`] =  fixNumber(Temp[Index][`Resources`]) + fixNumber(c.Ratio) }

                        if(Temp[Index][`Work Orders`] === undefined){ Temp[Index][`Work Orders`] = c.WOS }
                        else{ Temp[Index][`Work Orders`] =  Temp[Index][`Work Orders`] + c.WOS }

                        if(Temp[Index]['Sites'] === undefined) { Temp[Index]['Sites']=[]; }
                        if(Temp[Index].Sites.indexOf(c.site) === -1){ Temp[Index]['Sites'].push(c.site)}
                        if(Temp[Index]['Total Sites'] === undefined) { Temp[Index]['Total Sites']=0; }
                        if(SiteCount.indexOf(c.site)=== -1){
                            SiteCount.push(c.site);
                            Temp[Index]['Total Sites'] = SiteCount.length
                        }
                    })
                })
    })

    return Temp;
}



export const OBJ_CENTERPOINTS=()=>{
    /*
        Exports
            {}
    */
    const UX = store.getState().UX
    const MODEL = store.getState().SCANSTATE
    let CenterPoints=[];

    const clientNum=(model)=>{
        let num=[]
        Object.keys(model.ClientGroupedBy).map(function(key, index) { num.push(index)})
        return num;
    } 

    const resourceQuotatotal = (model)=>{
        let total=[]
        model.map((quota,i)=>{
            total.push(quota.ResourceAllocation)
        })
        return total.reduce((a, b) => a + b, 0)
    }



    MODEL.SelectedModel.STOREMARKERCENTERPOINTS.map((model,i)=>{
            /* ********************************** */       
            // Run Filter
            if(!RunFilter(model.scanCategory ,UX.AreaSelectFilter.ByClusterType)) return false
            /* ********************************** */ 

  
            CenterPoints.push(
                    {
                        name:model.name,
                        type:model.scanCategory,
                        sites:model.StripedSites.length,
                        clients:clientNum(model).length,
                        resourceQuota:model.resourceQuota,
                        resourceQuotaTotal:resourceQuotatotal(model.resourceQuota),
                        model:model
                    })
    })

    return CenterPoints;

}
/* ************************************************************************************************* */
// END MAIN OBJ COLLECTIONS
/* ************************************************************************************************* */





/* ************************************************************************************************* */
// Google Maps
/* ************************************************************************************************* */


export const Location_HeatMap=()=>{
    // Simple Loop FUnction
    // This function loops locations for heat map

    // Get Filters 
    const UX = store.getState().UX
    const MODEL = store.getState().SCANSTATE
    let HeatMapLocations=[];

    MODEL.SelectedModel.STOREMARKERCENTERPOINTS.map((model,i)=>{
       
        /* ********************************** */       
            // Run Filter
            if(!RunFilter(model.scanCategory ,UX.AreaSelectFilter.ByClusterType)) return false
        /* ********************************** */ 

            model.sites.map((site,ii)=>{
                HeatMapLocations.push(new window.google.maps.LatLng(site.lat, site.long))
            })
    });

    return HeatMapLocations    
}

export const MapData_LocationHeatmap=()=>{
    return [Location_HeatMap(), Location_HeatMap().length]
 }



 
export const Resources_HeatMap=()=>{

   // Get Filters 
   const UX = store.getState().UX
   const MODEL = store.getState().SCANSTATE
   let HeatMapLocations=[];

   let Quota=[]
   MODEL.SelectedModel.STOREMARKERCENTERPOINTS.map((model,i)=>{
       
        /* ********************************** */       
        // Run Filter
        if(!RunFilter(model.name,UX.AreaSelectFilter.ByPolygon)) return false
        /* ********************************** */ 
       /* ********************************** */       
       // Run Filter
       if(!RunFilter(model.scanCategory ,UX.AreaSelectFilter.ByClusterType)) return false
       /* ********************************** */   
                   
       // Loop Quotas to find volume numbers 
       model.resourceQuota.map((quota,ii)=>{

           /* ********************************** */       
           // Run Filter
           if(!RunFilter(quota.Trade ,UX.AreaSelectFilter.ByResourceType)) return false
           /* ********************************** */ 
           
           Quota.push(quota.ResourceAllocation)
       })
      
       //loop over volume numbers to create HEAT!!!!
       // Math.ceil to round decimals up to 1 so they are counted
       let n=0
       while (n <= Math.ceil((Quota.reduce((a, b) => a + b, 0)))) {
           HeatMapLocations.push(new window.google.maps.LatLng(model.center.lat, model.center.lng))
           n++;
       } 
   })
   let ReduceNumber = Quota.reduce((a, b) => a + b, 0)

   return [HeatMapLocations, ReduceNumber]
}


export const COSTANALYSIS_Resources_HeatMap=()=>{

    // THI IS WRONG!!!
    // Get Filters 
    const UX = store.getState().UX
    const MODEL = store.getState().SCANSTATE
    const COSTPERWORKORDER = CostPerWorkOrder()
    let HeatMapLocations=[];
 
    let Quota=[]
    MODEL.SelectedModel.STOREMARKERCENTERPOINTS.map((model,i)=>{
        
         /* ********************************** */       
         // Run Filter
         if(!RunFilter(model.name,UX.AreaSelectFilter.ByPolygon)) return false
         /* ********************************** */ 
        /* ********************************** */       
        // Run Filter
        if(!RunFilter(model.scanCategory ,UX.AreaSelectFilter.ByClusterType)) return false
        /* ********************************** */   
                    
        // Loop Quotas to find volume numbers 
        model.resourceQuota.map((quota,ii)=>{
 
            /* ********************************** */       
            // Run Filter
            if(!RunFilter(quota.Trade ,UX.AreaSelectFilter.ByResourceType)) return false
            /* ********************************** */ 
            
           //console.log(quota.ResourceAllocation*COSTPERWORKORDER)
            Quota.push((quota.ResourceAllocation*COSTPERWORKORDER)/10000)
        })
       
        //loop over volume numbers to create HEAT!!!!
        // Math.ceil to round decimals up to 1 so they are counted
        let n=0

        
        while (n <= Math.ceil((Quota.reduce((a, b) => a + b, 0)))) {
            HeatMapLocations.push(new window.google.maps.LatLng(model.center.lat, model.center.lng))
            n++;
        } 
    })
    let ReduceNumber = Quota.reduce((a, b) => a + b, 0)
 
    return [HeatMapLocations, ReduceNumber]
 }

export const WorkOrder_HeatMap=()=>{

    // LOOK OVER THIS
    // POSSIBLY WRONG

   // Get Filters 
   const UX = store.getState().UX
   const MODEL = store.getState().SCANSTATE
   let HeatMapLocations=[];

   let Quota=[]
   
   MODEL.SelectedModel.STOREMARKERCENTERPOINTS.map((model,i)=>{
       
        /* ********************************** */       
        // Run Filter
        if(!RunFilter(model.name,UX.AreaSelectFilter.ByPolygon)) return false
        /* ********************************** */ 
       /* ********************************** */       
       // Run Filter
       if(!RunFilter(model.scanCategory ,UX.AreaSelectFilter.ByClusterType)) return false
       /* ********************************** */   
       //console.log(model)        
       // Loop Quotas to find volume numbers 
       let TotalWOs=[]
       Object.keys(model.SitesGroupedBy).map(function(key, index) {
            model.SitesGroupedBy[key].map((c,ii)=>{

                /* Run 'ByResourceType' Filter ********************************** */       
                if(!RunFilter(c.Trade ,UX.AreaSelectFilter.ByResourceType)) return false
                /* ********************************** */ 
                /* Run 'ByClient'  Filter********************************** */       
                    if(!RunFilter(c.Customer ,UX.AreaSelectFilter.ByClient)) return false
                /* ********************************** */ 


                TotalWOs.push(c.WOS)
                Quota.push(c.WOS)
            })
        })

        //console.log(TotalWOs.reduce((a, b) => a + b, 0))
      
        let n=0
        while (n <= Math.ceil((TotalWOs.reduce((a, b) => a + b, 0)))) {
            HeatMapLocations.push(new window.google.maps.LatLng(model.center.lat, model.center.lng))
            n++;
        } 
   })
   let ReduceNumber = Quota.reduce((a, b) => a + b, 0)

   return [HeatMapLocations, ReduceNumber]
}

/* ************************************************************************************************* */
// End Maps
/* ************************************************************************************************* */


/* ************************************************************************************************* */
// OBJ Nivo Network
/* ************************************************************************************************* */



export const NivoNetwork=()=>{
    const UX = store.getState().UX
    const MODEL = store.getState().SCANSTATE

    const FetchedModels = store.getState().COMPARE.CompareData.FetchedModels;

    //console.log(FetchedModels);

    let node=[{
        "id": "Model",
        "radius": 7,
        "depth": 1,
         "color": "#89b2c3"
      }];
    let links=[];

    MODEL.SelectedModel.STOREMARKERCENTERPOINTS.map((model,i)=>{
        
      
        if(findIndex(node, function(o) { return o.id == model.scanCategory; })=== -1){
            node.push({
                "id": model.scanCategory,
                "radius": 10,
                "depth": 1,
                "color": RegionColor(model.scanCategory)
              })

              links.push({
                "source": "Model",
                "target":  model.scanCategory,
                "distance": 30
              })
        }


        node.push({
            "id": model.scanCategory+'.'+model.name,
            "radius": 3,
            "depth": 2,
            "color": RegionColor(model.scanCategory)
          })
        
          links.push({
            "source": model.scanCategory,
            "target":  model.scanCategory+'.'+model.name,
            "distance": 20
          })
        
    })

    return {node, links}
}

export const NivoSunBurst = ()=>{
    const UX = store.getState().UX
    const MODEL = store.getState().SCANSTATE;
    //console.log(MODEL)
    let Data={"children":[]}
    MODEL.SelectedModel.STOREMARKERCENTERPOINTS.map((model,i)=>{
        
        /* ********************************** */       
        // Run Filter
        if(!RunFilter(model.name,UX.AreaSelectFilter.ByPolygon)) return false
        /* ********************************** */ 
       /* ********************************** */       
       // Run Filter
       if(!RunFilter(model.scanCategory ,UX.AreaSelectFilter.ByClusterType)) return false
       /* ********************************** */   

        Object.keys(model.ResourcesGroupedBy).map(function(key, index) {
            //console.log(model.ResourcesGroupedBy[key]);
           
            model.ResourcesGroupedBy[key].map((q,ii)=>{
               
                /* Run 'ByResourceType' Filter ********************************** */       
                if(!RunFilter(q.Trade ,UX.AreaSelectFilter.ByResourceType)) return false
                /* ********************************** */ 
                /* Run 'ByClient'  Filter********************************** */       
                    if(!RunFilter(q.Customer ,UX.AreaSelectFilter.ByClient)) return false
                /* ********************************** */ 

                let WO_ChildIndex=null;
                let ClusterIndex=null;
                
                // Parent Vars
                let Index=null;
                let ParentPath = Data.children
                Index = findIndex(ParentPath,{name:findClientName(q.Customer)})

                if(Index === -1){ 
                    Index =  ParentPath.push({name:findClientName(q.Customer),color:colorArray[ParentPath.length],  "children":[]}) -1
                }
                /** End Parent */


                // group by WOrk Order Vars
                let WO_NAME = `${q.Trade} (${ParentPath[Index].name})`
                let WO_Path = ParentPath[Index]['children']
                WO_ChildIndex = findIndex(WO_Path,{name:WO_NAME})
                

                    if(WO_ChildIndex === -1){
                        WO_ChildIndex = WO_Path.push({ name:WO_NAME,"children":[],  color:colorArray[WO_Path.length], }) - 1
                    }else{
                         //  WO_Path[WO_ChildIndex]['loc'] = WO_Path[WO_ChildIndex]['loc'] + q.WOS
                    }

                /** End Group By */
                
                // Group by Cluster
                    let CLUSTERNAME =  `${model.scanCategory} (${WO_Path[WO_ChildIndex].name})` 
                    let ClusterPath = WO_Path[WO_ChildIndex]['children'];
                    ClusterIndex = findIndex(ClusterPath,{name:CLUSTERNAME}) 


                    if(ClusterIndex === -1){
                        ClusterIndex = ClusterPath.push({name:CLUSTERNAME, loc:1, color: colorArray[ClusterPath.length]}) -1
                    }else{
                        ClusterPath[ClusterIndex]['loc'] = ClusterPath[ClusterIndex]['loc'] + 1
                    }
                /** End Group Cluster */
            })
        })
    })
    return Data
}


/* ************************************************************************************************* */
// OBJ Time Based 
/* ************************************************************************************************* */
export const OBJ_DATESPREAD_TRADE=()=>{

    /*

        EXPORTS 
        {
            Customer: "5fe1751eab400d456889ac5f"
            Date: "08/2018"
            Ratio: 0.050847294915774915
            Trade: "HandyMan"
            UnixDate: 1533045600
            WOS: 1
            site: "5ff83cc6065cf331405db3d0"
        }
    */
    // Get Filters 
    const UX = store.getState().UX
    const MODEL = store.getState().SCANSTATE
    const COSTPERWORKORDER = CostPerWorkOrder()
    let Resources_Clients=[]
  
    MODEL.SelectedModel.STOREMARKERCENTERPOINTS.map((model,i)=>{
        //console.log(model)
        
       /* ********************************** */       
        // Run Filter
        if(!RunFilter(model.name,UX.AreaSelectFilter.ByPolygon)) return false
        /* ********************************** */ 
       /* ********************************** */       
        // Run Filter
        if(!RunFilter(model.scanCategory,UX.AreaSelectFilter.ByClusterType)) return false
        /* ********************************** */ 

        // loop
        Object.keys(model.ResourcesGroupedBy).map(function(key, index) {

            // Run Loop
            model.ResourcesGroupedBy[key].map((q,ii)=>{
                let Index;

                //console.log(q)
                /* ********************************** */       
                // Run Filter
                if(!RunFilter(q.Trade ,UX.AreaSelectFilter.ByResourceType)) return false
                /* ********************************** */ 


                Index = findIndex(Resources_Clients,{name:(q.Date)})
                if(Index === -1){ 
                    Resources_Clients.push({name:(q.Date), UnixDate:q.UnixDate})
                    Index = findIndex(Resources_Clients,{name:(q.Date)})
                }
               
                if(Resources_Clients[Index][key] === undefined){
                    Resources_Clients[Index][key] = fixNumber(q.Ratio)
                }else{
                    Resources_Clients[Index][key] = fixNumber(Resources_Clients[Index][key] + fixNumber(q.Ratio))
                }

               
                
                if(Resources_Clients[Index][`Resources`] === undefined){ Resources_Clients[Index][`Resources`] = fixNumber(q.Ratio) }
                else{ Resources_Clients[Index][`Resources`] = (fixNumber(Resources_Clients[Index][`Resources`]  + fixNumber(q.Ratio)))}
                if(Resources_Clients[Index][`Work Orders`] === undefined){ Resources_Clients[Index][`Work Orders`] = fixNumber(q.WOS) }
                else{ Resources_Clients[Index][`Work Orders`] = (fixNumber(Resources_Clients[Index][`Work Orders`]  +fixNumber(q.WOS)))}
                

                if(Resources_Clients[Index][`${key}_cost`] === undefined){
                    Resources_Clients[Index][`${key}_cost`] = fixNumber(q.Ratio *  COSTPERWORKORDER)
                }else{
                    Resources_Clients[Index][`${key}_cost`] = fixNumber(Resources_Clients[Index][key] *  COSTPERWORKORDER)
                }
                if(Resources_Clients[Index][`ResourceCost`] === undefined){ Resources_Clients[Index][`ResourceCost`] = COSTPERWORKORDER }
                else{ Resources_Clients[Index][`ResourceCost`] = (fixNumber(Resources_Clients[Index][`Resources`]  *  COSTPERWORKORDER))}
                //
            })
        });
    })

    //console.log(Resources_Clients)
   return Resources_Clients
}


// Timeline with CLient Names..
// keep for now as we need to filter out unwanted keys in the component
export const CreateOBJ_Client_WO_Overtime=()=>{

    // Get Filters 
    const UX = store.getState().UX
    const MODEL = store.getState().SCANSTATE

    let Resources_Clients=[]
  
    MODEL.SelectedModel.STOREMARKERCENTERPOINTS.map((model,i)=>{
        //console.log(model)
        /* ********************************** */       
        // Run Filter
        if(!RunFilter(model.name,UX.AreaSelectFilter.ByPolygon)) return false
        /* ********************************** */ 
        /* ********************************** */       
        // Run Filter
        if(!RunFilter(model.scanCategory,UX.AreaSelectFilter.ByClusterType)) return false
        /* ********************************** */ 

        // loop
        Object.keys(model.ClientGroupedBy).map(function(key, index) {

            // Run Loop
            model.ClientGroupedBy[key].map((q,ii)=>{
                let Index;

                //console.log(q)
                /* ********************************** */       
                // Run Filter
                if(!RunFilter(q.Trade ,UX.AreaSelectFilter.ByResourceType)) return false
                /* ********************************** */ 
                Index = findIndex(Resources_Clients,{name:(q.Date)})
                if(Index === -1){ 
                    Resources_Clients.push({name:(q.Date), UnixDate:q.UnixDate})
                    Index = findIndex(Resources_Clients,{name:(q.Date)})
                }
               
                if(Resources_Clients[Index][`WorkOrder_Count_${findClientName(key)}`] === undefined){
                    Resources_Clients[Index][`WorkOrder_Count_${findClientName(key)}`] = fixNumber(q.WOS)
                }else{
                    Resources_Clients[Index][`WorkOrder_Count_${findClientName(key)}`] = fixNumber(Resources_Clients[Index][`WorkOrder_Count_${findClientName(key)}`] + fixNumber(q.WOS))
                }
                if(Resources_Clients[Index][`Work Orders`] === undefined){ Resources_Clients[Index][`Work Orders`] = fixNumber(q.WOS) }
                else{ Resources_Clients[Index][`Work Orders`] = (fixNumber(Resources_Clients[Index][`Work Orders`]  +fixNumber(q.WOS)))}
                

                if(Resources_Clients[Index][`Resource_Count_${findClientName(key)}`] === undefined){
                    Resources_Clients[Index][`Resource_Count_${findClientName(key)}`] = fixNumber(q.Ratio)
                }else{
                    Resources_Clients[Index][`Resource_Count_${findClientName(key)}`] = fixNumber(Resources_Clients[Index][`Resource_Count_${findClientName(key)}`] + fixNumber(q.Ratio))
                }
                   
              
                if(Resources_Clients[Index][`Resource Allocation`] === undefined){
                    Resources_Clients[Index][`Resource Allocation`] = fixNumber(q.Ratio)
                }
                else{
                    Resources_Clients[Index][`Resource Allocation`] = (fixNumber(Resources_Clients[Index][`Resource Allocation`]  + fixNumber(q.Ratio)))
                }
            }) 
        });
    })
   return Resources_Clients
}


export const CreateOBJ_WO_Overtime=()=>{

    // Get Filters 
    const UX = store.getState().UX
    const MODEL = store.getState().SCANSTATE

    let Resources_Clients=[]
  
    MODEL.SelectedModel.STOREMARKERCENTERPOINTS.map((model,i)=>{
       
        /* ********************************** */       
        // Run Filter
        if(!RunFilter(model.scanCategory,UX.AreaSelectFilter.ByClusterType)) return false
        /* ********************************** */ 

        // loop
        Object.keys(model.ClientGroupedBy).map(function(key, index) {

            // Run Loop
            model.ClientGroupedBy[key].map((q,ii)=>{
                let Index;

  
                /* ********************************** */       
                // Run Filter
                if(!RunFilter(q.Trade ,UX.AreaSelectFilter.ByResourceType)) return false
                /* ********************************** */ 


                Index = findIndex(Resources_Clients,{name:(q.Date)})
                if(Index === -1){ 
                    Resources_Clients.push({name:(q.Date), UnixDate:q.UnixDate})
                    Index = findIndex(Resources_Clients,{name:(q.Date)})
                }
               
                if(Resources_Clients[Index][key] === undefined){
                    Resources_Clients[Index][key] = fixNumber(q.WOS)
                }else{
                    Resources_Clients[Index][key] = fixNumber(Resources_Clients[Index][key] + fixNumber(q.WOS))
                }
                   
                        

                if(Resources_Clients[Index][`Work Orders`] === undefined){
                    Resources_Clients[Index][`Work Orders`] = fixNumber(q.WOS)
                }
                else{
                    Resources_Clients[Index][`Work Orders`] = (fixNumber(Resources_Clients[Index][`Work Orders`]  +fixNumber(q.WOS)))
                }
              
            })
        });
    })
   return Resources_Clients
}


/* ************************************************************************************************* */
// END TIME/DATE BASED OBJ
/* ************************************************************************************************* */

/* ************************************************************************************************* */
// Helper Functions
/* ************************************************************************************************* */



export const ClusterNumbersByResourceType=()=>{ 
    // Helper Function
    // Get Filters
    const UX = store.getState().UX
    const MODEL = store.getState().SCANSTATE
    let ClusterTypeArr=[];

    MODEL.SelectedModel.STOREMARKERCENTERPOINTS.map((model,i)=>{
        if(!HandleResourceFilter(model, UX.AreaSelectFilter.ByResourceType)){
            ClusterTypeArr.push(model.scanCategory)
            return true
        } 
    });
    return ClusterTypeArr    
}

export const ModelNumSitesTotal=()=>{
   
    const MODEL = store.getState().SCANSTATE
    let SiteNumberArr=[];

    MODEL.SelectedModel.STOREMARKERCENTERPOINTS.map((model,i)=>{
        SiteNumberArr.push(model.sites.length)
            return true
    });

    return SiteNumberArr    
}


export const ClientOutOfScopeNum = ()=>{
    const UX = store.getState().UX
    const MODEL = store.getState().SCANSTATE

    let OOS_WOS =0
    let OOS_Sites=0

    MODEL.SelectedModel.STORERESIDUALMARKERS.map((OOS,i)=>{
       if(OOS.customers.indexOf(UX.AreaSelectFilter.ByClient) != -1){
            OOS_Sites = OOS_Sites + 1
            OOS_WOS = OOS_WOS + OOS.SumWorkOrder
       } 
    })
    return [OOS_Sites,OOS_WOS]
}


export const  WorkorderTotals=()=>{
    const UX = store.getState().UX
    const MODEL = store.getState().SCANSTATE.SelectedModel

    //let TotalWOs=[];
    let TestTotalWOs=[];
    let MissingWOs=[];

    //console.log(MODEL)
    MODEL.STOREMARKERCENTERPOINTS.map((model,i)=>{
           //console.log(model)
           // model.StripedSites.map((site,i)=>{
           //     TotalWOs.push(site.SumWorkOrder)
           // })

            Object.keys(model.SitesGroupedBy).map(function(key, index) {
                model.SitesGroupedBy[key].map((c,ii)=>{
                    TestTotalWOs.push(c.WOS)
                })
            })
    })

    MODEL.STORERESIDUALMARKERS.map((model,i)=>{
        MissingWOs.push(model.SumWorkOrder)
    })
    //console.log("WO TOTALS")
    //console.log(TotalWOs.reduce((a, b) => a + b, 0), TestTotalWOs.reduce((a, b) => a + b, 0))
    return [TestTotalWOs.reduce((a, b) => a + b, 0), MissingWOs.reduce((a, b) => a + b, 0)]
}


/* ************************************************************************************************* */
// Work Orders
/* ************************************************************************************************* */
