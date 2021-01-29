import React, {useEffect, useState} from 'react'
import {useContext_SCAN_FULL} from "../../../../../Context/SCAN";
import {FindTradeTypeAllocation} from "../../../../../actions/ClusterAnalysis";


const ByTradeRatio = ()=>{
    const SCAN = useContext_SCAN_FULL();
    const Model = SCAN.SelectedModel;
    
    const [TradeAllocationTotal, setTradeAllocationTotal] = useState(0)
    const [TradeAllocation,setTradeAllocation] = useState([[],[]])
    
    const TradeWoRatioForDemo=(num)=>{
        return ((num/TradeAllocationTotal)*100).toFixed(2)
    }

    useEffect(()=>{
        let TWV=0
        FindTradeTypeAllocation(Model.STOREMARKERCENTERPOINTS)[1].map((value,i)=>{TWV= TWV+value})
        setTradeAllocationTotal(TWV)
    },[])
    
    return(
        <div className="ResultsHeader">
        <h4>Workorders by Trade Type</h4>
        <ul className="ClustersbyCategory">
            {
                TradeAllocation[0].map((trade,i)=>{
                    return(
                        <li key={i}>
                            <span>{TradeWoRatioForDemo(TradeAllocation[1][i])}%</span>
                            {trade} 
                        </li>
                    )
                })
            }
        </ul>
     
</div>
    )
}

export default ByTradeRatio;