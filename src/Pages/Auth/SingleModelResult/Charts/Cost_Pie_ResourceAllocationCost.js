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
    Header:"Resources Cost breakdown",
    Tip:"Use the Filters",
    filters:['cluster'],
    Copy:"The Pie Graph  "
}


const Cost_ResourcePie_Charts=()=>{

    const UX = useContext_UX_FULL();
    const MODEL = useContext_SCAN_FULL();
    const [ResourceSpread,setResourceSpread ] = useState([[]]) 

    useEffect(()=>{
        setResourceSpread(OBJ_RESOURCES_GLOBAL(['ByClusterType','ByClient']))  
    },[UX,MODEL]) 
    
    return(
        <div>
            <ChartHeader  Section='Locations' Chart='Pie'  Meta='Pie'/>
            <div style={{height: 300}}>
                <NivoPie data={ResourceSpread} id={`name`} value={'ResourceCost'} />
            </div>
       </div>

    )
}
export default Cost_ResourcePie_Charts;