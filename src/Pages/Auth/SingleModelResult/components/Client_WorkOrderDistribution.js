import React, { useEffect, useState }  from 'react'
import {useContext_UX_FULL} from "Context/UX";

import {
    OBJ_CLUSTER_GLOBAL,
    OBJ_RESOURCES_GLOBAL
    
} from "actions/CreateSingleViewModel"
// Template
import Stats_Bar from "Pages/Auth/Components/Layout/Stats_Bar";
import DiagramContainer from "Pages/Auth/Components/Layout/DiagramContainer"
import {H3} from "Pages/Auth/Components/Type";
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
    
    Tip:"Use the Filters",
    
}

const Chart2={
    Icon:'pie',
    
    Tip:"Use the Filters",
    
}

/* ************************************** */
// CLient specific section
// Move to own file


const ClientWOrkOrderSpread = ()=>{
    const UX = useContext_UX_FULL();

    const [ClientSpread, setClientSpread] = useState([])
    const [ClientClusterSpread, setClientClusterSpread] = useState([])
    useEffect(()=>{
        setClientSpread(OBJ_RESOURCES_GLOBAL())
        setClientClusterSpread(OBJ_CLUSTER_GLOBAL())
    },[UX])

    return(
        <>
        <H3 Copy={`Work Order Spread distribution `}/>
        <DiagramContainer>
        <div className="resultCharts">
            <div>
                <ChartHeader Section='Clients' Chart='Pie'  Meta='Pie_Selected_WorkordersByClient' />
                <div style={{height: 300}}>
                        <NivoPie data={ClientSpread} id={`name`} value={'Work Orders'} />
                    </div>

                
            </div>
            <div>
                <ChartHeader Section='Clients' Chart='Pie'   Meta='Pie_Selected_WorkordersByCluster'/>

                <div style={{height: 300}}>
                        <NivoPie data={ClientClusterSpread} id={`name`} value={'Work Orders'} />
                    </div>
                
            </div>
        </div>
        { ClientSpread.length !== 0 ? <ClientStatBar ClientSpread={ClientSpread} ClientClusterSpread={ClientClusterSpread}/>: false }
        </DiagramContainer>
        </>
    )
}


export default ClientWOrkOrderSpread;

const ClientStatBar = (props)=>{
    const {ClientClusterSpread, ClientSpread} = props
    return(<>
            <Stats_Bar data={ClientSpread} name={`name`} value={`Work Orders`}/>
            <Stats_Bar data={ClientClusterSpread} name={`name`} value={`Work Orders`}/> 
        </>
    )
}