import React, {useEffect} from 'react'
import {useContext_COMPARE_FULL} from "Context/COMPARE";
import {numberWithCommas} from "actions/HandleUX";
import {FindTradeTypeAllocation} from "actions/ClusterAnalysis";
const Title='Model Trades';

const TableWorkOrders = ()=>{
    const COMPARE = useContext_COMPARE_FULL();
    const MODELS = COMPARE.CompareData.FetchedModels;
    
    useEffect(()=>{},[COMPARE])

    return(
        <div className="ComparisonRow">
            <div>{Title}</div>
            {
                        MODELS.map((model,i)=>{
                           let  Breakdown= FindTradeTypeAllocation(model.STOREMARKERCENTERPOINTS)
                            return(
                                <div key={i}>
                                    <DisplayBreakdown Breakdown={Breakdown}/>
                                </div>
                            )
                                
                        })
                    }
        </div>
    )
}

export default TableWorkOrders;

const DisplayBreakdown = (props)=>{
    const {Breakdown} = props
    return(
        <>
        {
              Breakdown[0].map((cat,i)=>{
                return(
                    <div key={i} className="AccordionData">
                        <div>{cat}</div>
                        <div>{Breakdown[1][i]}</div>
                    </div>
                )
            })
        }
        </>       
    )
}