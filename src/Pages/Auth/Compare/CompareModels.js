import React, {useEffect} from 'react'
import {useContext_COMPARE_FULL} from "Context/COMPARE";

import ResetModels from "Pages/Auth/Components/buttons/ResetCompareModels"

// Import Table
import TableHeader from "Pages/Auth/Compare/Layout/TableHeader"
import FilterChips from "Pages/Auth/SingleModelResult/Layout/FilterChips";
// Filter
import GlobalFilter from "Pages/Auth/Components/Layout/CompareGlobalFilter";
    // Clusters
import Clusters_Main from "Pages/Auth/Compare/SubSections/Clusters_Main";
    // Work Orders
import WorkOrders_Main from "Pages/Auth/Compare/SubSections/WorkOrders_Main";
    // Locations
import Locations_Main from "Pages/Auth/Compare/SubSections/Locations_Main"
    // Resources
import Resources_Main from "Pages/Auth/Compare/SubSections/Resources_Main"
    // Clients
import Clients_Main from "Pages/Auth/Compare/SubSections/Clients_Main";

import NivoNetwork from "venders/Nivo/NivoNetwork"
import LocationsNetwork from "Pages/Auth/SingleModelResult/components/Locations_Network";
const ModelComparision = ()=>{
   
    const COMPARE = useContext_COMPARE_FULL();
   
    useEffect(()=>{
        //console.log(COMPARE.CompareData.UserSelected.length)
    },[COMPARE])
    
    return( 
        <div className="OuterContainer">
            <div className="InnerFrame">
                <h2>Comparison Results</h2>
                <div className="ModelComparisonContainer">
                    <div className="ModelComparisonTable">
                   
                        <TableHeader />
                        <LocationsNetwork /> 
                       
                        <Locations_Main />
                        <Resources_Main />
                        <WorkOrders_Main />
                        <Clients_Main />
                    </div>
                </div>
            </div>

            <div className="SideBarRight">
                <div className="controls">
                    <h4>Filters</h4>
                    <GlobalFilter />
                    <ResetModels />
                </div>
            </div>  
        
            <FilterChips />
        </div>
    )
}

export default ModelComparision;