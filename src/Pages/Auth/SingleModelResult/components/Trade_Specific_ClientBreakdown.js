import React, {useEffect, useState} from 'react'
import {useContext_UX_FULL} from "Context/UX";
//import {useContext_SCAN_FULL} from "Context/SCAN";
import {
    OBJ_CLIENT_RESOURCES,
    OBJ_CLUSTER_GLOBAL
} from "actions/CreateSingleViewModel"
import {colorArray} from "actions/HandleUX";

// Layout
import ChartHeader from "Pages/Auth/Components/Layout/ChartHeader";
import { ResponsiveContainer,PieChart, Pie,Legend, Tooltip,Cell, FunnelChart, Funnel,LabelList} from 'recharts';
import DiagramContainer from "Pages/Auth/Components/Layout/DiagramContainer"
import Stats_Bar from "Pages/Auth/Components/Layout/Stats_Bar";
import {H3} from "Pages/Auth/Components/Type";

// Nivo 
import NivoPie from "venders/Nivo/NivoPie"
import NivoFunnel from "venders/Nivo/NivoFunnel"

const Chart1={
    Icon:'pie',
    Header:"Resource Breakdown by Client",
    Tip:"Use the Filters",
    Copy:`This chart shows the breakdown of selected resource by Allocation spread over the clients in the Model`
}

const Chart2={
    Icon:'bar',
    Header:"Cluster Funnel",
    Tip:"Use the Filters",
    Copy:`The funnel below shows the Resource Allocation for the selected Trade type against the Cluster Types`
}

const Resources_Client_Brekdown=()=>{

    const UX = useContext_UX_FULL();
    useEffect(()=>{ },[UX]) 
    return(
        <>
        <H3 Copy={`Title Required`} />
        <DiagramContainer>
        
            <div className="resultCharts">
                <DisplayPie /> 
                <DisplayFunnel />
            </div>
            <Stats_Bar data={OBJ_CLIENT_RESOURCES()} name={`name`} value={`Sum`}/>
            <Stats_Bar data={OBJ_CLUSTER_GLOBAL()} name={`name`} value={`Resource_Count_${UX.AreaSelectFilter.ByResourceType}`}/>
        </DiagramContainer>
        </>
    )
}
export default Resources_Client_Brekdown;



const DisplayPie = ()=>{

    const UX = useContext_UX_FULL();
    const [CategoryOccurance,setCategoryOccurance ] = useState([[]]) 
    useEffect(()=>{ setCategoryOccurance(OBJ_CLIENT_RESOURCES())   },[UX]) 

    return( 
                <div>   
                    <ChartHeader Icon={Chart1.Icon} Header={Chart1.Header}Tip={Chart1.Tip} Copy={Chart1.Copy} />
                    

                    <div style={{height: 300}}>
                        <NivoPie data={CategoryOccurance} id={`name`} value={'Sum'} />
                    </div>
                </div>
    )
}

const DisplayFunnel=()=>{
    const UX = useContext_UX_FULL();
    const [FunnelData,setFunnelData ] = useState([[]]) 
    useEffect(()=>{  setFunnelData(OBJ_CLUSTER_GLOBAL(),) },[UX])  

    return(
        <div>
            <ChartHeader Icon={Chart2.Icon} Header={Chart2.Header}Tip={Chart2.Tip} Copy={Chart2.Copy} />
                    <div style={{height: 300}}>
                        <NivoFunnel data={FunnelData} id={`name`} value={'Resource'} />
                    </div>
        </div>
    )
}

/*

<ResponsiveContainer width='100%' height={300}>
                <FunnelChart >
                    <Tooltip />
                    <Funnel
                        dataKey={`Resource_Count_${UX.AreaSelectFilter.ByResourceType}`}
                        data={FunnelData}
                        isAnimationActive
                    >
                        <LabelList position="center" fill={colorArray[0]} stroke="none" dataKey="name" />
                    </Funnel>
                    </FunnelChart>
                </ResponsiveContainer> 

<ResponsiveContainer width='100%' height={300}>
                            <PieChart >
                                <Pie dataKey="Sum" isAnimationActive={false} data={CategoryOccurance}  outerRadius={80} fill="#ffbf00" label >
                                {
                                    CategoryOccurance.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colorArray[index]}/>
                                    ))
                                }   
                            </Pie>
                            <Tooltip />
                            <Legend /> 
                        </PieChart>
                    </ResponsiveContainer>
*/