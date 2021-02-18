import React, {useEffect } from 'react'
import {useContext_SCAN_FULL} from "Context/SCAN";
import {useContext_UX_FULL} from "Context/UX";

import {OBJ_RESOURCES_GLOBAL} from "actions/CreateSingleViewModel"
// Layout

import Stats_Bar from "Pages/Auth/Components/Layout/Stats_Bar";
import DiagramContainer from "Pages/Auth/Components/Layout/DiagramContainer"


// Charts 
import Workorders_Radial_Workorders from 'Pages/Auth/SingleModelResult/Charts/Workorder_Radial_Workorders'
import Workorder_pie_outofscope from 'Pages/Auth/SingleModelResult/Charts/Workorder_pie_outofscope' 


const WorkOrderTradeCharts=()=>{

    const SCAN = useContext_SCAN_FULL();
    const UX = useContext_UX_FULL();
    useEffect(()=>{ },[UX,SCAN]) 
    
    return(
        <DiagramContainer>
            <div className="resultCharts">
                <Workorders_Radial_Workorders />
                <Workorder_pie_outofscope />
            </div>

            <Stats_Bar data={OBJ_RESOURCES_GLOBAL(['ByClusterType'])} name={`name`} value={`Work Orders`}/> 
           
     </DiagramContainer>
    )
}

export default WorkOrderTradeCharts;