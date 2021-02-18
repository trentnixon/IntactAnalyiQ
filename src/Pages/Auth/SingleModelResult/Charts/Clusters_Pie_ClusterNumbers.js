import React, {useEffect} from 'react'
// Context
import {useContext_UX_FULL} from "Context/UX";
import {useContext_SCAN_FULL} from "Context/SCAN";
// Actions
import {OBJ_CLUSTER_GLOBAL} from "actions/CreateSingleViewModel"

// Layout
import ChartHeader from "Pages/Auth/Components/Layout/ChartHeader";

// nivo
import NivoPie from "venders/Nivo/NivoPie"

const Chart2={
    Icon:'pie',
    Header:"Sites covered in Model",
    Tip:"Use the Filters",
    Copy:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
}

const Chart_Pie_OutofScope = ()=>{
    const MODEL = useContext_SCAN_FULL();
    const UX = useContext_UX_FULL();  
    useEffect(()=>{console.log(OBJ_CLUSTER_GLOBAL())},[UX,MODEL]);

    return(
        <div>
            <ChartHeader Icon={Chart2.Icon} Header={Chart2.Header}  Copy={Chart2.Copy} Tip={Chart2.Tip} />
            <div style={{height: 300}}>
            
                <NivoPie data={OBJ_CLUSTER_GLOBAL()} id={`name`} value={'Appearances'}/>
            </div>
        </div>
    )
}

export default Chart_Pie_OutofScope; 