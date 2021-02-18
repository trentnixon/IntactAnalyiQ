import store from "../store/index"
import {GroupArrayByOccurances, HandleResourceFilter, numberWithCommas} from "actions/HandleUX";
import {findIndex,sumBy,orderBy,groupBy,find, remove} from 'lodash';
import {findClientName} from "actions/ClusterAnalysis"

/* ************************************************************************************************* */
// OBJ BUILDER
// FULL OBJECTS BROKEN DOWN BY A ROOT CATEGORY
// Naming
// OBJ_[ROOT]_CALCULATED_FILTER
/* ************************************************************************************************* */


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


export const FindTotals = (DATA, FILTER)=>{
    let Totals=[]
    DATA.map((SELETCED, i )=>{
        Totals.push(numberWithCommas(sumBy(SELETCED, function(o) { return o[FILTER]; }).toFixed(0)))
    })
    return  Totals
}


const IsInt=(Num)=>{
    if(typeof Num=== 'string'){return parseFloat(Num.replace(/,/g, ''))
    }else{ return Num }
    
}

export const FindPercentageBewtweenTwoNumbers = (Data, i)=>{
 
    let PercClass='negitive'
    let PercSymbal=""
    if(i===1){
        
        let Percentage = ((IsInt(Data[1])  - IsInt(Data[0])) / IsInt(Data[0])) * 100
        if(Percentage>-0.1){  PercClass='positive'; PercSymbal="+"}
        return <span className={PercClass}>{`( ${PercSymbal} ${Percentage.toFixed(2)} %)`}</span>
    }
    else{
        return false
    }
}

/* ******************************** */
// FILTERS

    const RunFilter=(filter,ByType)=>{
        if(ByType != null){
            if(filter != ByType )
                return false
        }return true        
    }

/**/

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
 
    const COMPARE = store.getState().COMPARE.CompareData
    const UX = store.getState().UX
    const MODEL = store.getState().SCANSTATE

    //console.log(COMPARE.FetchedModels)
    
        let CompareOBJ=[]
    COMPARE.FetchedModels.map((MODEL, i)=>{
        let Clusters_ByClient=[];
           // console.log(MODEL.STOREMARKERCENTERPOINTS)
            MODEL.STOREMARKERCENTERPOINTS.map((model,i)=>{

                let Index = findIndex(Clusters_ByClient,{name:model.scanCategory})
    
                if(Index === -1){ Clusters_ByClient.push({name:model.scanCategory,  Appearances:0})}
                Index = findIndex(Clusters_ByClient,{name:model.scanCategory})
                
    
                Clusters_ByClient[Index].Appearances = Clusters_ByClient[Index].Appearances + 1;
    
                Object.keys(model.ClientGroupedBy).map((key,ii)=>{
                    model.ClientGroupedBy[key].map((q,ii)=>{
                        //console.log(q)
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
        CompareOBJ.push(Clusters_ByClient)
        })
    
    //console.log(CompareOBJ)
    return CompareOBJ    
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
    const COMPARE = store.getState().COMPARE.CompareData
    const UX = store.getState().UX
    //const MODEL = store.getState().SCANSTATE

  

    console.log('COMPARE MODELS ', COMPARE.FetchedModels.length)
    let CompareOBJ=[]

    COMPARE.FetchedModels.map((MODEL, i)=>{
        let Resources_Clients=[]
        MODEL.STOREMARKERCENTERPOINTS.map((model,i)=>{
            //console.log(model)
            
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
        CompareOBJ.push(Resources_Clients)
    })
  
   
  console.log(CompareOBJ)
 
   return orderBy(CompareOBJ, ['name'], [])

}


/* ************************************************************************************************* */
// END TIME/DATE BASED OBJ
/* ************************************************************************************************* */

/* ************************************************************************************************* */
// Helper Functions
/* ************************************************************************************************* */


export const  WorkorderTotals=(CenterPoints, MissingLocations)=>{
    const UX = store.getState().UX
    const MODEL = store.getState().SCANSTATE.SelectedModel

    //let TotalWOs=[];
    let TestTotalWOs=[];
    let MissingWOs=[];

    //console.log(MODEL)
    CenterPoints.map((model,i)=>{
           // console.log(model)
           // model.StripedSites.map((site,i)=>{
           //     TotalWOs.push(site.SumWorkOrder)
           // })

            Object.keys(model.SitesGroupedBy).map(function(key, index) {
                model.SitesGroupedBy[key].map((c,ii)=>{
                    TestTotalWOs.push(c.WOS)
                })
            })
    })

    MissingLocations.map((model,i)=>{
        MissingWOs.push(model.SumWorkOrder)
    })
    //console.log("WO TOTALS")
    //console.log(TotalWOs.reduce((a, b) => a + b, 0), TestTotalWOs.reduce((a, b) => a + b, 0))
    return [TestTotalWOs.reduce((a, b) => a + b, 0), MissingWOs.reduce((a, b) => a + b, 0)]
}