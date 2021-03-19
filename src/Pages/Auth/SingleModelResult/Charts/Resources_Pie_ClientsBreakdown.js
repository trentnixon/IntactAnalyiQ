import React, {useEffect, useState} from 'react'
// Context
import {useContext_UX_FULL} from "Context/UX";
import {useContext_SCAN_FULL} from "Context/SCAN";

import {
    OBJ_CLIENT_RESOURCES,

} from "actions/CreateSingleViewModel"

// Layout
import ChartHeader from "Pages/Auth/Components/Layout/ChartHeader";

// Nivo 
import NivoPie from "venders/Nivo/NivoPie"

const Chart1={
    Icon:'pie',
   
    Tip:"Use the Filters",
    filters:['cluster'],
   
}

const Resources_Pie_ClientBreakdown = ()=>{

    const UX = useContext_UX_FULL();
    const MODEL = useContext_SCAN_FULL();
    const [CategoryOccurance,setCategoryOccurance ] = useState([[]]) 
    useEffect(()=>{ setCategoryOccurance(OBJ_CLIENT_RESOURCES())   },[UX,MODEL]) 

    return( 
                <div>   
                    <ChartHeader Section='Resources' Chart='Pie'  Meta='Pie_Selected_Locations'/>
                    <div style={{height: 300}}>
                        <NivoPie data={CategoryOccurance} id={`name`} value={'Sum'} />
                    </div>
                </div>
    )
}

export default Resources_Pie_ClientBreakdown;