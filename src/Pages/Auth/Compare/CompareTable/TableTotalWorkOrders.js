import React, {useEffect} from 'react'
import {useContext_COMPARE_FULL} from "../../../../Context/COMPARE";
import {numberWithCommas} from "../../../../actions/HandleUX";

const Title='Total Work Orders';

const TableWorkOrders = ()=>{
    const COMPARE = useContext_COMPARE_FULL();
    const MODELS = COMPARE.CompareData.FetchedModels;

    useEffect(()=>{ },[COMPARE])

    return(
        <div className="ComparisonRow">
            <div>{Title}</div>
            {
                MODELS.map((model,i)=>{
                    return(
                        <div key={i}> {numberWithCommas(model.CLUSTERSTATS.TotalWorkOrders)} </div>
                    )
                })
            }
        </div>
    )
} 
export default TableWorkOrders;