import React, {useEffect, useState} from 'react'
import {OBJ_CLUSTER_GLOBAL, FindTotals, FindPercentageBewtweenTwoNumbers} from 'actions/CreateCompareModelView'
import {H2} from "Pages/Auth/Components/Type"
const ClusterRawNumbers = ()=>{
   
    const [RAW, setRAW] = useState([])
    useEffect(()=>{  setRAW(FindTotals(OBJ_CLUSTER_GLOBAL(),'Appearances' )) },[])
    useEffect(()=>{
        console.log(OBJ_CLUSTER_GLOBAL())
    },[])

    return(
        <>
            <div className="ComparisonRow">
                <div className="ShowInt"> <H2 Copy={`Clusters`} /></div>
                
                 {
                            RAW.map((int,i)=>{
                                return(
                                    <div key={i} className="ShowInt">
                                        {int} {FindPercentageBewtweenTwoNumbers(RAW,i)}
                                    </div>
                                )
                            })
                    }
        
            </div> 
        </>
    )
} 
export default ClusterRawNumbers;