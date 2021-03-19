import React, {useEffect, useState} from 'react'
// Context
import {useContext_UX_FULL} from "Context/UX";
import {useContext_SCAN_FULL} from "Context/SCAN";
// Actions
import {OBJ_DATESPREAD_TRADE} from "actions/CreateSingleViewModel"
// Layout
import ChartHeader from "Pages/Auth/Components/Layout/ChartHeader";
import {orderBy} from 'lodash'

// NIvo
import NivoLine from "venders/Nivo/NivoLine";


const Chart1={
    Icon:'line',
    
    Tip:"Use the Filters",
    filters:['cluster'],
    Header:"Resources Allocation over time",
    Copy:`The Bar Graph shows the number of Resource Allocations over the time period of the Model.`
}


const Trade_Radial_Charts=()=>{

    const UX = useContext_UX_FULL();
    const MODEL = useContext_SCAN_FULL();
    const [ResourcesOverTime,setResourcesOverTime ] = useState([[]]) 

    useEffect(()=>{ setResourcesOverTime(OBJ_DATESPREAD_TRADE()) },[UX,MODEL]) 
    
    useEffect(()=>{},[ResourcesOverTime]) 

    return(
        <div className="resultCharts">
        <div>
           <ChartHeader  Section='Resources' Chart='Line'  Meta='Line_Resources_OverTime'/>
            <div style={{height: 400}}>
                <NivoLine 
                    data={orderBy(ResourcesOverTime,'UnixDate')} 
                    Xaxis={`name`} 
                    Yaxis={UX.AreaSelectFilter.ByResourceType} 
                    value={'Resources'}
                    label = {`Resource Allocation`}
                />
            </div>
        </div>
    </div>
    )
}
export default Trade_Radial_Charts;