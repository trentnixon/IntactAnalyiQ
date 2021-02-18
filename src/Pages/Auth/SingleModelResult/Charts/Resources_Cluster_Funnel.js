import React, {useEffect, useState} from 'react'
import {useContext_UX_FULL} from "Context/UX";
//import {useContext_SCAN_FULL} from "Context/SCAN";
import { OBJ_CLUSTER_GLOBAL} from "actions/CreateSingleViewModel"

// Layout
import ChartHeader from "Pages/Auth/Components/Layout/ChartHeader";

// Nivo 
import NivoFunnel from "venders/Nivo/NivoFunnel"

const Chart2={
    Icon:'bar',
    Header:"Cluster Funnel",
    Tip:"Use the Filters",
    Copy:`The funnel below shows the Resource Allocation for the selected Trade type against the Cluster Types`
}

const Resource_Cluster_Funnel=()=>{
    const UX = useContext_UX_FULL();
    const [FunnelData,setFunnelData ] = useState([[]]) 
    useEffect(()=>{  setFunnelData(OBJ_CLUSTER_GLOBAL(),) },[UX])  

    return(
        <div>
            <ChartHeader Icon={Chart2.Icon} Header={Chart2.Header}Tip={Chart2.Tip} Copy={Chart2.Copy} />
                    <div style={{height: 300}}>
                        <NivoFunnel data={FunnelData} id={`name`} value={'Resource'} />
                    </div>
        </div>
    )
}
export default Resource_Cluster_Funnel;