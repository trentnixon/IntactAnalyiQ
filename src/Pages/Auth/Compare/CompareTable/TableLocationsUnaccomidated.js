import React, {useEffect} from 'react'
import {useContext_COMPARE_FULL} from "../../../../Context/COMPARE";
import {numberWithCommas} from "../../../../actions/HandleUX";

const Title='Locations unaccommodated';
const Title2='unaccommodated %';

const TableWorkOrders = ()=>{
    const COMPARE = useContext_COMPARE_FULL();
    const MODELS = COMPARE.CompareData.FetchedModels;

    useEffect(()=>{ },[COMPARE])

    return(
        <>
        <div className="ComparisonRow">
            <div>{Title}</div>
            {
                MODELS.map((model,i)=>{
                    return(
                        <div key={i}> 
                            {numberWithCommas(model.CLUSTERSTATS.UnaccommodatedLocations)}  
                        </div>
                    )
                })
            }
        </div>
        <div className="ComparisonRow">
            <div>{Title2}</div>
            {
                MODELS.map((model,i)=>{
                    return(
                        <div key={i}> 
                            {((model.CLUSTERSTATS.UnaccommodatedLocations/model.USERSELECTEDLIST.length)*100).toFixed(2)}%
                        </div>
                    )
                })
            }
        </div>
        </>
    )
}
export default TableWorkOrders;