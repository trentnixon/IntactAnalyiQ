import React from 'react'

// components
import HeaderLocations from "../DELETETHESE/OLD_HeaderStats/OLD_HeaderLocations"
import LocationCharts from "../DELETETHESE/OLD_HeaderStats/OLD_LocationCharts";
import ClusterByCategory from "../DELETETHESE/OLD_HeaderStats/OLD_ClusterByCategory";

import HeaderTotalWorkOrders from "../DELETETHESE/OLD_HeaderStats/OLD_HeaderTotalWorkOrder"
import ClusterByClientName from "../DELETETHESE/OLD_HeaderStats/OLD_HeaderClusterbyClientName";
import WorkorderCharts from "../DELETETHESE/OLD_HeaderStats/OLD_WorkOrderCharts";

import ByTrade from "../DELETETHESE/OLD_HeaderStats/OLD_ByTradeRatio";
import HeaderResourceAllocationRatio from "../DELETETHESE/OLD_HeaderStats/OLD_HeaderResourceAllocationRatios";

import Section from "../Components/Layout/Section"

const MarkerBasedResults = ()=>{
    return(
        <>
      
            <Section>
                <HeaderLocations />
                <LocationCharts />
                <ClusterByCategory />  
            </Section>

            <Section>
                <HeaderTotalWorkOrders />
                <WorkorderCharts />
                <ClusterByClientName />
            </Section>
            
            <ByTrade />
            <HeaderResourceAllocationRatio />
        </> 
    )
}


export default MarkerBasedResults;