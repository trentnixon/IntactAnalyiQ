import React  from 'react'

import CompareTableTotalWorkOrders from "../CompareTable/WorkOrders_Totals"
import SectionChart from "Pages/Auth/Compare/Layout/SectionCharts"

// Chart
import Workorder_pie_Clients from 'Pages/Auth/SingleModelResult/Charts/Workorder_pie_Clients'
import Workorders_Radial_Workorders from 'Pages/Auth/SingleModelResult/Charts/Workorder_Radial_Workorders'
import Workorder_pie_outofscope from 'Pages/Auth/SingleModelResult/Charts/Workorder_pie_outofscope' 
import Workorder_Radial_Cluster from 'Pages/Auth/SingleModelResult/Charts/Workorder_Radial_Cluster'
import WorkOrderHeatMap from   "Pages/Auth/SingleModelResult/Maps/WorkOrder_Heatmap";
import Workorder_Bar_Overtime from 'Pages/Auth/SingleModelResult/Charts/Workorder_Bar_Overtime'
const Charts=[
  {
    chart: <Workorders_Radial_Workorders />,
    label:'Work Orders',
    tip:'',
    icon:'radial'
  },{
    chart: <Workorder_pie_outofscope />,
    label:'Out of Scope',
    tip:'',
    icon:'pie'
  },{
    chart: <Workorder_pie_Clients />,
    label:'Client Breakdown',
    tip:'',
    icon:'pie'
  },{
    chart: <Workorder_Radial_Cluster />,
    label:'Cluster Breakdown',
    tip:'',
    icon:'radial'
  },{
    chart: <WorkOrderHeatMap />,
    label:'Cluster HeatMap',
    tip:'',
    icon:'map'
  },{
    chart: <Workorder_Bar_Overtime />,
    label:'Workorders Overtime',
    tip:'',
    icon:'bar'
  }
]


const TableSectionWorkorders = ()=>{
    return(
        <>
        
          <div className="TableSection">
            <div className="SectionHeader"><h2>Work Orders</h2></div>
                <CompareTableTotalWorkOrders /> 
                <SectionChart Charts={Charts} />  
            </div>
        </>
    )
}    

export default TableSectionWorkorders; 