import React from 'react'

// components
import HeaderTitles from "./components/HeaderStats/HeaderTitle";
import HeaderLocations from "./components/HeaderStats/HeaderLocations"
import HeaderTotalWorkOrders from "./components/HeaderStats/HeaderTotalWorkOrder"
import ClusterByClientName from "./components/HeaderStats/HeaderClusterbyClientName";
import ClusterByCategory from "./components/HeaderStats/ClusterByCategory";
import ByTrade from "./components/HeaderStats/ByTradeRatio";
import HeaderResourceAllocationRatio from "./components/HeaderStats/HeaderResourceAllocationRatios";
const MarkerBasedResults = ()=>{
    return(
        <>
            <HeaderTitles />
            <HeaderLocations />
            <ClusterByCategory />
            <HeaderTotalWorkOrders />
            <ClusterByClientName />
            <ByTrade />
            <HeaderResourceAllocationRatio />
        </> 
    )
}


export default MarkerBasedResults;