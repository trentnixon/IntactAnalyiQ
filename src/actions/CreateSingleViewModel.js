/* Action file for Single Model Review Functions */
/*
    THIS IS FOR PROTOTYPE AND LIMITED DEV TIME ONLY
    ALL OF THIS WILL NEED REFACTORING WHEN YOU HAVE TIME!!!
    
*/


import store from "../store/index"
import axios from 'axios';
import {GroupArrayByOccurances, HandleResourceFilter} from "actions/HandleUX";
import {findIndex,partial,sumBy,orderBy} from 'lodash';
import {findClientName} from "actions/ClusterAnalysis"


 export const fixNumber=(num)=>{
    if(num != undefined)
        return parseFloat(num.toFixed(2)) 
            return 0
}

/* ******************************** */
// FILTERS

    const RunFilter=(filter,ByType)=>{
        if(ByType != null)
            if(filter != ByType )
                return false
                    return true
    }

/**/

/* ************************************************************************************************* */
// Location Functions



/* ************************************************************************************************* */


export const ClusterNumbersByResourceType=()=>{
        // Simple Loop FUnction
        // This function loops the clusterpoints and stores Cluster References

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
    // Simple Loop Function
    // This function loops the clusterpoints and stores Cluster References

    // Get Filters
    const UX = store.getState().UX
    const MODEL = store.getState().SCANSTATE
    let SiteNumberArr=[];

    MODEL.SelectedModel.STOREMARKERCENTERPOINTS.map((model,i)=>{
        SiteNumberArr.push(model.sites.length)
            return true
    });

    return SiteNumberArr    
}



export const CreateObj_Clustertype_ResourceAllocation=()=>{
    // Obj Loop
    // Creates an Object with a cluster Name and resource Allocation totals

    // Get Filters
    const UX = store.getState().UX
    const MODEL = store.getState().SCANSTATE
    let Clusters_ResourceAllocation=[];

    MODEL.SelectedModel.STOREMARKERCENTERPOINTS.map((model,i)=>{

            let Index = findIndex(Clusters_ResourceAllocation,{name:model.scanCategory})

            if(Index === -1){ Clusters_ResourceAllocation.push({name:model.scanCategory})}
            Index = findIndex(Clusters_ResourceAllocation,{name:model.scanCategory})
            
            model.resourceQuota.map((quote,ii)=>{
 
       
            /* ********************************** */       
                // Run Filter
                if(!RunFilter(quote.Trade ,UX.AreaSelectFilter.ByResourceType)) return false
            /* ********************************** */ 
               

                if(Clusters_ResourceAllocation[Index][`Resource_${quote.Trade}`] === undefined){
                    Clusters_ResourceAllocation[Index][`Resource_${quote.Trade}`] = fixNumber(quote.ResourceAllocation) 
                }else{
                    Clusters_ResourceAllocation[Index][`Resource_${quote.Trade}`] =   (fixNumber(Clusters_ResourceAllocation[Index][`Resource_${quote.Trade}`]  +quote.ResourceAllocation))
                }
                    
            })
    
    });

    return Clusters_ResourceAllocation    
}


export const CreateObj_Clustertype_WorkOrders=()=>{
        // Get Filters
        const UX = store.getState().UX
        const MODEL = store.getState().SCANSTATE
        let Clusters_Workorders=[];

    MODEL.SelectedModel.STOREMARKERCENTERPOINTS.map((model,i)=>{

        let Index = findIndex(Clusters_Workorders,{name:model.scanCategory})
        if(Index === -1){ Clusters_Workorders.push({name:model.scanCategory})}
        Index = findIndex(Clusters_Workorders,{name:model.scanCategory})

        Object.keys( model.ResourcesGroupedBy).map(function(key, index) {
   
            model.ResourcesGroupedBy[key].map((quote,ii)=>{

                /* ********************************** */       
                    // Run Filter
                    if(!RunFilter(quote.Trade ,UX.AreaSelectFilter.ByResourceType)) return false
                /* ********************************** */ 
                /* ********************************** */       
                    // Run Filter
                  //  console.log(quote.Customer ,UX.AreaSelectFilter.ByClient) 
                   // if(!RunFilter(quote.Customer ,UX.AreaSelectFilter.ByClient)) return false
                /* ********************************** */ 

                if(Clusters_Workorders[Index][quote.Trade] === undefined){  Clusters_Workorders[Index][quote.Trade] = (quote.WOS) }
                else{ Clusters_Workorders[Index][quote.Trade] =   ((Clusters_Workorders[Index][quote.Trade]  +quote.WOS))}

            })
          });
    })

    return Clusters_Workorders;
}



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




