import store from "../store/index"
//import axios from 'axios';
import {find, findIndex} from 'lodash'; 


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
            console.log(`${findTradeTypeName(id)} is missing a CPJ marker`)
        }
    })
    return ClusterCost
}


    const ResourcesRequired = (TradesUsed)=>{
            //console.log(TradesUsed);
            
    }

  const ChartGroupArrayData = (Compressed)=>{
    let CompressedForPie=[]
    Compressed[0].map((jt,i)=>{ CompressedForPie.push({ name: jt , value: Compressed[1][i] }) })
    return (CompressedForPie);
}

const findTradeTypeName = (id)=>{
    
    const TRADETYPE = store.getState().STRAPI.tradeType;
    let FoundType = find(TRADETYPE, function(o) { return o.id === id; })
    return FoundType.name
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



  const Removeinteriors = (Results)=>{
      console.log(Results)
      Results.map((results)=>{

      })
  }

export function ClusterAnalysis(Results){

    console.log("ClusterAnalysis", Results);
    
    const STRAPI = store.getState().STRAPI;
    // find the job types
     Results.map((result,i)=>{
        
        let TRADEOBJ = JobTypes(STRAPI.JobType,result);

        result.WorkOrdersTrueNumber = TRADEOBJ.WorkOrdersTrueNumber
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


    Removeinteriors(Results)

//    store.dispatch({ type:'STORERESULTS', payload:Results}); 
}