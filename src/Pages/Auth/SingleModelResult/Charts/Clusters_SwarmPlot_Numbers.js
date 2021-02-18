import React, {useEffect, useState} from 'react'
// Context
import {useContext_UX_FULL} from "Context/UX";
import {useContext_SCAN_FULL} from "Context/SCAN";
import NivoSwarmPlot from "venders/Nivo/NivoSwarmPlot"
import ChartHeader from "Pages/Auth/Components/Layout/ChartHeader";

const Chart1={
    Header:"Resource Allocation by Cluster Type",
    Tip:"Use the Filters",
    Icon:'bar',
    Copy:"Chart shows the Rescourse Allocation by the specific cluster types. Use the 'Resource Type' Filter to view a specific resource break down per Cluster Type"
}

const ClusterSwarmPlot = ()=>{
    const UX = useContext_UX_FULL();
    const MODEL = useContext_SCAN_FULL()

    useEffect(()=>{},[UX,MODEL]);
    return(
        <>
            <ChartHeader Icon={Chart1.Icon} Header={Chart1.Header}  Copy={Chart1.Copy} Tip={Chart1.Tip} />
            <div style={{height: 400}}>
                <NivoSwarmPlot data={MODEL.SelectedModel.STOREMARKERCENTERPOINTS} Group={`scanCategory`} value={'Work Orders'} Volume={`StripedSites`} />
            </div>
        </>
    )
}

export default ClusterSwarmPlot;