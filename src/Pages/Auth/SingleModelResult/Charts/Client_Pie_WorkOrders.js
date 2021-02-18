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
    Header:"By Work Orders",
    Tip:"Use the Filters",
    Copy:"Graph shows the Work Order spread for each client within the Model"
}


const Client_Pie_Workorders= ()=>{
    const UX = useContext_UX_FULL(); 
    const MODEL = useContext_SCAN_FULL()
    const [ClientBreakDown,setClientBreakDown ] = useState([[]]) 
    
    useEffect(()=>{  setClientBreakDown(OBJ_CLIENT_GLOBAL_Filter())  },[UX,MODEL])
    
    return(
        <div>
            <ChartHeader Icon={Chart1.Icon} Header={Chart1.Header}  Copy={Chart1.Copy} Tip={Chart1.Tip} />
            <div style={{height: 300}}>
                        <NivoPie data={ClientBreakDown} id={`name`} value={'Work Orders'} />
                </div>
        </div> 
    )
}
export default Client_Pie_Workorders;
