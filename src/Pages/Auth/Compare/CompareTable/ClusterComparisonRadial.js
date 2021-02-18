import React from 'react'

import {OBJ_CLUSTER_GLOBAL} from "actions/CreateCompareModelView"
// Layout
import ChartHeader from "Pages/Auth/Components/Layout/ChartHeader";
import DiagramContainer from "Pages/Auth/Components/Layout/DiagramContainer"
// Nivo
import NivoRadial from "venders/Nivo/NivoRadial"

const Chart1={ 
    Icon:'pie',
    Header:"Cluster Comparison",
    Tip:"Use the Filters",
    Copy:"Graph shows the Cluster Comparison within the Model"
}


    const ClusterComparisonRadials =()=>{
        return(
            <DiagramContainer>
            <ChartHeader Icon={Chart1.Icon} Header={Chart1.Header}  Copy={Chart1.Copy} Tip={Chart1.Tip} />
            <div className="ComparisonRow">
                {
                    OBJ_CLUSTER_GLOBAL().map((SELETCED, i )=>{
                         
                        return(
                            <div style={{height: 300}}>
                            <NivoRadial 
                                    data={SELETCED} 
                                    id={`name`} 
                                    value={'Appearances'} 
                                    Label={'Clusters'}
                                />
                                </div>
                        )
                    })
                }
            </div>
            </DiagramContainer>
        )
    }

    export default ClusterComparisonRadials;