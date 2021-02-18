import React, {useEffect, useState} from 'react'
import {useContext_SCAN_FULL} from "Context/SCAN";
import {useContext_UX_FULL} from "Context/UX";

import {OBJ_RESOURCES_GLOBAL} from "actions/CreateSingleViewModel"
// Layout
import ChartHeader from "Pages/Auth/Components/Layout/ChartHeader";

import NivoRadial from "venders/Nivo/NivoRadial"
const Chart1={
    Icon:'radial',
    Header:"Work Orders Spread over Resource Type",
    Tip:"Use the Filters",
    Copy:"The Radial Graph shows the Work Order Spread over specific Resource Types. Use the 'Cluster Type' filter to find Work Order numbers for a specific resource."
}


const Workorders_Radial_Workorders=()=>{

    const MODEL = useContext_SCAN_FULL();
    const UX = useContext_UX_FULL();
 
    const [CategoryOccurance,setCategoryOccurance ] = useState([[]]) 

    useEffect(()=>{  setCategoryOccurance(OBJ_RESOURCES_GLOBAL(['ByClusterType'])) },[UX,MODEL]) 
    
    return(
        <div>
            <ChartHeader  Icon={Chart1.Icon} Header={Chart1.Header} Tip={Chart1.Tip} Copy={Chart1.Copy} />     
            <div style={{height: 300}}>
                <NivoRadial 
                    data={CategoryOccurance} 
                    id={`name`} 
                    value={'Work Orders'} 
                    Label={'Work Orders'}
                />
            </div>
        </div>
    )
}

export default Workorders_Radial_Workorders;
