import React, {useEffect, useState} from 'react'
// Context
import {useContext_UX_FULL} from "Context/UX"; 
import {useContext_SCAN_FULL} from "Context/SCAN";
// Actions
import {OBJ_CLIENT_GLOBAL_Filter } from "actions/CreateSingleViewModel"
// Layout
import ChartHeader from "Pages/Auth/Components/Layout/ChartHeader";
// Nivo 
import NivoPie from "venders/Nivo/NivoPie"

const Chart1={ 
    Icon:'pie',
   
    Tip:"Use the Filters",
    filters:['cluster','resource',],
    
}

const Client_Pie_Resources= ()=>{
    const UX = useContext_UX_FULL(); 
    const MODEL = useContext_SCAN_FULL()
    const [ClientBreakDown,setClientBreakDown ] = useState([[]]) 
    
    useEffect(()=>{ setClientBreakDown(OBJ_CLIENT_GLOBAL_Filter())  },[UX,MODEL])
    
 
    return(
        <div> 
            <ChartHeader Section='Clients' Chart='Pie'  Meta='Pie_Resources'/>
            <div style={{height: 300}}>
                <NivoPie data={ClientBreakDown} id={`name`} value={'Resources'} />
            </div>
        </div> 
    )
}
export default Client_Pie_Resources;
