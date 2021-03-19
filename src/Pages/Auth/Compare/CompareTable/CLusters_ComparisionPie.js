import React from 'react'

import {OBJ_CLUSTER_GLOBAL} from "actions/CreateCompareModelView"
// Layout
import ChartHeader from "Pages/Auth/Components/Layout/ChartHeader";
import DiagramContainer from "Pages/Auth/Components/Layout/DiagramContainer"
// Nivo
import NivoPie from "venders/Nivo/NivoPie"

const Chart1={ 
    Icon:'pie',
    Header:"Cluster Comparison",
    Tip:"Use the Filters",
    Copy:"Graph shows the Cluster Comparison within the Model"
}

const ClusterComparisonPie =()=>{
    return(
        <DiagramContainer> 
            <ChartHeader Section='Locations' Chart='Pie' Meta='Pie'/>
            <div className="ComparisonRow">
                {
                    OBJ_CLUSTER_GLOBAL().map((SELETCED, i )=>{
                        
                        return(
                            <div style={{height: 300}} key={i}>
                                <NivoPie data={SELETCED} id={`name`} value={'Appearances'} />
                            </div>
                        )
                    })
                }
            </div>
        </DiagramContainer>
    )
}

export default ClusterComparisonPie;