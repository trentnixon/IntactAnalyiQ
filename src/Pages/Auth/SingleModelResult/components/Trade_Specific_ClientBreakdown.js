import React, {useEffect, useState} from 'react'
import {useContext_UX_FULL} from "Context/UX";
import {useContext_SCAN_FULL} from "Context/SCAN";
import {CreateOBJ_ResourcesAgainstClients, CreateObj_Clustertype_ResourceAllocation} from "actions/CreateSingleViewModel"
import {colorArray} from "actions/HandleUX";

// Layout
import ChartHeader from "Pages/Auth/Components/Layout/ChartHeader";
import { ResponsiveContainer,PieChart, Pie,Legend, Tooltip,Cell, FunnelChart, Funnel,LabelList} from 'recharts';

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
    useEffect(()=>{   },[UX]) 

    return(
            <div className="resultCharts">
                        <DisplayPie />
                        <DisplayFunnel />
            </div>
    )
}
export default Resources_Client_Brekdown;



const DisplayPie = ()=>{

    const UX = useContext_UX_FULL();
    const [CategoryOccurance,setCategoryOccurance ] = useState([[]]) 
    useEffect(()=>{   
        setCategoryOccurance(CreateOBJ_ResourcesAgainstClients())  
    console.log(CategoryOccurance)},[UX]) 

    return(
                <div>   
                    <ChartHeader Icon={Chart1.Icon} Header={Chart1.Header}Tip={Chart1.Tip} Copy={Chart1.Copy} />
                
                    <div style={{ width: '100%', height: 400 }}>
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
                    </div>
                   
                </div>
    )
}

const DisplayFunnel=()=>{
    const UX = useContext_UX_FULL();
    const [ClusterOccurances,setClusterOccurances ] = useState([[]]) 
    useEffect(()=>{  setClusterOccurances(CreateObj_Clustertype_ResourceAllocation())},[UX]) 

    return(
        <div>
            <ChartHeader Icon={Chart2.Icon} Header={Chart2.Header}Tip={Chart2.Tip} Copy={Chart2.Copy} />
    
            <ResponsiveContainer width='100%' height={300}>
            <FunnelChart >
                <Tooltip />
                <Funnel
                    dataKey={`Resource_${UX.AreaSelectFilter.ByResourceType}`}
                    data={ClusterOccurances}
                    isAnimationActive
                >
                    <LabelList position="center" fill={colorArray[0]} stroke="none" dataKey="name" />
                </Funnel>
                </FunnelChart>
                </ResponsiveContainer>
        </div>
    )
}