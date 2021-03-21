import React, {useEffect, useState} from 'react'
// Context
import {useContext_UX_FULL} from "Context/UX";
// Actions
import { OBJ_CLUSTER_GLOBAL,} from "actions/CreateSingleViewModel"

// Layout
import ChartHeader from "Pages/Auth/Components/Layout/ChartHeader";
import Stats_Bar from "Pages/Auth/Components/Layout/Stats_Bar"; 
import DiagramContainer from "Pages/Auth/Components/Layout/DiagramContainer"
import {H3} from "Pages/Auth/Components/Type";

// Chart
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,ResponsiveContainer,Legend, Tooltip, FunnelChart , Funnel,LabelList} from 'recharts';
import {colorArray} from "actions/HandleUX";

import NivoRadial from "venders/Nivo/NivoRadial"
import NivoFunnel from "venders/Nivo/NivoFunnel"

const Chart1={
    Icon:'radial',
   
    Tip:"Use the Filters",
   
}

const Chart2={
    Icon:'funnel',
    
    Tip:"Use the Filters",
    
}

const Locations_Radial_Pie_Charts=()=>{
    const UX = useContext_UX_FULL(); 
    const [ClientClusterSpread,setClientClusterSpread ] = useState([[]]) 
    
    useEffect(()=>{ setClientClusterSpread(OBJ_CLUSTER_GLOBAL()) },[UX]) 
    useEffect(()=>{ },[ClientClusterSpread])
 
    return(
        <>
        <H3 Copy={`Cluster distribution `}/>
        <DiagramContainer>
            <div className="resultCharts">
                <div>
                    <ChartHeader Section='Clients' Chart='Radial'  Meta='Radial_Selected_WorkordersByCluster' />
                   
                     
                    <div style={{height: 300}}>
                    <NivoRadial 
                            data={ClientClusterSpread} 
                            id={`name`} 
                            value={'Sum'} 
                            Label={'Clusters'}
                        />
                        </div>
                </div>
                <div>
                    <DisplayFunnel />
                </div>
        </div>
            { ClientClusterSpread.length !== 0 ? <ClientStatBar ClientClusterSpread={ClientClusterSpread}/>: false }
            </DiagramContainer>
        </>
    )
} 
export default Locations_Radial_Pie_Charts;


const DisplayFunnel=()=>{
    const UX = useContext_UX_FULL(); 
    const [ClusterOccurances,setClusterOccurances ] = useState([[]]) 

    useEffect(()=>{  setClusterOccurances(OBJ_CLUSTER_GLOBAL())},[UX]) 

    useEffect(()=>{},[ClusterOccurances])

    return(
        <div>
            <ChartHeader Section='Clients' Chart='Funnel'  Meta='Funnel_Selected_WorkordersByCluster'/>
                <div style={{height: 300}}>
                    <NivoFunnel data={ClusterOccurances} id={`name`} value={'Sum'} />
                </div>
        </div>
    )
}


const ClientStatBar = (props)=>{
    const {ClientClusterSpread} = props
    return(
       <>
            <Stats_Bar data={ClientClusterSpread} name={`name`} value={`Sum`}/>
       </>
    )
}