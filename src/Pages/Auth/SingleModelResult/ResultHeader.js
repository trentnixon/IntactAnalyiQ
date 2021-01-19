import React, {useEffect, useState} from 'react'
import {useContext_SCAN_FULL} from "../../../Context/SCAN";
import {GroupArrayByOccurances, HandleTZDate, numberWithCommas} from "../../../actions/HandleUX";

import {FindTradeTypeAllocation, findClientName} from "../../../actions/ClusterAnalysis";

const MarkerBasedResults = ()=>{
    const SCAN = useContext_SCAN_FULL();

    const CLUSTERSTATS = SCAN.SelectedModel.CLUSTERSTATS;
    
    const [CategoryOccurance,setCategoryOccurance ] = useState([[]]) 
    const [TradeAllocation,setTradeAllocation] = useState([[],[]])

    const extractResults=()=>{
        //console.log(SCAN.SelectedModel.STOREMARKERCENTERPOINTS);


        let CategoryInt=[]
            SCAN.SelectedModel.STOREMARKERCENTERPOINTS.map((result,i)=>{
                CategoryInt.push(result.scanCategory)
                return true
            })
            setCategoryOccurance(GroupArrayByOccurances(CategoryInt))
    }

    const gl=(data)=>{
        return data.length
    }

    useEffect(()=>{ 
        console.log(SCAN.SelectedModelMeta);
        if(SCAN.SelectedModel.STOREMARKERCENTERPOINTS !==null){
            extractResults()
            setTradeAllocation(FindTradeTypeAllocation(SCAN.SelectedModel.STOREMARKERCENTERPOINTS));
        }
            
    },[SCAN]);

    return(
        <>

            <div className="ModelSingleHeader">
                    <div className="created"><p>Created : {HandleTZDate(SCAN.SelectedModelMeta.createdAt)}</p></div>
                    <h2>Model : {SCAN.SelectedModelMeta.Name}</h2>
                    <p>{SCAN.SelectedModelMeta.Description}</p>
                    
            </div>

        
        <div className="MetaRow">
        <h2>Locations</h2>
                <div>
                    {CLUSTERSTATS.clusters}
                    <h3>Clusters </h3>
                    &nbsp;
                </div>
                <div>
                    {numberWithCommas(gl(SCAN.SelectedModel.USERSELECTEDLIST))}
                    <h3>Total Locations </h3>
                    &nbsp;
                </div>
                <div>
                 {numberWithCommas(CLUSTERSTATS.Inscope)} 
                    <h3>Locations Inscope </h3>
                    { ((CLUSTERSTATS.Inscope/gl(SCAN.SelectedModel.USERSELECTEDLIST)*100)).toFixed(2)}%
                </div>

                <div>
                    {numberWithCommas(CLUSTERSTATS.UnaccommodatedLocations)}
                    <h3>Unaccommodated</h3>
                    &nbsp;
                </div>
               
        </div>
        <div className="ResultsHeader">
                <ul className="ClustersbyCategory">
                    {
                        CategoryOccurance[0].map((cat,i)=>{
                            return(
                                <li key={i}>
                                        {cat} : {CategoryOccurance[1][i]}
                                </li>
                            )
                        })
                    }
                </ul>
           
            </div>

        
        <div className="MetaRow">
        <h2>Workorders</h2>
                <div>
                        {numberWithCommas(CLUSTERSTATS.TotalWorkOrders)}
                        <h3>Clients Total Work Orders </h3>
                        &nbsp;
                </div>
                <div>
                    {numberWithCommas(CLUSTERSTATS.WorkOrdersCoveredInModel)} 
                    
                    <h3>Work Orders Covered in model </h3>
                    {((CLUSTERSTATS.WorkOrdersCoveredInModel/CLUSTERSTATS.TotalWorkOrders)*100).toFixed(2)}%
                </div>
        </div>


        <div className="ResultsHeader">
             <ul className="">
                {
                    Object.keys(CLUSTERSTATS.ByClient).map(function(key, i) {
                        return(
                            <li key={i}>
                                <div>{findClientName(key)}</div>
                                <div>{CLUSTERSTATS.ByClient[key]} </div>
                            </li>
                            )
                      })        
                }
            </ul>
        </div>

        <div className="ResultsHeader">
                <h4>Workorders by Trade Type</h4>
                <ul className="ClustersbyCategory">
                    {
                        TradeAllocation[0].map((trade,i)=>{
                            return(
                                <li key={i}>
                                    {trade} {TradeAllocation[1][i]}
                                </li>
                            )
                        })
                    }
                </ul>
                <p>These numbers are just instances, not real work orders atm</p>
        </div>
        
        <div className="MetaRow">
        <h2>Resources</h2>
                <div>
                    {CLUSTERSTATS.ResourceAllocation}
                    <h3>Resource Allocation </h3>
                </div>
                <div>
                   {((CLUSTERSTATS.WorkOrdersCoveredInModel/CLUSTERSTATS.ResourceAllocation)/250).toFixed(2)}
                    <h3>Avg WO Completed per resource</h3>
                </div>
        </div>
        </>
    )
}

export default MarkerBasedResults;