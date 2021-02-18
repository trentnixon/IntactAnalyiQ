import React from 'react'


import CompareClusters from "Pages/Auth/Compare/CompareTable/Clusters_Totals"
import ClusterComparisonPie from "Pages/Auth/Compare/CompareTable/CLusters_ComparisionPie"
import ClusterComparisonRadial from "Pages/Auth/Compare/CompareTable/ClusterComparisonRadial"
import ClusterResourcesComparisonBar from "Pages/Auth/Compare/CompareTable/Cluster_ResourcesBar"

//import ClusterBreakdown from "Pages/Auth/Compare/CompareTable/TableClusterBreakDown";
//import DiagramContainer from "Pages/Auth/Components/Layout/DiagramContainer"
import {H2} from "Pages/Auth/Components/Type";

const Title='Clusters';
const TableSectionWorkorders = ()=>{
    return(
        <>
            <div className="TableSection">
                <div className="SectionHeader">
                    <H2 Copy={Title} />
               </div>
                <CompareClusters />
                
            </div>
        </>
    ) 
}   
// 
export default TableSectionWorkorders;
/*
<ClusterComparisonPie />
                <ClusterComparisonRadial />
                <ClusterResourcesComparisonBar />
*/