// Location Chart building

export const ChartData_ClustersBy_ResourceType=()=>{
    
    // Fetch occurances of clusters from ClusterNumbersByResourceType()
    // find occurances and loop to create radial data
    let Preapred_Chart_Data=[] 
    let ClustersGroupedBy;
    ClustersGroupedBy=GroupArrayByOccurances(ClusterNumbersByResourceType());

    ClustersGroupedBy[0].map((cat,i)=>{ Preapred_Chart_Data.push({ name: cat, value: ClustersGroupedBy[1][i] }) });
    
    return Preapred_Chart_Data
}



export const ChartData_SitesInScope=()=>{
    const MODEL = store.getState().SCANSTATE
    let Sites = ModelNumSitesTotal()
    
    let ChartData=[
        { name: 'InScope', value: Sites.reduce((a, b) => a + b, 0) }, 
        { name: 'Out of Scope', value: MODEL.SelectedModel.USERSELECTEDLIST.length - Sites.reduce((a, b) => a + b, 0) }
    ]

    return ChartData
}


export const MapData_LocationHeatmap=()=>{
   return [Location_HeatMap(), Location_HeatMap().length]
}




/* ************************************************************************************************* */
// Resource Functions

/* ************************************************************************************************* */

export  const FindTotalResourceAllocation = ()=>{

    const UX = store.getState().UX
    const MODEL = store.getState().SCANSTATE

    let TotalResources = []
    MODEL.SelectedModel.STOREMARKERCENTERPOINTS.map((model,i)=>{
           TotalResources.push(sumBy(model.resourceQuota, function(o) { return o.ResourceAllocation; }));
        }) 
    return TotalResources.reduce((a, b) => a + b, 0)
}


export const WOsCoveredInModel = (CENTERPOINTS)=>{

    const UX = store.getState().UX
    const MODEL = store.getState().SCANSTATE
    let ModelTotal=[];
    let QuotaCount=[]
    MODEL.SelectedModel.STOREMARKERCENTERPOINTS.map((site)=>{
        ModelTotal.push(TotalWorkOrders(site.sites))
        Object.keys(site.ResourcesGroupedBy).map(function(key, index) {
            site.ResourcesGroupedBy[key].map((q,ii)=>{
                QuotaCount.push(q.WOS)
            })
        });
    })

    return QuotaCount.reduce((a, b) => a + b, 0)
}



export const Resources_HeatMap=()=>{


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



// Objs

export const CreateOBJ_ResourcesAgainstClients=()=>{

    // Get Filters 
    const UX = store.getState().UX
    const MODEL = store.getState().SCANSTATE

    let Resources_Clients=[]

  
    MODEL.SelectedModel.STOREMARKERCENTERPOINTS.map((model,i)=>{
        //console.log(model)
        
        /* ********************************** */       
        // Run Filter
        if(!RunFilter(model.scanCategory,UX.AreaSelectFilter.ByClusterType)) return false
        /* ********************************** */ 
        
           
        // loop
        Object.keys(model.ResourcesGroupedBy).map(function(key, index) {

            // Run Loop
            model.ResourcesGroupedBy[key].map((q,ii)=>{
                let Index;
           
           
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
                    
            })
        });
    })
  
 
   return orderBy(Resources_Clients, ['name'], [])

}


export const CreateOBJ_ResourcesAgainstDates=()=>{

    // Get Filters 
    const UX = store.getState().UX
    const MODEL = store.getState().SCANSTATE

    let Resources_Clients=[]
  
    MODEL.SelectedModel.STOREMARKERCENTERPOINTS.map((model,i)=>{
        //console.log(model)
       
        /* ********************************** */       
        // Run Filter
        if(!RunFilter(model.scanCategory,UX.AreaSelectFilter.ByClusterType)) return false
        /* ********************************** */ 

        // loop
        Object.keys(model.ResourcesGroupedBy).map(function(key, index) {

            // Run Loop
            model.ResourcesGroupedBy[key].map((q,ii)=>{
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
                    Resources_Clients[Index][key] = fixNumber(q.Ratio)
                }else{
                    Resources_Clients[Index][key] = fixNumber(Resources_Clients[Index][key] + fixNumber(q.Ratio))
                }
                   
                        

                if(Resources_Clients[Index][`ratio`] === undefined){
                    Resources_Clients[Index][`ratio`] = fixNumber(q.Ratio)
                }
                else{
                    Resources_Clients[Index][`ratio`] = (fixNumber(Resources_Clients[Index][`ratio`]  +fixNumber(q.Ratio)))
                }
                     
            })
        });
    })
   return Resources_Clients
}



