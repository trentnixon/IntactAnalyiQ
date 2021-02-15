import React, {useEffect, useState} from 'react'
// Context
import {useContext_UX_FULL} from "Context/UX";
import {useContext_SCAN_FULL} from "Context/SCAN";
// Actions
import {OBJ_CLUSTER_GLOBAL,} from "actions/CreateSingleViewModel"

// Layout
import ChartHeader from "Pages/Auth/Components/Layout/ChartHeader";
import DiagramContainer from "Pages/Auth/Components/Layout/DiagramContainer"
// Charts
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer} from 'recharts';
import {colorArray} from "actions/HandleUX";

import NivoSwarmPlot from "venders/Nivo/NivoSwarmPlot"

const Chart1={
    Header:"Resource Allocation by Cluster Type",
    Tip:"Use the Filters",
    Icon:'bar',
    Copy:"Chart shows the Rescourse Allocation by the specific cluster types. Use the 'Resource Type' Filter to view a specific resource break down per Cluster Type"
}

const LocationResourceSpread = ()=>{

    const UX = useContext_UX_FULL();
    const MODEL = useContext_SCAN_FULL()
    const [BarData, setBarData] = useState([])
 
    useEffect(()=>{ 
        setBarData(OBJ_CLUSTER_GLOBAL()) 
    },[UX])

    return(
        <DiagramContainer>
            <div style={{height: 400}}>
                <NivoSwarmPlot data={MODEL.SelectedModel.STOREMARKERCENTERPOINTS} Group={`scanCategory`} value={'Work Orders'} Volume={`StripedSites`} />
            </div>

        <ChartHeader Icon={Chart1.Icon} Header={Chart1.Header}  Copy={Chart1.Copy} Tip={Chart1.Tip} />
            <ResponsiveContainer width='100%' height={300}>
             <BarChart
                  
                    data={BarData}
                    margin={{
                            top: 20, right: 0, left: 0, bottom: 0,
                    }}
                > 
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                        <Bar dataKey="Resource_Count_HandyMan" name="HandyMan" stackId="a" fill={colorArray[0]} />
                        <Bar dataKey="Resource_Count_Electrician" name="Electrician" stackId="a" fill={colorArray[1]} />
                        <Bar dataKey="Resource_Count_Plumber" name="Plumber" stackId="a" fill={colorArray[2]} />
                        <Bar dataKey="Resource_Count_Specialized" name="Specialized" stackId="a" fill={colorArray[3]} />
                   
                </BarChart>
                </ResponsiveContainer>
        </DiagramContainer>
    ) 
}
// '#030303', '#D4D4D3', '#313231', '#777777', '#999A9A', '#575757',  '#3A3A3A', '#787878', '#575757', '#444444'
export default LocationResourceSpread;