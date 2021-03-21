import React, {useEffect, useState} from 'react'
// Context
import {useContext_UX_FULL} from "Context/UX";
import {useContext_SCAN_FULL} from "Context/SCAN";
// Actions
import {OBJ_CLIENT_GLOBAL_Filter,NivoSunBurst } from "actions/CreateSingleViewModel"
// Layout
import ChartHeader from "Pages/Auth/Components/Layout/ChartHeader";
// Nivo 
import NivoSunburst from "venders/Nivo/NivoSunburst"

const Client_Pie_Resources= ()=>{
    const UX = useContext_UX_FULL(); 
    const MODEL = useContext_SCAN_FULL()
    const [ClientBreakDown,setClientBreakDown ] = useState([[]]) 
    
    useEffect(()=>{ 
         
        setClientBreakDown(OBJ_CLIENT_GLOBAL_Filter())  
    
    },[UX,MODEL])
    
 
    return(
        <div>
            <ChartHeader Section='Clients' Chart='Sunburst'  Meta='Sunburst'/>
            <div style={{height: 300}}>
                <NivoSunburst data={NivoSunBurst()} id={`name`} value={'Resources'} />
            </div> 
        </div> 
    )
}
export default Client_Pie_Resources;
