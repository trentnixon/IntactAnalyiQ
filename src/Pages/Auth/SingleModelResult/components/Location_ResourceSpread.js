import React, {useEffect, useState} from 'react'
// Context
import {useContext_UX_FULL} from "Context/UX";
// Actions
import {CreateObj_Clustertype_ResourceAllocation} from "actions/CreateSingleViewModel"

// Layout
import ChartHeader from "Pages/Auth/Components/Layout/ChartHeader";
import Section from "Pages/Auth/Components/Layout/Section"

// Charts
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer} from 'recharts';


const Chart1={
    Header:"Resource Allocation by Cluster Type",
    Tip:"Use the Filters",
    Icon:'bar',
    Copy:"Chart shows the Rescourse Allocation by the specific cluster types. Use the 'Resource Type' Filter to view a specific resource break down per Cluster Type"
}

const LocationResourceSpread = ()=>{

    const UX = useContext_UX_FULL();
    const [BarData, setBarData] = useState([])
 
    useEffect(()=>{ setBarData(CreateObj_Clustertype_ResourceAllocation()) },[UX])

    return(
        <Section>
      
        <ChartHeader Icon={Chart1.Icon} Header={Chart1.Header}  Copy={Chart1.Copy} Tip={Chart1.Tip} />
            <ResponsiveContainer width='100%' height={300}>
             <BarChart
                  
                    data={BarData}
                    margin={{
                            top: 20, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Resource_HandyMan" stackId="a" fill="#030303" />
                    <Bar dataKey="Resource_Electrician" stackId="a" fill="#575757" />
                    <Bar dataKey="Resource_Plumber" stackId="a" fill="#D4D4D3" />
                    <Bar dataKey="Resource_Specialized" stackId="a" fill="#3A3A3A" />
                   
                </BarChart>
                </ResponsiveContainer>
        </Section>
    ) 
}
// '#030303', '#D4D4D3', '#313231', '#777777', '#999A9A', '#575757',  '#3A3A3A', '#787878', '#575757', '#444444'
export default LocationResourceSpread;