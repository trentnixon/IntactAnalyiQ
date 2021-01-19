import React, {useEffect, useState} from 'react'
import {useContext_SCAN_FULL} from "../../../Context/SCAN";
import ClusterResults from "./Results/ClusterResults";
import {GroupArrayByOccurances} from "../../../actions/HandleUX";
import {FindTradeTypeAllocation, findClientName} from "../../../actions/ClusterAnalysis";
import { Data } from '@react-google-maps/api';

const MarkerBasedResults = ()=>{
    const SCAN = useContext_SCAN_FULL();

    const CLUSTERSTATS = SCAN.SelectedModel.CLUSTERSTATS;
    
    const [Results, setResults] = useState(null)
    const [CategoryOccurance,setCategoryOccurance ] = useState([[]]) 
    const [TradeAllocation,setTradeAllocation] = useState([[],[]])


    const extractResults=()=>{
        //console.log(SCAN.SelectedModel.STOREMARKERCENTERPOINTS);

        let ResultArr=[];
        let CategoryInt=[]
            SCAN.SelectedModel.STOREMARKERCENTERPOINTS.map((result,i)=>{
                ResultArr.push( <li key={i}> <ClusterResults  result={result} i={i}/></li>)
                CategoryInt.push(result.scanCategory)
                return true
            })
            setResults(ResultArr);
            setCategoryOccurance(GroupArrayByOccurances(CategoryInt))
    }

    const gl=(data)=>{
        return data.length
    }

    useEffect(()=>{ 
     
        if(SCAN.SelectedModel.STOREMARKERCENTERPOINTS !==null){
            extractResults()
            setTradeAllocation(FindTradeTypeAllocation(SCAN.SelectedModel.STOREMARKERCENTERPOINTS));
        
        }
            
     
    },[SCAN]);

    return(
        <>
            <div className="ResultsHeader">
            
            <h2>Model Stats</h2>

            <h3>Clusters : {CLUSTERSTATS.clusters}</h3>
            <h3>Total Locations {gl(SCAN.SelectedModel.USERSELECTEDLIST)} </h3>
            <h3>Unaccommodated Locations : {CLUSTERSTATS.UnaccommodatedLocations}</h3>
            <h3>Locations Inscope {CLUSTERSTATS.Inscope} ({ ((CLUSTERSTATS.Inscope/gl(SCAN.SelectedModel.USERSELECTEDLIST)*100)).toFixed(2)}%)</h3>
            
            <hr />

                <h3>Clients Total Work Orders {CLUSTERSTATS.TotalWorkOrders}</h3>
                <h3>Work Orders Covered in model {CLUSTERSTATS.WorkOrdersCoveredInModel} ({((CLUSTERSTATS.WorkOrdersCoveredInModel/CLUSTERSTATS.TotalWorkOrders)*100).toFixed(2)}%)</h3>
            
            <hr />


            <h4>Model Work Orders by Client</h4>
            
            <ul className="">
                {
                    Object.keys(CLUSTERSTATS.ByClient).map(function(key, i) {
                        return(
                            <li key={i}>
                                {findClientName(key)} : {CLUSTERSTATS.ByClient[key]} 
                            </li>
                            )
                      })        
                }
            </ul>
            <hr />
            <h3>Resource Allocation : {CLUSTERSTATS.ResourceAllocation}</h3>
            <h3>Avg WO Completed per resource: {(CLUSTERSTATS.WorkOrdersCoveredInModel/CLUSTERSTATS.ResourceAllocation).toFixed(2)} ({((CLUSTERSTATS.WorkOrdersCoveredInModel/CLUSTERSTATS.ResourceAllocation)/250).toFixed(2)}) </h3>
         
            <hr />

            <h4>Trade Overview:</h4>
            <p>These numbers are just instances, not real numbers</p>
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

            <h4>Cluster by Tiers</h4>
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

            <ul className="ListResults">
                    {Results}
            </ul>
        </>
    )
}

export default MarkerBasedResults;