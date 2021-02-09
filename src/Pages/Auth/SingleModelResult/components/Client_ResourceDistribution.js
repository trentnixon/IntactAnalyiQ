import React, {useEffect, useState} from 'react'
// Context
import {useContext_UX_FULL} from "Context/UX";
// Actions
import {ChartData_ClustersBy_ResourceType, ChartData_SitesInScope, CreateObj_Clustertype_ResourceAllocation} from "actions/CreateSingleViewModel"
// Layout
import ChartHeader from "Pages/Auth/Components/Layout/ChartHeader";
// Chart
//import PieChart from "venders/apexCharts/SimplePie";
import RadialSIngleChart from "venders/apexCharts/RadialSIngleChart";
import { ResponsiveContainer,PieChart, Pie,Legend, Tooltip,Cell, FunnelChart, Funnel,LabelList} from 'recharts';
import {colorArray} from "actions/HandleUX";

const Chart1={
    Icon:'radial',
    Header:"Clusters as a Radial",
    Tip:"Use the Filters",
    Copy:"The Radial Graph shows the number of clusters per cluster type in a given model. Use the 'Resource Type' filter to find cluster numbers fopr a specific resource."
}

const Chart2={
    Icon:'pie',
    Header:"Sites covered in Model",
    Tip:"Use the Filters",
    Copy:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
}

const Locations_Radial_Pie_Charts=()=>{
    const UX = useContext_UX_FULL(); 
    const [CategoryOccurance,setCategoryOccurance ] = useState([[]]) 
    const [PieNumbers,setPieNumbers ] = useState([[]]) 
    
    useEffect(()=>{  
        setCategoryOccurance(ChartData_ClustersBy_ResourceType())
        setPieNumbers(ChartData_SitesInScope()) 
    },[UX]) 
    
    useEffect(()=>{ },[CategoryOccurance,PieNumbers])
    return(
        <div className="resultCharts">
            <div>
                <ChartHeader Icon={Chart1.Icon} Header={Chart1.Header}  Copy={Chart1.Copy} Tip={Chart1.Tip} />
                <RadialSIngleChart Data={CategoryOccurance} term={`Clusters`}/>
            </div>
            <div>
                
            </div>
        </div>
    )
}
export default Locations_Radial_Pie_Charts;

// <DisplayFunnel />
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