// Charts
export const CreateRadial_ResourcesAgainstClusters = ()=>{
    let ChartData=[];
    const UX = store.getState().UX
    const MODEL = store.getState().SCANSTATE
    
    MODEL.SelectedModel.STOREMARKERCENTERPOINTS.map((model,i)=>{
        model.resourceQuota.map((quote,ii)=>{
        let Index = findIndex(ChartData,{name:quote.Trade})
        if(Index === -1){ ChartData.push({name:quote.Trade})}
            Index = findIndex(ChartData,{name:quote.Trade})


        /* ********************************** */       
        // Run Filter
          if(!RunFilter(model.scanCategory ,UX.AreaSelectFilter.ByClusterType)) return false
        /* ********************************** */ 

            if(ChartData[Index].value === undefined)
            {  ChartData[Index].value  = parseFloat(quote.ResourceAllocation.toFixed(2)) }
            else
            {  ChartData[Index].value  =  parseFloat(ChartData[Index].value.toFixed(2))  + parseFloat(quote.ResourceAllocation.toFixed(2))  }
        })
    })
   
    
    return orderBy(ChartData, ['name'], [])
}


export const CreateRadial_ResourcesAgainstClients = ()=>{
    let ChartData=[];
    
    const UX = store.getState().UX
    const MODEL = store.getState().SCANSTATE

    let Resources_Clients=[]
    MODEL.SelectedModel.STOREMARKERCENTERPOINTS.map((model,i)=>{

        console.log(model);
        model.resourceQuota.map((quote,ii)=>{

            console.log(quote);

        let Index = findIndex(ChartData,{name:quote.Trade})
        if(Index === -1){ ChartData.push({name:quote.Trade})}
            Index = findIndex(ChartData,{name:quote.Trade})

                /* ********************************** */       
                // Run Filter
                if(!RunFilter(model.scanCategory ,UX.AreaSelectFilter.ByClusterType)) return false
                /* ********************************** */ 
                 
                if(Resources_Clients[Index][quote.Trade] === undefined){  Resources_Clients[Index][quote.Trade] = (quote.WOS) }
                else{ Resources_Clients[Index][quote.Trade] =   ((Resources_Clients[Index][quote.Trade]  +quote.WOS))}
               /*        
                    if(ChartData[Index].value === undefined)
                    {  ChartData[Index].value  = parseFloat(quote.ResourceAllocation.toFixed(2)) }
                    else
                    {  ChartData[Index].value  =  parseFloat(ChartData[Index].value.toFixed(2))  + parseFloat(quote.ResourceAllocation.toFixed(2))  }
                */
        })
    })
    return ChartData
}


/* ************************************************************************************************* */
// Work Orders
/* ************************************************************************************************* */


export const TotalWorkOrders=(data)=>{
    let TotalWOs=[]
    data.map((site,i)=>{
        if(site.SumWorkOrder !== undefined) 
            TotalWOs.push(site.SumWorkOrder)
    })
    return TotalWOs.reduce((a, b) => a + b, 0)
}


