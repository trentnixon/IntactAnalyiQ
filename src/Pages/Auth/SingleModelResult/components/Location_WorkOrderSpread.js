import React, {useEffect} from 'react'

// Layout

import DiagramContainer from "Pages/Auth/Components/Layout/DiagramContainer"
import ClusterBar_WorkOrders from 'Pages/Auth/SingleModelResult/Charts/Cluster_Bar_Workorders'

const LocationResourceSpread = ()=>{

    useEffect(()=>{},[])
    return(
        <DiagramContainer>
            <ClusterBar_WorkOrders />
        </DiagramContainer>
    ) 
}
export default LocationResourceSpread;