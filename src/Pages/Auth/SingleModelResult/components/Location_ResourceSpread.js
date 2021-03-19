import React, {useEffect} from 'react'
// Context
import {useContext_UX_FULL} from "Context/UX";
import {useContext_SCAN_FULL} from "Context/SCAN";


// Layout
import DiagramContainer from "Pages/Auth/Components/Layout/DiagramContainer"

// Charts
import ClusterSwarmPlot from 'Pages/Auth/SingleModelResult/Charts/Clusters_SwarmPlot_Numbers'
import ClusterBar_ResourceAllocation from 'Pages/Auth/SingleModelResult/Charts/Cluster_Bar_ResourceAllocation'


const LocationResourceSpread = ()=>{
    const UX = useContext_UX_FULL(); 
    const MODEL = useContext_SCAN_FULL()
    useEffect(()=>{ },[UX, MODEL]) 

    return(
        <>
        <DiagramContainer>
            <ClusterSwarmPlot />
        </DiagramContainer>
        <DiagramContainer>
          <ClusterBar_ResourceAllocation /> 
        </DiagramContainer>
        </>
        
    ) 
}
export default LocationResourceSpread;