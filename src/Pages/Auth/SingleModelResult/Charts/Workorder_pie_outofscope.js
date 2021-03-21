import React, {useEffect, useState} from 'react'
import {useContext_SCAN_FULL} from "Context/SCAN";
import {useContext_UX_FULL} from "Context/UX";
import {OBJ_RESOURCES_GLOBAL, WorkorderTotals} from "actions/CreateSingleViewModel"
// Layout
import ChartHeader from "Pages/Auth/Components/Layout/ChartHeader";

// Nivo 
import NivoPie from "venders/Nivo/NivoPie"

const Chart1={
    Icon:'radial',
    
    Tip:"Use the Filters",
    filters:[''],
    Header:"Work Orders Spread over Resource Type",
    Copy:"The Radial Graph shows the Work Order Spread over specific Resource Types. Use the 'Cluster Type' filter to find Work Order numbers for a specific resource."
}


const Workorder_pie_outofscope=()=>{

    const MODEL = useContext_SCAN_FULL();
    const UX = useContext_UX_FULL();
    const [PieData, setPieData] = useState([])
  
  
    useEffect(()=>{ 
        setPieData([{ name: 'Work Orders In Scope',value: WorkorderTotals()[0]}, { name: 'Work Orders Out of Scope', value:WorkorderTotals()[1] }])
    },[UX,MODEL]) 
    
    return(
        <div>
            <ChartHeader Section='WorkOrders' Chart='Pie'  Meta='Pie_Workorders_Inscope'/>                       
            <div style={{height: 300}}>
                <NivoPie data={PieData} id={`name`} value={'value'} />
            </div>
        </div>
    )
}

export default Workorder_pie_outofscope;
