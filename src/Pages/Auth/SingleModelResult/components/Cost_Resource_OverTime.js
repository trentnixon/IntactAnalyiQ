import React, {useEffect} from 'react'

// Actions
import {OBJ_RESOURCES_GLOBAL} from "actions/CreateSingleViewModel"

// Layout
import DiagramContainer from "Pages/Auth/Components/Layout/DiagramContainer"
import Stats_Bar from "Pages/Auth/Components/Layout/Stats_Bar";

import Resources_Radial_Resources from "Pages/Auth/SingleModelResult/Charts/Resource_Radial_Resources"
import Cost_Resources_OverTime from "Pages/Auth/SingleModelResult/Charts/Cost_Resources_OverTime"

const Trade_Radial_Charts=()=>{

    useEffect(()=>{},[]) 
    
    return(
        <DiagramContainer>
            <div className="resultCharts">
                <Cost_Resources_OverTime />
            </div>
 
            
        </DiagramContainer>
    )
}
export default Trade_Radial_Charts;