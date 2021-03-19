import React, {useEffect} from 'react'
// Context
import {useContext_UX_FULL} from "Context/UX";

// Actions
import {OBJ_SITE_GLOBAL,OBJ_CLUSTER_GLOBAL} from "actions/CreateSingleViewModel"
// Template
import DiagramContainer from "Pages/Auth/Components/Layout/DiagramContainer"
import Stats_Bar from "Pages/Auth/Components/Layout/Stats_Bar";

// Chart
import Locaction_Radial_Clusters from 'Pages/Auth/SingleModelResult/Charts/Location_Radial_Clusters'
import Chart_Pie_OutofScope from 'Pages/Auth/SingleModelResult/Charts/Location_Pie_OutofScope'

const Locations_Radial_Pie_Charts=()=>{

    const UX = useContext_UX_FULL();  

    useEffect(()=>{  },[UX]);
    return(
        <DiagramContainer>
            
            <div className="resultCharts">
                <Locaction_Radial_Clusters />
                <Chart_Pie_OutofScope />
            </div> 
             
            <Stats_Bar data={OBJ_CLUSTER_GLOBAL()} name={`name`} value={`Appearances`}/>
            
        </DiagramContainer> 
    )
}

export default Locations_Radial_Pie_Charts;