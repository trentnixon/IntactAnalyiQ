import React  from 'react'
// Context
import {useContext_UX_FULL} from "Context/UX";
// Template
import Section from "Pages/Auth/Components/Layout/Section"
import {H1} from "Pages/Auth/Components/Type";

import Map_Full_Main from "Pages/Auth/SingleModelResult/components/Map_Full_MAin";
import SectionChart from "Pages/Auth/Compare/Layout/SectionCharts"

// Chart
import Resources_Pie_ResourceAllocation from 'Pages/Auth/SingleModelResult/Charts/Resources_Pie_ResourceAllocation'

import Resources_Pie_ClientsBreakdown from 'Pages/Auth/SingleModelResult/Charts/Resources_Pie_ClientsBreakdown'
import Client_Pie_WorkOrders from 'Pages/Auth/SingleModelResult/Charts/Client_Pie_WorkOrders'
import Client_line_ResourcesOvertime from 'Pages/Auth/SingleModelResult/Charts/Client_line_ResourcesOvertime'
import Client_line_WorkordersOvertime from 'Pages/Auth/SingleModelResult/Charts/Client_line_WorkordersOvertime'
import WorkOrder_Heatmap from 'Pages/Auth/SingleModelResult/Maps/WorkOrder_Heatmap'

const Charts=[
    {
        chart: <Resources_Pie_ResourceAllocation />,
        label:`Resource Allocation Total`,
        tip:'',
        icon:'pie'
    },{
        chart: <Resources_Pie_ClientsBreakdown />,
        label:`Resources Split Clients`,
        tip:'',
        icon:'pie'
    },{
        chart: <Client_line_ResourcesOvertime />,
        label:`Resources Allocation Over Time`,
        tip:'',
        icon:'line'
    },{
        chart: <Client_Pie_WorkOrders />,
        label:`Clients WO's Split`,
        tip:'',
        icon:'pie'
    },{
        chart: <Client_line_WorkordersOvertime />,
        label:`WO's Over Time`,
        tip:'',
        icon:'line'
    },{
        chart: <WorkOrder_Heatmap />,
        label:`HeatMap`,
        tip:'',
        icon:'line'
    }
    
]

const SubSection_FullMap = ()=>{
    const UX = useContext_UX_FULL();
    console.log(UX.AreaSelectFilter.ByPolygon)
    return(
        <>
         <H1 Copy={`Model Overview`} />
            <Section>
                <Map_Full_Main />

                { 
                    UX.AreaSelectFilter.ByPolygon === null ? false : <SectionChart Charts={Charts}  />
                }
                
            </Section >
        </>
    )  
} 

export default SubSection_FullMap;  