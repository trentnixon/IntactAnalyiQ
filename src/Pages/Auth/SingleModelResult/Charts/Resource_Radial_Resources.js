import React, {useEffect, useState} from 'react'
// Context
import {useContext_UX_FULL} from "Context/UX";
import {useContext_SCAN_FULL} from "Context/SCAN";

// Actions
import {OBJ_RESOURCES_GLOBAL} from "actions/CreateSingleViewModel"

// Layout
import ChartHeader from "Pages/Auth/Components/Layout/ChartHeader";

import NivoRadial from "venders/Nivo/NivoRadial"
const Chart1={
    Icon:'radial',
    Header:"Resources Allocation to Cluster Type",
    Tip:"Use the Filters",
    filters:['cluster','resource','client'],
    Copy:"The Radial Graph shows the number of Resource Allocations by Cluster Type in a given model. Use the 'Cluster Type' filter to find Resource Allocation numbers for a specific resource."
}

const Resources_Radial_Resources = ()=>{

    const UX = useContext_UX_FULL();
    const MODEL = useContext_SCAN_FULL();
    const [ResourceSpread,setResourceSpread ] = useState([[]]) 

    useEffect(()=>{
        setResourceSpread(OBJ_RESOURCES_GLOBAL(['ByClusterType','ByClient']))  
    },[UX,MODEL]) 


    return(
        <div>
            <ChartHeader  {...Chart1}/>
            <div style={{height: 300}}> 
                <NivoRadial 
                    data={ResourceSpread} 
                    id={`name`} 
                    value={'Resources'} 
                    Label={'Resources'}
                />
            </div>
        </div>
    )
}

export default Resources_Radial_Resources;