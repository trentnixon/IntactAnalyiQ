import React, {useEffect, useState} from 'react'
// Context
import {useContext_UX_FULL} from "Context/UX";

// Actions
import {OBJ_RESOURCES_GLOBAL} from "actions/CreateSingleViewModel"

// Layout
import ChartHeader from "Pages/Auth/Components/Layout/ChartHeader";
import DiagramContainer from "Pages/Auth/Components/Layout/DiagramContainer"
import Stats_Bar from "Pages/Auth/Components/Layout/Stats_Bar";


// Chart
import { Radar, RadarChart, PolarGrid,PieChart,Pie,Cell, PolarAngleAxis, PolarRadiusAxis,ResponsiveContainer,Legend, Tooltip} from 'recharts';
import {colorArray} from "actions/HandleUX";

import NivoPie from "venders/Nivo/NivoPie"
import NivoRadial from "venders/Nivo/NivoRadial"
const Chart1={
    Icon:'radial',
    Header:"Resources Allocation to Cluster Type",
    Tip:"Use the Filters",
    Copy:"The Radial Graph shows the number of Resource Allocations by Cluster Type in a given model. Use the 'Cluster Type' filter to find Resource Allocation numbers for a specific resource."
}


const Trade_Radial_Charts=()=>{

    const UX = useContext_UX_FULL();
   
    const [ResourceSpread,setResourceSpread ] = useState([[]]) 

    useEffect(()=>{
        setResourceSpread(OBJ_RESOURCES_GLOBAL(['ByClusterType','ByClient']))  
    },[UX]) 
    
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
                        <NivoRadial 
                            data={ResourceSpread} 
                            id={`name`} 
                            value={'Resources'} 
                            Label={'Resources'}
                        />
                    </div>

                </div>
                <div>

                 <ChartHeader 
                    Icon='pie'
                    Header="Resource Split by Cluster type"
                    Copy="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
                />
                  

                  

                    <div style={{height: 300}}>
                        <NivoPie data={ResourceSpread} id={`name`} value={'Resources'} />
                    </div>
                </div>
            </div>

            <Stats_Bar data={OBJ_RESOURCES_GLOBAL(['ByClusterType','ByClient'])} name={`name`} value={`Resources`}/>
            </DiagramContainer>
    )
}
export default Trade_Radial_Charts;

/*
 <ResponsiveContainer width='100%' height={300}>
                        <RadarChart  outerRadius={100}  data={ResourceSpread}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="name" />
                            <PolarRadiusAxis />
                            <Radar name={`Resource Allocation`} dataKey="Resources" stroke={colorArray[0]} fill={colorArray[0]} fillOpacity={0.6} />
                            <Tooltip />
                            <Legend />
                        </RadarChart>
                    </ResponsiveContainer>
  <ResponsiveContainer width='100%' height={300}>
                        <PieChart >
                            <Pie dataKey="Resources" isAnimationActive={false} data={ResourceSpread}  outerRadius={80} fill="#ffbf00" label >
                            {
                                ResourceSpread.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colorArray[index]}/>
                                ))
                            }   
                        </Pie>
                        <Tooltip />
                        <Legend /> 
                        </PieChart>
                        
                    </ResponsiveContainer>
*/