import React, {useEffect} from 'react'
import {useContext_COMPARE_FULL} from "Context/COMPARE";
import ResetModels from "../Components/buttons/ResetCompareModels";

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

const ModelComparision = ()=>{
   
    const COMPARE = useContext_COMPARE_FULL();
   
    useEffect(()=>{
        console.log(COMPARE.CompareData.UserSelected.length)
    },[COMPARE])
    
    return( 
        <>
           {
               COMPARE.CompareData.FetchedModels.length < 2 ? <LoadingCompare />:<ResetModels />
           }
        </>
    )
}

export default ModelComparision;



const LoadingCompare = ()=>{
    return(
        <>
        <ResetModels />
        <h1>Fetching Data</h1>
        </>
    )
}

const CompareModels = ()=>{
    return( 
        <>
            <h1>Comparison Results</h1> 
            <ResetModels />
            <div className="ModelComparisonContainer">
                <div className="ModelComparisonFilter">
                    <h4>Review Filters</h4>
                    <GlobalFilter />
                </div>
                <div className="ModelComparisonTable">
                    <TableHeader />
                    <Locations_Main />
    
                    <Resources_Main />
    
                    <WorkOrders_Main />
                    <Clients_Main />
                </div> 
                
                <FilterChips />
            </div>
          
        
        </>
    )
}