import React, {useEffect, useState} from 'react'

// Context
import {useContext_UX_FULL} from "Context/UX";

// Actions
import {ClusterNumbersByResourceType} from "actions/CreateSingleViewModel"
import {GroupArrayByOccurances} from "actions/HandleUX";

const ClusterByCategory = () =>{

    const UX = useContext_UX_FULL();
    const [CategoryOccurance,setCategoryOccurance ] = useState([[]]) 

    useEffect(()=>{ 
        // Set State
            // Group returned Values
                // Get number of resources
        setCategoryOccurance(GroupArrayByOccurances(ClusterNumbersByResourceType())) 
    },[UX])
 
    return(
                <ul className="Stat_Bar">
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
    )
}

export default ClusterByCategory;