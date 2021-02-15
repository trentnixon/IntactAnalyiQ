import React, {useEffect, useState} from 'react'
import {useContext_SCAN_FULL} from "Context/SCAN";
import {FindTradeTypeAllocation} from "actions/ClusterAnalysis";

// Template
import Section from "Pages/Auth/Components/Layout/Section"
import {H4,H2, P} from "Pages/Auth/Components/Type";
 
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
        <>
        <H2 Copy={`Workorders by Trade Type`} />
        <Section>
        
            <ul className="Stat_Bar">
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
        </Section>
        </>
    )
}

export default ByTradeRatio;