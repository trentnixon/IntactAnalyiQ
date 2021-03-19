import React, {useEffect} from 'react'
// Context
import {useContext_UX_FULL} from "Context/UX";
import {useContext_SCAN_FULL} from "Context/SCAN";
import {useContext_COMMS_FULL} from 'Context/COMMS'
// Actions
import {OBJ_CLUSTER_GLOBAL} from "actions/CreateSingleViewModel"
import NivoRadial from "venders/Nivo/NivoRadial"

import ChartHeader from "Pages/Auth/Components/Layout/ChartHeader";

const Chart1={
    Icon:'radial',
    Header:"Clusters as a Radial",
    Tip:"Use the Filters",
    filters:[''],
    Copy:"The Radial Graph shows the number of clusters per cluster type in a given model."
}

const Chart_Radial_Location_Clusters = ()=>{

    const UX = useContext_UX_FULL(); 
    const MODEL = useContext_SCAN_FULL();
   
    useEffect(()=>{},[UX, MODEL])
 
    return(
        <div>
            <ChartHeader  Section='Locations' Chart='Radial' Meta='Radial'/>

            <div style={{height: 300}}>
                <NivoRadial 
                    data={OBJ_CLUSTER_GLOBAL()} 
                    id={`name`} 
                    value={'Appearances'} 
                    Label={'Clusters'}
                />
            </div>
        </div>
    )
}

export default Chart_Radial_Location_Clusters;