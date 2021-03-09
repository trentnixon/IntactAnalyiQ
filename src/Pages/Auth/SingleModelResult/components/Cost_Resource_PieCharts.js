import React, {useEffect} from 'react'

// Actions
import {OBJ_RESOURCES_GLOBAL} from "actions/CreateSingleViewModel"

// Layout
import DiagramContainer from "Pages/Auth/Components/Layout/DiagramContainer"
import Stats_Bar from "Pages/Auth/Components/Layout/Stats_Bar";

import Resources_Radial_Resources from "Pages/Auth/SingleModelResult/Charts/Resource_Radial_Resources"
import Cost_Pie_ResourceAllocationCost from "Pages/Auth/SingleModelResult/Charts/Cost_Pie_ResourceAllocationCost"

const Trade_Radial_Charts=()=>{

    useEffect(()=>{},[]) 
    
    return(
        <DiagramContainer>
            <div className="resultCharts">
                <Cost_Pie_ResourceAllocationCost />
            </div>
 
            <Stats_Bar data={OBJ_RESOURCES_GLOBAL(['ByClusterType','ByClient'])} name={`name`} value={`ResourceCost`}/>
        </DiagramContainer>
    )
}
export default Trade_Radial_Charts;