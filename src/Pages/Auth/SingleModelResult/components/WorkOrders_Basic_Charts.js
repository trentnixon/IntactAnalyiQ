import React, { useEffect }  from 'react'
import {numberWithCommas} from "actions/HandleUX";
import {OBJ_CLIENT_RESOURCES, OBJ_CLUSTER_GLOBAL} from 'actions/CreateSingleViewModel'

// Chart
//import PieChart from "venders/apexCharts/SimplePie";
import { ResponsiveContainer,PieChart, Pie,Legend, Tooltip,Cell,Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis} from 'recharts';
import Stats_Bar from "Pages/Auth/Components/Layout/Stats_Bar";
import DiagramContainer from "Pages/Auth/Components/Layout/DiagramContainer"
import {colorArray} from "actions/HandleUX";

// Layout
import ChartHeader from "Pages/Auth/Components/Layout/ChartHeader";
// Nivo 
import NivoPie from "venders/Nivo/NivoPie"
import NivoRadial from "venders/Nivo/NivoRadial"
const Chart1={
    Icon:'pie',
    Header:"Client Work Order Spread",
    Tip:"Use the Filters",
    Copy:`The chart details the work orders in the model spread over clients`
}

const Chart2={
    Icon:'pie',
    Header:"Cluster Work Order Spread",
    Tip:"Use the Filters",
    Copy:`The chart details the work orders in the model spread over Clusters`
}

const WorkOrderByClient=()=>{

    useEffect(()=>{
        console.log(OBJ_CLUSTER_GLOBAL())
    },[])
    return(
        <DiagramContainer> 
        
            <div className="resultCharts"> 
           
                <div>
                <ChartHeader 
                        Icon={Chart1.Icon}
                        Header={Chart1.Header}  
                        Tip={Chart1.Tip} 
                        Copy={Chart1.Copy}
                    />
                    <div style={{height: 300}}>
                        <NivoPie data={OBJ_CLIENT_RESOURCES()} id={`name`} value={'Work Orders'} />
                    </div>

                    
                </div>

                <div>
                    <ChartHeader 
                        Icon={Chart2.Icon}
                        Header={Chart2.Header}
                        Tip={Chart2.Tip}
                        Copy={Chart2.Copy}
                    />
                    
                   

                    <div style={{height: 300}}>
                        <NivoRadial 
                            data={OBJ_CLUSTER_GLOBAL()} 
                            id={`name`} 
                            value={'Work Orders'} 
                            Label={'Work Orders'}
                        />
                    </div>

                </div>
            </div>

            <Stats_Bar data={OBJ_CLIENT_RESOURCES()} name={`name`} value={`Work Orders`}/> 
            <Stats_Bar data={OBJ_CLUSTER_GLOBAL()} name={`name`} value={`Work Orders`}/> 
        </DiagramContainer>
    )
}
export default WorkOrderByClient;


/*
 <ResponsiveContainer width='100%' height={300}>
                        <RadarChart  outerRadius={100}  data={OBJ_CLUSTER_GLOBAL()}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="name" />
                            <PolarRadiusAxis />
                            <Radar name={'Work Orders'} dataKey="Work Orders" stroke={colorArray[0]} fill={colorArray[0]} fillOpacity={0.6} />
                            <Tooltip />
                            <Legend />
                        </RadarChart>
                    </ResponsiveContainer>
<ResponsiveContainer width='100%' height={300}>
                        <PieChart >
                            <Pie dataKey="Work Orders" isAnimationActive={false} data={OBJ_CLIENT_RESOURCES()}  outerRadius={80} fill="#ffbf00" label >
                            {
                                OBJ_CLIENT_RESOURCES().map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colorArray[index]}/>
                                ))
                            }   
                        </Pie>
                        <Tooltip />
                        <Legend /> 
                        </PieChart>
                    </ResponsiveContainer>

*/