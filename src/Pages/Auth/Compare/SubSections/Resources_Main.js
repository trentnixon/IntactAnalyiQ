import React  from 'react'

import SectionChart from "Pages/Auth/Compare/Layout/SectionCharts"

// Locations 
import TotalResourceAllocation from "Pages/Auth/Compare/CompareTable/Resource_Totals"

// Chart
import Resources_Radial_Resources from "Pages/Auth/SingleModelResult/Charts/Resource_Radial_Resources"
import Resources_Pie_ResourceAllocation from "Pages/Auth/SingleModelResult/Charts/Resources_Pie_ResourceAllocation"
import TradeHeatMap from  "Pages/Auth/SingleModelResult/Maps/Trade_Heatmap";
import Resources_Pie_ClientBreakdown from 'Pages/Auth/SingleModelResult/Charts/Resources_Pie_ClientsBreakdown';
import Resources_Line_Allocation_OverTime from 'Pages/Auth/SingleModelResult/Charts/Resources_Line_Allocation_OverTime';


const Charts=[
  {
    chart: <Resources_Radial_Resources />,
    label:'Resource Allocation',
    tip:'',
    icon:'radial'
  },{
    chart: <Resources_Pie_ResourceAllocation />,
    label:'Resource Allocation',
    tip:'',
    icon:'pie'
  },{
    chart: <TradeHeatMap />,
    label:'Resource Allocation',
    tip:'',
    icon:'map'
  },{
    chart: <Resources_Pie_ClientBreakdown />,
    label:'Resources to Client',
    tip:'',
    icon:'pie'
  }
,{
    chart: <Resources_Line_Allocation_OverTime />,
    label:'Resources OverTime',
    tip:'',
    icon:'line'
  }
  
]

const TableSectionWorkorders = ()=>{
    return(
        <>
          <div className="TableSection">
              <div className="SectionHeader">
                  <h2>Resources</h2>
               </div>
               <TotalResourceAllocation />
               <SectionChart Charts={Charts} />   
                   
        </div>  
        </> 
    )
}   
//import TableResourceAllocationPerResourceTotal from "../CompareTable/TableResourceAllocationPerResourceTotal"
// <TableResourceAllocationPerResourceTotal/>
export default TableSectionWorkorders; 