import React, {useEffect, useState} from 'react'
// Context
import {useContext_UX_FULL} from "Context/UX";
import {useContext_SCAN_FULL} from "Context/SCAN";
// Actions
import {OBJ_SITE_GLOBAL,OBJ_CLUSTER_GLOBAL} from "actions/CreateSingleViewModel"
// Template
import DiagramContainer from "Pages/Auth/Components/Layout/DiagramContainer"
import Stats_Bar from "Pages/Auth/Components/Layout/Stats_Bar";
import {H1} from "Pages/Auth/Components/Type";
// Layout
import ChartHeader from "Pages/Auth/Components/Layout/ChartHeader";
// Chart
import PieChart from "venders/apexCharts/SimplePie";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,ResponsiveContainer,Legend, Tooltip} from 'recharts';
import {colorArray} from "actions/HandleUX";

import NivoPie from "venders/Nivo/NivoPie"
import NivoRadial from "venders/Nivo/NivoRadial"

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
    const SCAN = useContext_SCAN_FULL();
    const MODEL = SCAN.SelectedModel;
    const [SiteBreakdown, setSiteBreakdown] = useState([])

    
   /* let ChartData=[
        { name: 'InScope', value: SiteBreakdown.length }, 
        { name: 'Out of Scope', value: MODEL.STORERESIDUALMARKERS.length }
    ]*/
   

let ChartData = [
    {  "id": 'InScope', "value": SiteBreakdown.length }, 
    { "id": 'Out of Scope', "value": MODEL.STORERESIDUALMARKERS.length },
 
  ]

    useEffect(()=>{ setSiteBreakdown(OBJ_SITE_GLOBAL()) },[UX]);
    return(
        <DiagramContainer>
            
        <div className="resultCharts">
            <div> 
                <ChartHeader Icon={Chart1.Icon} Header={Chart1.Header}  Copy={Chart1.Copy} Tip={Chart1.Tip} />
                
                <div style={{height: 300}}>
                    <NivoRadial 
                        data={OBJ_CLUSTER_GLOBAL()} 
                        id={`name`} 
                        value={'Appearances'} 
                        Label={'Clusters'}
                    />
                </div>
            </div>
            <div style={{height: 300}}>
                <ChartHeader Icon={Chart2.Icon} Header={Chart2.Header}  Copy={Chart2.Copy} Tip={Chart2.Tip} />
                <NivoPie data={ChartData} id={`id`} value={'value'}/>
            </div>
            
        </div> 

       
       

        <Stats_Bar data={OBJ_CLUSTER_GLOBAL()} id={`name`} value={`Appearances`}/>
        
        </DiagramContainer>
    )
}
//  <PieChart Data={ChartData}/> 
export default Locations_Radial_Pie_Charts;

/*
<ResponsiveContainer width='100%' height={300}>
                    <RadarChart  outerRadius={100}  data={OBJ_CLUSTER_GLOBAL()}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="name" />
                        <PolarRadiusAxis />
                        <Radar name={'Clusters'} dataKey="Appearances" stroke={colorArray[0]} fill={colorArray[0]} fillOpacity={0.6} />
                        <Tooltip />
                        <Legend /> 
                    </RadarChart>
                </ResponsiveContainer> 
*/