import React, {useEffect, useState} from 'react'
import {useContext_SCAN_FULL} from "Context/SCAN";
import {useContext_UX_FULL} from "Context/UX";
import {numberWithCommas} from "actions/HandleUX";
import {OBJ_RESOURCES_GLOBAL, WorkorderTotals} from "actions/CreateSingleViewModel"
// Layout
import ChartHeader from "Pages/Auth/Components/Layout/ChartHeader";
import Stats_Bar from "Pages/Auth/Components/Layout/Stats_Bar";
import DiagramContainer from "Pages/Auth/Components/Layout/DiagramContainer"
// Chart
import PieChart from "venders/apexCharts/SimplePie";

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,ResponsiveContainer,Legend, Tooltip} from 'recharts';
import {colorArray} from "actions/HandleUX";
// Nivo 
import NivoPie from "venders/Nivo/NivoPie"
import NivoRadial from "venders/Nivo/NivoRadial"
const Chart1={
    Icon:'radial',
    Header:"Work Orders Spread over Resource Type",
    Tip:"Use the Filters",
    Copy:"The Radial Graph shows the Work Order Spread over specific Resource Types. Use the 'Cluster Type' filter to find Work Order numbers for a specific resource."
}


const Trade_Radial_Charts=()=>{

    const SCAN = useContext_SCAN_FULL();
    const UX = useContext_UX_FULL();
    const MODELCENTER = SCAN.SelectedModel.STOREMARKERCENTERPOINTS
    const [CategoryOccurance,setCategoryOccurance ] = useState([[]]) 

    const PieData=[{ name: 'Work Orders In Scope',value: WorkorderTotals()[0]}, { name: 'Work Orders Out of Scope', value:WorkorderTotals()[1] }]
    useEffect(()=>{ 
        setCategoryOccurance(OBJ_RESOURCES_GLOBAL(['ByClusterType']))  
        console.log(CategoryOccurance)
    },[UX,SCAN]) 
    
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
                            data={CategoryOccurance} 
                            id={`name`} 
                            value={'Work Orders'} 
                            Label={'Work Orders'}
                        />
                    </div>
                </div>
                <div>
                 <ChartHeader 
                    Icon='pie'
                    Header="Work orders covered in Model"
                    Copy="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
                />
                   
                    <div style={{height: 300}}>
                        <NivoPie data={PieData} id={`name`} value={'value'} />
                    </div>

                </div>
            </div>

            <Stats_Bar data={OBJ_RESOURCES_GLOBAL(['ByClusterType'])} name={`name`} value={`Work Orders`}/> 
           
     </DiagramContainer>
    )
}

export default Trade_Radial_Charts;

/*

 <ResponsiveContainer width='100%' height={300}>
                        <RadarChart  outerRadius={100}  data={CategoryOccurance}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="name" />
                            <PolarRadiusAxis />
                            <Radar name={'Work Orders'} dataKey="Work Orders" stroke={colorArray[0]} fill={colorArray[0]} fillOpacity={0.6} />
                            <Tooltip />
                            <Legend />
                        </RadarChart>
                    </ResponsiveContainer>
                    
 <PieChart Data={[
                        { name: 'Work Orders In Scope',value: WorkorderTotals()[0]}, 
                        { name: 'Work Orders Out of Scope', value:WorkorderTotals()[1] }]}
                    />

*/