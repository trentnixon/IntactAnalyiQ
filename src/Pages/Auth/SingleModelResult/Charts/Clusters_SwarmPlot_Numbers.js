import React, {useEffect, useState} from 'react'
// Context
import {useContext_UX_FULL} from "Context/UX";
import {useContext_SCAN_FULL} from "Context/SCAN";
import NivoSwarmPlot from "venders/Nivo/NivoSwarmPlot"
import ChartHeader from "Pages/Auth/Components/Layout/ChartHeader";


const ClusterSwarmPlot = ()=>{
    const UX = useContext_UX_FULL();
    const MODEL = useContext_SCAN_FULL()

    useEffect(()=>{},[UX,MODEL]);
    return(
        <>
            <ChartHeader  Section='Locations' Chart='Swarm'  Meta='Swarm'/>
            <div style={{height: 400}}>
                <NivoSwarmPlot data={MODEL.SelectedModel.STOREMARKERCENTERPOINTS} Group={`scanCategory`} value={'Work Orders'} Volume={`StripedSites`} />
            </div>
        </>
    )
}

export default ClusterSwarmPlot;