export const WorkOrderCompletion = ()=>{
    
    const UX = store.getState().UX
    const MODEL = store.getState().SCANSTATE
    
    let WOCover= WOsCoveredInModel(MODEL.SelectedModel.STOREMARKERCENTERPOINTS);
    let GetTotalWorkOrders = TotalWorkOrders(MODEL.SelectedModel.USERSELECTEDLIST)
    
    return [WOCover, (GetTotalWorkOrders-WOCover)]
}


export const CreateOBJ_WO_Overtime=()=>{

    // Get Filters 
    const UX = store.getState().UX
    const MODEL = store.getState().SCANSTATE

    let Resources_Clients=[]
  
    MODEL.SelectedModel.STOREMARKERCENTERPOINTS.map((model,i)=>{
        console.log(model)
       
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
// Clients
/* ************************************************************************************************* */

export const FindClientList = ()=>{
    const MODEL = store.getState().SCANSTATE;
    let ClientNames = []
    MODEL.SelectedModel.STOREMARKERCENTERPOINTS.map((model,i)=>{
        Object.keys(model.ClientGroupedBy).map(function(key, index) {
            model.ClientGroupedBy[key].map((c,ii)=>{
           
                if(ClientNames.indexOf(c.Customer) === -1){
                    ClientNames.push(c.Customer)
                }
            })
            
        })
    })
    return ClientNames
}

export const Client_Split_by_Site=()=>{
        
    const UX = store.getState().UX
    const MODEL = store.getState().SCANSTATE;

    let Temp=[]
    let ChartData=[]
    MODEL.SelectedModel.STOREMARKERCENTERPOINTS.map((model,i)=>{
        
        /* ********************************** */       
        // Run Filter
        if(!RunFilter(model.scanCategory,UX.AreaSelectFilter.ByClusterType)) return false
        /* ********************************** */ 

        Object.keys(model.ClientGroupedBy).map(function(key, index) {
            model.ClientGroupedBy[key].map((c,ii)=>{

        /* ********************************** */       
        // Run Filter
          if(!RunFilter(c.Trade ,UX.AreaSelectFilter.ByResourceType)) return false
        /* ********************************** */ 

                let Index = findIndex(Temp,{name:c.Customer})
                if(Index === -1){ 
                    Temp.push({name:c.Customer})
                    Index = findIndex(Temp,{name:c.Customer})
                }
                
                if(Temp[Index]['sites'] === undefined) { Temp[Index]['sites']=[]; }
                    
                if(Temp[Index].sites.indexOf(c.site) === -1){ Temp[Index]['sites'].push(c.site)}
                
            })
        })
    })

    Temp.map((client,i)=>{ ChartData.push({name:findClientName(client.name), value:client.sites.length}) })

    return ChartData
}



export  const Client_Split_by_Resources=()=>{
    
    const UX = store.getState().UX
    const MODEL = store.getState().SCANSTATE;

    let Temp=[]
    let ChartData=[]
    MODEL.SelectedModel.STOREMARKERCENTERPOINTS.map((model,i)=>{
        
        /* ********************************** */       
        // Run Filter
        if(!RunFilter(model.scanCategory,UX.AreaSelectFilter.ByClusterType)) return false
        /* ********************************** */ 

        //console.log(model)
        Object.keys(model.ClientGroupedBy).map(function(key, index) {
            model.ClientGroupedBy[key].map((c,ii)=>{
            
            /* ********************************** */       
            // Run Filter
            if(!RunFilter(c.Trade ,UX.AreaSelectFilter.ByResourceType)) return false
            /* ********************************** */ 

                let Index = findIndex(Temp,{name:c.Customer})
                if(Index === -1){ 
                    Temp.push({name:c.Customer})
                    Index = findIndex(Temp,{name:c.Customer})
                }
                
                if(Temp[Index]['Ratio'] === undefined) { Temp[Index]['Ratio']=[]; }
                if(Temp[Index].Ratio.indexOf(c.Ratio) === -1){ Temp[Index]['Ratio'].push(c.Ratio)}
                
            })
        })
    })

    Temp.map((client,i)=>{ ChartData.push({name:findClientName(client.name), value: fixNumber(client.Ratio.reduce((a, b) => a + b, 0)) })  })

    return ChartData
}


export  const Client_Split_by_WorkOrders=()=>{
    
    const UX = store.getState().UX
    const MODEL = store.getState().SCANSTATE;

    let Temp=[]
    let ChartData=[]
    MODEL.SelectedModel.STOREMARKERCENTERPOINTS.map((model,i)=>{
        
        /* ********************************** */       
        // Run Filter
        if(!RunFilter(model.scanCategory,UX.AreaSelectFilter.ByClusterType)) return false
        /* ********************************** */ 

        //console.log(model)
        Object.keys(model.ClientGroupedBy).map(function(key, index) {
            model.ClientGroupedBy[key].map((c,ii)=>{
            
            /* ********************************** */       
            // Run Filter
            if(!RunFilter(c.Trade ,UX.AreaSelectFilter.ByResourceType)) return false
            /* ********************************** */ 

                let Index = findIndex(Temp,{name:c.Customer})
                if(Index === -1){ 
                    Temp.push({name:c.Customer})
                    Index = findIndex(Temp,{name:c.Customer})
                }
                
                if(Temp[Index]['WOS'] === undefined) { Temp[Index]['WOS']=[]; }
                if(Temp[Index].WOS.indexOf(c.WOS) === -1){ Temp[Index]['WOS'].push(c.WOS)}
                
            })
        })
    })

    Temp.map((client,i)=>{ ChartData.push({name:findClientName(client.name), value: fixNumber(client.WOS.reduce((a, b) => a + b, 0)) })  })

    return ChartData
}



export const CreateOBJ_Client_WO_Overtime=()=>{

    // Get Filters 
    const UX = store.getState().UX
    const MODEL = store.getState().SCANSTATE

    let Resources_Clients=[]
  
    MODEL.SelectedModel.STOREMARKERCENTERPOINTS.map((model,i)=>{
        //console.log(model)
       
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
               
                if(Resources_Clients[Index][findClientName(key)] === undefined){
                    Resources_Clients[Index][findClientName(key)] = fixNumber(q.WOS)
                }else{
                    Resources_Clients[Index][findClientName(key)] = fixNumber(Resources_Clients[Index][findClientName(key)] + fixNumber(q.WOS))
                }
                   
               // Resources_Clients[Index][(q.Customer] = fixNumber(q.WOS)

                if(Resources_Clients[Index][`Work Orders`] === undefined){
                    Resources_Clients[Index][`Work Orders`] = fixNumber(q.WOS)
                }
                else{
                    Resources_Clients[Index][`Work Orders`] = (fixNumber(Resources_Clients[Index][`Work Orders`]  +fixNumber(q.WOS)))
                }

            })
        });
    })
    //console.log(Resources_Clients)
   return Resources_Clients
}


export const CreateOBJ_Client_ResourceAllocation_Overtime=()=>{

    // Get Filters 
    const UX = store.getState().UX
    const MODEL = store.getState().SCANSTATE

    let Resources_Clients=[]
  
    MODEL.SelectedModel.STOREMARKERCENTERPOINTS.map((model,i)=>{
        //console.log(model)
       
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
               
                if(Resources_Clients[Index][findClientName(key)] === undefined){
                    Resources_Clients[Index][findClientName(key)] = fixNumber(q.Ratio)
                }else{
                    Resources_Clients[Index][findClientName(key)] = fixNumber(Resources_Clients[Index][findClientName(key)] + fixNumber(q.Ratio))
                }
                   
               // Resources_Clients[Index][(q.Customer] = fixNumber(q.WOS)

                if(Resources_Clients[Index][`Resource Allocation`] === undefined){
                    Resources_Clients[Index][`Resource Allocation`] = fixNumber(q.Ratio)
                }
                else{
                    Resources_Clients[Index][`Resource Allocation`] = (fixNumber(Resources_Clients[Index][`Resource Allocation`]  + fixNumber(q.Ratio)))
                }

            })
        });
    })
    //console.log(Resources_Clients)
   return Resources_Clients
}