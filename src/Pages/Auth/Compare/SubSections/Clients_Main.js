import React  from 'react'

import SectionChart from "Pages/Auth/Compare/Layout/SectionCharts"
// Chart
import Client_Pie_Resources from 'Pages/Auth/SingleModelResult/Charts/Client_Pie_Resources'
import Client_Pie_Sites from 'Pages/Auth/SingleModelResult/Charts/Client_Pie_Sites'
import Client_Pie_WorkOrders from 'Pages/Auth/SingleModelResult/Charts/Client_Pie_WorkOrders'
import Client_Line_Workorders from 'Pages/Auth/SingleModelResult/Charts/Client_line_WorkordersOvertime'
import Client_line_ResourcesOvertime from 'Pages/Auth/SingleModelResult/Charts/Client_line_ResourcesOvertime'
const Charts=[
 {
    chart: <Client_Pie_Sites />,
    label:'Locations Split',
    tip:'',
    icon:'pie'
  },{
    chart: <Client_Pie_WorkOrders />,
    label:'WorkOrder Split',
    tip:'',
    icon:'pie'
  },{
    chart: <Client_Line_Workorders />,
    label:'WO/s Overtime',
    tip:'',
    icon:'line'
  },{
    chart: <Client_Pie_Resources />,
    label:'Resource Split',
    tip:'',
    icon:'pie'
  },{
    chart: <Client_line_ResourcesOvertime />,
    label:'Resources Overtime',
    tip:'',
    icon:'line'
  }
]
const Clients_Main = ()=>{
    return(
        <>
            <div className="TableSection">
                <div className="SectionHeader">
                    <h2>Clients</h2>
                </div>
                <SectionChart Charts={Charts} />  
            </div>  
        </> 
    ) 
}   

export default Clients_Main;