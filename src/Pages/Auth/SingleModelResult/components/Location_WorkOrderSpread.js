import React, {useEffect, useState} from 'react'
import {useContext_UX_FULL} from "Context/UX";
// Actions
import {OBJ_CLUSTER_GLOBAL} from "actions/CreateSingleViewModel"
// Layout
import ChartHeader from "Pages/Auth/Components/Layout/ChartHeader";
import DiagramContainer from "Pages/Auth/Components/Layout/DiagramContainer"
import {colorArray} from "actions/HandleUX";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer } from 'recharts';


  const Chart1={
    Header:"Work Orders Spread over Cluster Type",
    Tip:"Use the Filters",
    Icon:'bar',
    Copy:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
}

const LocationResourceSpread = ()=>{

    const UX = useContext_UX_FULL();
    const [BarData, setBarData] = useState([])
   

    useEffect(()=>{ setBarData(OBJ_CLUSTER_GLOBAL())   },[UX])

    useEffect(()=>{},[UX])
    return(
        <DiagramContainer>
            <ChartHeader Icon={Chart1.Icon} Header={Chart1.Header}  Copy={Chart1.Copy} Tip={Chart1.Tip} />
            <ResponsiveContainer width='100%' height={300}>
                <BarChart data={BarData} margin={{  top: 20, right: 0, left: 0, bottom: 0,}}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />

                        <Bar dataKey="work_order_HandyMan" name="HandyMan" stackId="a" fill={colorArray[0]} />
                        <Bar dataKey="work_order_Electrician" name="Electrician" stackId="a" fill={colorArray[1]} />
                        <Bar dataKey="work_order_Plumber" name="Plumber" stackId="a" fill={colorArray[2]} />
                        <Bar dataKey="work_order_Specialized" name="Specialized" stackId="a" fill={colorArray[3]} />
                    
                </BarChart>
            </ResponsiveContainer>
        </DiagramContainer>
    ) 
}
export default LocationResourceSpread;