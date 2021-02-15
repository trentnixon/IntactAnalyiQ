import React, {useEffect } from 'react'

// Context
import {useContext_UX_FULL} from "Context/UX";
import Stats_Bar from "Pages/Auth/Components/Layout/Stats_Bar";
// Actions
import {OBJ_CLUSTER_GLOBAL} from "actions/CreateSingleViewModel"

const ClusterByCategory = () =>{
    const UX = useContext_UX_FULL();
    useEffect(()=>{
     },[UX])

    return(
        <>
            <Stats_Bar data={OBJ_CLUSTER_GLOBAL()} name={`name`} value={`Appearances`}/> 
        </>
    )
}

export default ClusterByCategory;