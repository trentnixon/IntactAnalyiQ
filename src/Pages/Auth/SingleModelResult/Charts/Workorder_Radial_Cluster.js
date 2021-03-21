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
    
    Tip:"Use the Filters",
    filters:['resource','client'],
    
}

const WorkOrder_Radial_Cluster=()=>{

    const MODEL = useContext_SCAN_FULL();
    const UX = useContext_UX_FULL();
    useEffect(()=>{ },[UX,MODEL])
    return(
        <div>
        <ChartHeader  Section='WorkOrders' Chart='Radial'  Meta='Radial_Workorder_Spread'/>
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