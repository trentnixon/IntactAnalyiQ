import React, {useEffect} from 'react'
import {useContext_COMPARE_FULL} from "Context/COMPARE";


const TableHeader = ()=>{
    const COMPARE = useContext_COMPARE_FULL();
    
    useEffect(()=>{
        console.log(COMPARE.CompareData.UserSelected)
    },[COMPARE])
    

    return(
        <div className="ComparisonRow TableHeader">
            <div>&nbsp;</div>
            {
                COMPARE.CompareData.UserSelected.map((model,i)=>{
                    return(
                        <div key={i}>
                            <h2>{model.Name}</h2>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default TableHeader;