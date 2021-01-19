import React, {useEffect, useState} from 'react'
import {useContext_COMPARE_FULL} from "../../../../Context/COMPARE";
import {numberWithCommas} from "../../../../actions/HandleUX";
import { runInContext } from 'lodash';
const Title='Clusters';

const TableWorkOrders = ()=>{
    const COMPARE = useContext_COMPARE_FULL();
    const MODELS = COMPARE.CompareData.FetchedModels;
    const [Values, setValues] = useState([])
   
    useEffect(()=>{},[COMPARE])

    return(
        <div className="ComparisonRow">
            <div>{Title}</div>
            {Values}
            {
                MODELS.map((model,i)=>{
                    return(
                        <div key={i}> {numberWithCommas(model.CLUSTERSTATS.clusters)} </div>
                    )
                })
            }
        </div>
    )
} 

export default TableWorkOrders;


