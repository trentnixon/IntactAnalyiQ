import React, { useEffect }  from 'react'

import {OBJ_CLIENT_RESOURCES, OBJ_CLUSTER_GLOBAL} from 'actions/CreateSingleViewModel'

// Chart
import Stats_Bar from "Pages/Auth/Components/Layout/Stats_Bar";
import DiagramContainer from "Pages/Auth/Components/Layout/DiagramContainer"

// Charts 
import Workorder_pie_Clients from 'Pages/Auth/SingleModelResult/Charts/Workorder_pie_Clients'
import Workorder_Radial_Cluster from 'Pages/Auth/SingleModelResult/Charts/Workorder_Radial_Cluster'


const WorkOrderByClient=()=>{
    useEffect(()=>{ },[])
    return(
        <DiagramContainer> 
        
            <div className="resultCharts">  
                <Workorder_pie_Clients /> 
               <Workorder_Radial_Cluster />
            </div>

            <Stats_Bar data={OBJ_CLIENT_RESOURCES()} name={`name`} value={`Work Orders`}/> 
            <Stats_Bar data={OBJ_CLUSTER_GLOBAL()} name={`name`} value={`Work Orders`}/> 
        </DiagramContainer>
    )
}
export default WorkOrderByClient;