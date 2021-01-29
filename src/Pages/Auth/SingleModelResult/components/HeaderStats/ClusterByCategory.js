import React, {useEffect, useState} from 'react'
import {useContext_SCAN_FULL} from "../../../../../Context/SCAN";
import {GroupArrayByOccurances} from "../../../../../actions/HandleUX";

const ClusterByCategory = () =>{
    const SCAN = useContext_SCAN_FULL();
    const [CategoryOccurance,setCategoryOccurance ] = useState([[]]) 

    const extractResults=()=>{
        let CategoryInt=[]
            SCAN.SelectedModel.STOREMARKERCENTERPOINTS.map((result,i)=>{
                CategoryInt.push(result.scanCategory)
                return true
            })
        setCategoryOccurance(GroupArrayByOccurances(CategoryInt))
    }

    useEffect(()=>{extractResults()},[SCAN])

    return(
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
    )
}

export default ClusterByCategory;