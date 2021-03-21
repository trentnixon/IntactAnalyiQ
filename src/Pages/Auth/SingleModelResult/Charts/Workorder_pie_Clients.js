import React, { useEffect }  from 'react'
import {useContext_SCAN_FULL} from "Context/SCAN";
import {useContext_UX_FULL} from "Context/UX";
import {OBJ_CLIENT_RESOURCES} from 'actions/CreateSingleViewModel'

// Layout
import ChartHeader from "Pages/Auth/Components/Layout/ChartHeader";
// Nivo 
import NivoPie from "venders/Nivo/NivoPie"
const Chart1={
    Icon:'pie',
    
    Tip:"Use the Filters",
    filters:['cluster','resource'],
   
}

const WorkOrder_Pie_ByClient=()=>{
    const MODEL = useContext_SCAN_FULL();
    const UX = useContext_UX_FULL();
    useEffect(()=>{ },[UX,MODEL])
    return(
        <div>
            <ChartHeader  Section='WorkOrders' Chart='Pie'  Meta='Pie_Client_Workorders'/> 
            <div style={{height: 300}}>
                <NivoPie data={OBJ_CLIENT_RESOURCES()} id={`name`} value={'Work Orders'} />
            </div>
        </div>
    )
}
export default WorkOrder_Pie_ByClient;

