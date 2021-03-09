import React, { useEffect, useState }  from 'react'
import {useContext_UX_FULL} from "Context/UX";

import {
    OBJ_CLIENT_GLOBAL_Filter,
    OBJ_RESOURCES_GLOBAL,
    OBJ_CLUSTER_GLOBAL
} from "actions/CreateSingleViewModel"
// Template
import Section from "Pages/Auth/Components/Layout/Section"
import Stats_Bar from "Pages/Auth/Components/Layout/Stats_Bar";
import {H2,H3,H4, P} from "Pages/Auth/Components/Type";
import DiagramContainer from "Pages/Auth/Components/Layout/DiagramContainer"
// Layout
import ChartHeader from "Pages/Auth/Components/Layout/ChartHeader";
// Chart
//import PieChart from "venders/apexCharts/SimplePie";
import { ResponsiveContainer,PieChart, Pie,Legend, Tooltip,Cell} from 'recharts';
import {colorArray} from "actions/HandleUX";

// Nivo 
import NivoPie from "venders/Nivo/NivoPie"

const Chart1={
    Icon:'pie',
    Header:"Client Resource Allocation",
    Tip:"Use the Filters",
    Copy:"Graph shows the Resource Allocation for the selected client"
}

const Chart2={
    Icon:'pie',
    Header:"Resources Cluster Spread",
    Tip:"Use the Filters",
    Copy:"Graph shows the Resource distribution for the selected client by Cluster"
}

/* ************************************** */
// CLient specific section
// Move to own file


const ClientResourceSpread = ()=>{
    const UX = useContext_UX_FULL();

    const [ClientSpread, setClientSpread] = useState([])
    const [ClientClusterSpread, setClientClusterSpread] = useState([])
    
    useEffect(()=>{
        setClientSpread(OBJ_RESOURCES_GLOBAL())
        setClientClusterSpread(OBJ_CLUSTER_GLOBAL())
        console.log(OBJ_CLUSTER_GLOBAL())
    },[UX])

    return(
        <>
        <H3 Copy={`Resource Spread`}/>
        <DiagramContainer>
            
        <div className="resultCharts">
            <div>
                <ChartHeader Icon={Chart1.Icon} Header={Chart1.Header}  Copy={Chart1.Copy} Tip={Chart1.Tip} />
                    <div style={{height: 300}}>
                        <NivoPie data={ClientSpread} id={`name`} value={'Resources'} />
                    </div>

              
            </div>

            <div>
               
                <ChartHeader Icon={Chart2.Icon} Header={Chart2.Header}  Copy={Chart2.Copy} Tip={Chart2.Tip} />
                <div style={{height: 300}}>
                        <NivoPie data={ClientClusterSpread} id={`name`} value={'Resource'} />
                    </div>

                   
            </div>
        </div>
            { ClientSpread.length !== 0 ? <ClientStatBar ClientSpread={ClientSpread} ClientClusterSpread={ClientClusterSpread}/>: false }
        </DiagramContainer>
        </>
    )
}

export default ClientResourceSpread;

const ClientStatBar = (props)=>{
    const {ClientClusterSpread, ClientSpread} = props
    return(<>
                <Stats_Bar data={ClientSpread} name={`name`} value={`Resources`}/>
                <Stats_Bar data={ClientClusterSpread} name={`name`} value={`Resource`}/>
        </>
    )
}
