import React, {useEffect,useState} from 'react'
// Context
import {useContext_UX_FULL} from "Context/UX";
import {useContext_SCAN_FULL} from "Context/SCAN";

// Actions
import {OBJ_SITE_GLOBAL} from "actions/CreateSingleViewModel"

// Layout
import ChartHeader from "Pages/Auth/Components/Layout/ChartHeader";

// nivo
import NivoPie from "venders/Nivo/NivoPie"

const Chart_Pie_OutofScope = ()=>{

    const UX = useContext_UX_FULL();  
    const SCAN = useContext_SCAN_FULL();
    const MODEL = SCAN.SelectedModel;

    const [SiteBreakdown, setSiteBreakdown] = useState([])

    let ChartData = [
        {  "id": 'InScope', "value": MODEL.SITESINSCOPE }, 
        { "id": 'Out of Scope', "value": MODEL.SITESOUTOFSCOPE },
        { "id": 'Partial Scope ', "value": MODEL.SITESINPARCITALSCOPE },
      ]

      useEffect(()=>{ setSiteBreakdown(OBJ_SITE_GLOBAL()) },[UX,SCAN]);

    return(
        <div> 
            <ChartHeader  Section='Locations' Chart='Pie'  Meta='Pie'/>
            
            <div style={{height: 300}}>
                <NivoPie data={ChartData} id={`id`} value={'value'}/>
            </div>
         </div>
    )
}

export default Chart_Pie_OutofScope;