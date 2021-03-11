import store from "../store/index"
//import axios from 'axios';
import {find, findIndex} from 'lodash'; 


/* **************************************************************************** */
/*  Aux Functions */
/* **************************************************************************** */
const GroupArray =(arr) =>{
    var a = [],b = [],prev;
    arr.sort();
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] !== prev) {
        a.push(arr[i]);
        b.push(1);
      } else {
        b[b.length - 1]++;
      }
      prev = arr[i];
    }
    return [a, b];
  }


  const FindMultiplier=(int)=>{
    const RM = store.getState().STRAPI.ratioModel
    let Multiplier = find(RM, function(o) { return (o.Min <= int && o.max >= int) });
    return Multiplier.multiplier
  }


  const FindInterior = (outer, inner)=>{
    inner.map((cluster,i)=>{
      let Inside = false
      if(
          cluster.GroupedBoxBoundaryLimits[0] > outer[0]
        && cluster.GroupedBoxBoundaryLimits[1] < outer[1]
        && cluster.GroupedBoxBoundaryLimits[2] > outer[2]
        && cluster.GroupedBoxBoundaryLimits[3] < outer[3]
      )
      { Inside = true}
      //console.log(outer, cluster.GroupedBoxBoundaryLimits)
        //console.log(Inside)
    })
  }

   export const findTradeTypeName = (id)=>{
    
    const TRADETYPE = store.getState().STRAPI.tradeType;
    
    let FoundType = find(TRADETYPE, function(o) { return o.id === id; })
    return FoundType.name
}


  export const findClientName=(id)=>{
    const Clients = store.getState().STRAPI.UserData.Customers;
    let FoundClient = find(Clients, function(o) { return o.id === id; });

    if(FoundClient !== undefined)
      return FoundClient.name 
  
    return false
   }

    const ResourcesRequired = (TradesUsed)=>{
      //console.log(TradesUsed);
      
    }

    const ChartGroupArrayData = (Compressed)=>{
    let CompressedForPie=[]
    Compressed[0].map((jt,i)=>{ CompressedForPie.push({ name: jt , value: Compressed[1][i] }) })
    return (CompressedForPie);
    }

/* End Aux Functions **************************************************************************** */


/* **************************************************************************** */
/* Worker Functions  */
/* **************************************************************************** */



const findTradeParent = (trade)=>{
  const TRADETYPEALLOCATION = store.getState().STRAPI.UserData.tradetypes;

  let FoundType = find(TRADETYPEALLOCATION, function(o) { return o.id === trade; })
  if(FoundType === undefined){
    //console.log(trade)
    return 'undefined'
  }else{
   //console.log(trade, FoundType.trade_allocation_ratio.Name)
    return FoundType.trade_allocation_ratio.Name;
  }
 
}

// Find Allocation of trade type across cluster

   export const FindTradeTypeAllocation = (data)=>{
     let TotalChildTradesTradearr=[]
     let ParentTradeName=[]
      data.map((site,i)=>{
          site.sites.map((count,i)=>{
            let TradesJson = JSON.parse(count.count[0].TradeTypes);
            TotalChildTradesTradearr=  [...TotalChildTradesTradearr, ...TradesJson]
          })
      })

      TotalChildTradesTradearr.map((childTrades, i )=>{
        ParentTradeName.push(findTradeParent(childTrades))
      })
      
      return GroupArray(ParentTradeName)
    }


export const SitesbyTier = (data)=>{
    let tiers=[]
    data.map((item,index)=>{
        let ii=0
       
        while(ii<item.sites.length){
           tiers.push(item.scanCategory)
            ii++
        }
      
      
    })

    //console.log(GroupArray(tiers))
    return GroupArray(tiers)
}

// Return the Total workordercount for a cluster
    export const SumWorkOrderTotal = (sites)=>{
        let total=[]
          sites.map((item,i)=>{
              if (!isNaN(item.SumWorkOrder))
                total.push(item.SumWorkOrder)
          })
          return total.reduce((a, b) => a + b, 0)
      }




