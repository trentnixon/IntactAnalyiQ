import React, { useEffect }  from 'react'
// Context
import {useContext_SCAN_FULL} from "Context/SCAN";
import {useContext_UX_FULL} from "Context/UX";

import {OBJ_CLUSTER_GLOBAL} from 'actions/CreateSingleViewModel'

// Layout
import ChartHeader from "Pages/Auth/Components/Layout/ChartHeader";
// Nivo 

import NivoRadial from "venders/Nivo/NivoRadial"

const Chart1={
    Icon:'radial',
    Header:"Client Work Order Spread",
    Tip:"Use the Filters",
    filters:['resource','client'],
    Copy:`The chart details the work orders in the model spread over clients`
}

const WorkOrder_Radial_Cluster=()=>{

    const MODEL = useContext_SCAN_FULL();
    const UX = useContext_UX_FULL();
    useEffect(()=>{ },[UX,MODEL])
    return(
        <div>
        <ChartHeader  Section='Locations' Chart='Pie'  Meta='Pie'/>
        <div style={{height: 300}}>
            <NivoRadial 
                data={OBJ_CLUSTER_GLOBAL()} 
                id={`name`} 
                value={'Work Orders'} 
                Label={'Work Orders'}
            />
        </div>

    </div>
    )
}
export default WorkOrder_Radial_Cluster;