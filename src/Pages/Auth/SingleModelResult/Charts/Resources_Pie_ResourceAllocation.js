import React, {useEffect, useState} from 'react'
// Context
import {useContext_UX_FULL} from "Context/UX";
import {useContext_SCAN_FULL} from "Context/SCAN";

// Actions
import {OBJ_RESOURCES_GLOBAL} from "actions/CreateSingleViewModel"

// Layout
import ChartHeader from "Pages/Auth/Components/Layout/ChartHeader";

import NivoPie from "venders/Nivo/NivoPie"

const Chart1={
    Icon:'pie',
    Header:"Resources Allocation to Cluster Type",
    Tip:"Use the Filters",
    filters:['cluster'],
    Copy:"The Pie Graph shows "
}


const Trade_Radial_Charts=()=>{

    const UX = useContext_UX_FULL();
    const MODEL = useContext_SCAN_FULL();
    const [ResourceSpread,setResourceSpread ] = useState([[]]) 

    useEffect(()=>{
        setResourceSpread(OBJ_RESOURCES_GLOBAL(['ByClusterType','ByClient']))  
    },[UX,MODEL]) 
    
    return(
        <div>
            <ChartHeader  Section='Resources' Chart='Pie'  Meta='Pie_Locations'/>
            <div style={{height: 300}}>
                <NivoPie data={ResourceSpread} id={`name`} value={'Resources'} />
            </div>
       </div>

    )
}
export default Trade_Radial_Charts;