const Removeinteriors = (Results)=>{
  //console.log(Results)
  Results.map((results)=>{
      FindInterior(results.GroupedBoxBoundaryLimits, Results)
  })
}

const ClusterCost=(ClusterAssetBreakdown)=>{
    const TRADETYPE = store.getState().STRAPI.tradeType;
    let ClusterCost=[]
    ClusterAssetBreakdown[0].map((id,i)=>{
        let Cost;
        let TT = find(TRADETYPE, function(o) { return o.id === id; });
        if(TT.cpj != undefined){
                //console.log(TT.cpj, id, ClusterAssetBreakdown[1][i], FindMultiplier(ClusterAssetBreakdown[1][i]))
               Cost = (ClusterAssetBreakdown[1][i]* TT.cpj)*FindMultiplier(ClusterAssetBreakdown[1][i])
               ClusterCost.push([findTradeTypeName(id), parseFloat(Cost.toFixed(2))])
        }else{
            //console.log(`${findTradeTypeName(id)} is missing a CPJ marker`)
        }
    })
    return ClusterCost
}





  const JobTypes =(JOBTYPES,result)=>{
     
       //console.log(JOBTYPES,result)

        // JOb Type
        let PUSHJobTypeName=[]
        let PUSHJobTypeID=[]
        let PUSHJobTypeWorkOrderCount=[]
        let PUSHTradeType=[]
        let PUSHSplitTradeTypeCount=[]
        let PUSHTradeInt=[]
        let PUSHWorkOrdersTrueNumber=[]
        let WorkOrderValue;

        result.Sites.map((site,i)=>{

            //console.log(site)
            // Breakdown Jobtypes
            JOBTYPES.map((jobtype,i)=>{

                //console.log(find(jobtype.work_orders, function(o) { return o.site === site.id; }))
                let FindWorkOrder = find(jobtype.work_orders, function(o) { return o.site === site.id; })
                if(FindWorkOrder!== undefined){
                    
                    // Store JT name
                    PUSHJobTypeName.push(jobtype.name);
                    PUSHJobTypeID.push(jobtype.id)

                    //console.log(FindWorkOrder)
                    //console.log(jobtype);
                    
                    PUSHWorkOrdersTrueNumber.push(FindWorkOrder.count)
                    PUSHTradeType.push(findTradeTypeName(FindWorkOrder.trade_type))
                    PUSHTradeInt.push(FindWorkOrder.trade_type)
                   
                    let Index = findIndex(PUSHSplitTradeTypeCount, function(o) { return o.id == FindWorkOrder.trade_type; });
          
                    if(Index != -1){
                          PUSHSplitTradeTypeCount[Index].count = PUSHSplitTradeTypeCount[Index].count + FindWorkOrder.count
                    }else{
                      PUSHSplitTradeTypeCount.push({id:FindWorkOrder.trade_type, count:FindWorkOrder.count, name:findTradeTypeName(FindWorkOrder.trade_type)})
                    }
                    
                    
                     // I DONT THINK THIS IS CORRECT
                    WorkOrderValue = PUSHWorkOrdersTrueNumber.reduce((a, b) => a + b, 0)
                    //console.log("PUSHWorkOrdersTrueNumber", PUSHWorkOrdersTrueNumber)
                    let IndexThis = findIndex(PUSHJobTypeWorkOrderCount, function(o) { return o.name === jobtype.name; })
                    
                    if(IndexThis === -1){ 
                        PUSHJobTypeWorkOrderCount.push({name:jobtype.name, value:WorkOrderValue})
                    }
                    else{
                        PUSHJobTypeWorkOrderCount.splice(IndexThis, 1, {name:jobtype.name, value: (PUSHJobTypeWorkOrderCount[IndexThis].value+WorkOrderValue)});
                    }
                    
                }
            })
           
        });







        // Create Analysis to hand off to Reducer

        return {
            JobTypeNameARR :GroupArray(PUSHJobTypeName),
            JobTypeIDARR : GroupArray(PUSHJobTypeID),
            TradeTypeARR : GroupArray(PUSHTradeType),
            WorkOrdersTrueNumber:PUSHWorkOrdersTrueNumber.reduce((a, b) => a + b, 0),
            JobTypeWorkOrderCount : PUSHJobTypeWorkOrderCount,
            ClusterCost: ClusterCost(GroupArray(PUSHTradeInt)),
            ResourcesRequired:ResourcesRequired(GroupArray(PUSHTradeType)),
            SplitTradeTypeCount:PUSHSplitTradeTypeCount
        }
  }









  const checkResourceCount = (Results)=>{

    Results.map((cluster,i)=>{

      //console.log(cluster, cluster.SplitTradeTypeCount)
    })
      /*
        minValueDay = 2
        ResourceDay = 0.2
        JobsPerDay = 4.4
        MinRadius = 2000
        WorkDays = 250
      */

  }

  /* NEW FUNCTIONS */

  const ExtractWorkOrderValues = (Results) => {
    // Extracts the True workorder count
      Results.map((result)=>{
        let WorkOrderCount = [], WorkOrderNum=0
          result.Sites.map((site, i)=>{
              WorkOrderNum = WorkOrderNum + site.count[0].WorkOrders
              WorkOrderCount.push(site.count[0].WorkOrders)
          })
          result.WorkOrders = WorkOrderCount.reduce((a, b) => a + b, 0);
      })
      return true;
  }


  const ExtractTradeTypes = (Results, STRAPI)=>{

    //console.log(STRAPI)
    
    Results.map((result)=>{
      let PUSHTradeType=[]
        result.Sites.map((site, i)=>{
          PUSHTradeType = [...PUSHTradeType,...JSON.parse(site.count[0].TradeTypes)]
        })
        result.TradeType = GroupArray(PUSHTradeType)
        //console.log(GroupArray(PUSHTradeType));
    })
   
    return true;
  } 



