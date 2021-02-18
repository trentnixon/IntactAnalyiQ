import React, {useEffect} from 'react'

// Actions
import {OBJ_RESOURCES_GLOBAL} from "actions/CreateSingleViewModel"

// Layout
import DiagramContainer from "Pages/Auth/Components/Layout/DiagramContainer"
import Stats_Bar from "Pages/Auth/Components/Layout/Stats_Bar";

import Resources_Radial_Resources from "Pages/Auth/SingleModelResult/Charts/Resource_Radial_Resources"
import Resources_Bar_ResourceAllocation from "Pages/Auth/SingleModelResult/Charts/Resources_Pie_ResourceAllocation"

const Trade_Radial_Charts=()=>{

    useEffect(()=>{},[]) 
    
    return(
        <DiagramContainer>
            <div className="resultCharts">
                <Resources_Radial_Resources /> 
                <Resources_Bar_ResourceAllocation />
            </div>
 
            <Stats_Bar data={OBJ_RESOURCES_GLOBAL(['ByClusterType','ByClient'])} name={`name`} value={`Resources`}/>
        </DiagramContainer>
    )
}
export default Trade_Radial_Charts;