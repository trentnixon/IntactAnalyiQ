import React from 'react'

 import SectionChart from "Pages/Auth/Compare/Layout/SectionCharts"
    // Locations
    import CompareTableTotalLocations from "Pages/Auth/Compare/CompareTable/Locations_CompareTotals"
    import CompareClusters from "Pages/Auth/Compare/CompareTable/Clusters_Totals"
   

// Chart
import Locaction_Radial_Clusters from 'Pages/Auth/SingleModelResult/Charts/Location_Radial_Clusters'
import Chart_Pie_OutofScope from 'Pages/Auth/SingleModelResult/Charts/Location_Pie_OutofScope'
import Clusters_Pie_ClusterNumbers from 'Pages/Auth/SingleModelResult/Charts/Clusters_Pie_ClusterNumbers'

import LocationHeatMap from 'Pages/Auth/SingleModelResult/Maps/Location_Heatmap'
import SwarmPlot from 'Pages/Auth/SingleModelResult/Charts/Clusters_SwarmPlot_Numbers'
import ClusterBar_ResourceAllocation from 'Pages/Auth/SingleModelResult/Charts/Cluster_Bar_ResourceAllocation'
import ClusterBar_WorkOrders from 'Pages/Auth/SingleModelResult/Charts/Cluster_Bar_Workorders'
const Charts=[
  {
    chart: <Chart_Pie_OutofScope />,
    label:'Out of Scope',
    tip:'Pie split of OOS and In Scope Locations',
    icon:'pie'
  }, {
    chart: <Locaction_Radial_Clusters />,
    label:'Grouped Clusters',
    tip:'Radial chart showing the grouped clusters',
    icon:'radial'
  },
  
  {
    chart: <Clusters_Pie_ClusterNumbers />,
    label:'Grouped Clusters',
    tip:'Pie chart showing the grouped clusters',
    icon:'pie'
  },
  
  {
    chart: <LocationHeatMap />,
    label:'HeatMap Locations',
    tip:'Pie chart showing the grouped clusters',
    icon:'map'
  }
  ,
  
  {
    chart: <SwarmPlot />,
    label:'Location Swarm',
    tip:'Swarm Plot showing the density of cluster types',
    icon:'radial'
  },
  
  {
    chart: <ClusterBar_ResourceAllocation />,
    label:'Resource Allocation',
    tip:'Swarm Plot showing the density of cluster types',
    icon:'bar'
  },
  
  {
    chart: <ClusterBar_WorkOrders />,
    label:'Work Orders',
    tip:'Swarm Plot showing the density of cluster types',
    icon:'bar'
  }
]


const TableSectionWorkorders = ()=>{
    return(
   
          <div className="TableSection">
              <div className="SectionHeader">
                  <h2>Locations and Clusters</h2>
               </div>
                    <CompareTableTotalLocations />
                    <CompareClusters />

                    <SectionChart Charts={Charts} />   
          </div>   
     
    )
}   

export default TableSectionWorkorders;