/* **************************************************************************** */
/*  Starter Function  ********************************************************* */
/*                                                                               */
/* **************************************************************************** */


export function ClusterAnalysis(Results){
    const STRAPI = store.getState().STRAPI;
    //console.log("ClusterAnalysis", Results);
    
    // Let group some of the Data points into Meta data
    // Group by WO
      ExtractWorkOrderValues(Results)
    // Group by Trade type
      ExtractTradeTypes(Results, STRAPI)
    // Group by Resource Type
      //checkResourceCount(Results)
    
    // Group by Cost
    
    // Group by Asset Type
    // Group by Delivery Model
    // Group by Customers




    // OK time to filter through the results on Known restrictions
    
     // Run Resource Test Here
    
    // Removeinteriors(Results)


    
    // find the job types
    /*
     Results.map((result,i)=>{
        
        let TRADEOBJ = JobTypes(STRAPI.JobType,result);

        //result.WorkOrdersTrueNumber = TRADEOBJ.WorkOrdersTrueNumber
        result.SplitTradeTypeCount = TRADEOBJ.SplitTradeTypeCount
        result.TradeTypeCount =TRADEOBJ.TradeTypeARR
        result.ClusterCost = TRADEOBJ.ClusterCost
        result.Charts={
            JobTypeID:ChartGroupArrayData(TRADEOBJ.JobTypeIDARR),
            JobTypeName:ChartGroupArrayData(TRADEOBJ.JobTypeNameARR),
            TradeType:ChartGroupArrayData(TRADEOBJ.TradeTypeARR),
            JobTypeSum:ChartGroupArrayData(TRADEOBJ.JobTypeNameARR),
            JobTypeWorkOrderCount:TRADEOBJ.JobTypeWorkOrderCount
        }
    })

    */
   
    //console.log("FINAL RESULT ", Results)
    
    //store.dispatch({ type:'STORERESULTS', payload:Results}); 
}