import React, {useEffect, useState} from 'react'
// Context
import {useContext_UX_FULL} from "Context/UX";
// Actions
import {OBJ_CLIENT_GLOBAL_Filter } from "actions/CreateSingleViewModel"
// Layout
import ChartHeader from "Pages/Auth/Components/Layout/ChartHeader";
import DiagramContainer from "Pages/Auth/Components/Layout/DiagramContainer"
// Chart
//import PieChart from "venders/apexCharts/SimplePie";
import { ResponsiveContainer,PieChart, Pie,Legend, Tooltip,Cell} from 'recharts';
import {colorArray} from "actions/HandleUX";

import ClientResourceSiteStatsBar from "Pages/Auth/SingleModelResult/components/Clients_Site_Resource_StatsBar";
// Nivo 
import NivoPie from "venders/Nivo/NivoPie"

const Chart1={
    Icon:'pie',
    Header:"By Resource Allocation",
    Tip:"Use the Filters",
    Copy:"Graph shows the Resource Allocation to each client within the Model"
}

const Chart2={
    Icon:'pie',
    Header:"By Location",
    Tip:"Use the Filters",
    Copy:"Graph shows the site distribution by client over the Model "
}

const Chart3={
    Icon:'pie',
    Header:"By Workorders",
    Tip:"Use the Filters",
    Copy:"Graph shows the Work Order distribution by client over the Model "
}

const Locations_Radial_Pie_Charts=()=>{
    const UX = useContext_UX_FULL(); 
    const [ClientBreakDown,setClientBreakDown ] = useState([[]]) 
    
    useEffect(()=>{ 
        setClientBreakDown(OBJ_CLIENT_GLOBAL_Filter()) 
        console.log(OBJ_CLIENT_GLOBAL_Filter())
    },[UX])
    
 
    return(
        <DiagramContainer>
        <div className="resultCharts">
            <div>
                <ChartHeader Icon={Chart1.Icon} Header={Chart1.Header}  Copy={Chart1.Copy} Tip={Chart1.Tip} />

                    <div style={{height: 300}}>
                        <NivoPie data={ClientBreakDown} id={`name`} value={'Resources'} />
                    </div>
            </div> 
            <div>
                <ChartHeader Icon={Chart2.Icon} Header={Chart2.Header}  Copy={Chart2.Copy} Tip={Chart2.Tip} />
                <div style={{height: 300}}>
                        <NivoPie data={ClientBreakDown} id={`name`} value={'Total Sites'} />
                    </div>
               
            
            </div> 
            <div>
                <ChartHeader Icon={Chart3.Icon} Header={Chart3.Header}  Copy={Chart3.Copy} Tip={Chart3.Tip} />
                <div style={{height: 300}}>
                        <NivoPie data={ClientBreakDown} id={`name`} value={'Work Orders'} />
                    </div>
               
            </div> 
        </div>
        <ClientResourceSiteStatsBar />
        </DiagramContainer>
    )
}
export default Locations_Radial_Pie_Charts;


/*

<ResponsiveContainer width='100%' height={300}>
                    <PieChart >
                        <Pie dataKey="Resources" isAnimationActive={false} data={ClientBreakDown}  outerRadius={80} fill="#ffbf00" label >
                            {
                                ClientBreakDown.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colorArray[index]}/>
                                ))
                            }   
                        </Pie>
                        <Tooltip />
                        <Legend />  
                    </PieChart>
                </ResponsiveContainer>
 <ResponsiveContainer width='100%' height={300}>
                    <PieChart >
                        <Pie dataKey="Total Sites" isAnimationActive={false} data={ClientBreakDown}  outerRadius={80} fill="#ffbf00" label >
                            {
                                ClientBreakDown.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colorArray[index]}/>
                                ))
                            }   
                        </Pie>
                        <Tooltip />
                        <Legend /> 
                    </PieChart>
                </ResponsiveContainer>

                 <ResponsiveContainer width='100%' height={300}>
                    <PieChart >
                        <Pie dataKey="Work Orders" isAnimationActive={false} data={ClientBreakDown}  outerRadius={80} fill="#ffbf00" label >
                            {
                                ClientBreakDown.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colorArray[index]}/>
                                ))
                            }   
                        </Pie>
                        <Tooltip />
                        <Legend /> 
                    </PieChart>
                </ResponsiveContainer>

*/