import React, {useEffect} from 'react'
import {useContext_COMPARE_FULL} from "Context/COMPARE";
import ResetModels from "../Components/buttons/ResetCompareModels";

// Import Table
import TableHeader from "./CompareTable/TableHeader"

    // Clusters
import TableClusters from "./TableClusters";
    // Work Orders
import TableSectionWorkorders from "./TableWorkorders";
    // Locations
import TableLocations from "./TableLocations"

    // Resources
import TableResourceAllocation from "./TableResourceAllocation";

    // Trade Types
import TableTradeType from "./TableTradeTypes";

const ModelComparision = ()=>{
    const COMPARE = useContext_COMPARE_FULL();
    useEffect(()=>{
        console.log(COMPARE)
    },[COMPARE])
    
    return( 
        <>
            <h1>Comparison Results</h1>
          
            
            <div className="ModelComparisonTable">
                <TableHeader />
                <TableClusters/>
                <TableSectionWorkorders />
                <TableLocations />
                <TableResourceAllocation />
                <TableTradeType />
            </div>
            <ResetModels />
        </>
    )
}

export default ModelComparision;