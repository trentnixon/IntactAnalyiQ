import React, {useEffect} from 'react'

import CompareClusters from "./CompareTable/TableClusters"
import ClusterBreakdown from "./CompareTable/TableClusterBreakDown";

const TableSectionWorkorders = ()=>{
    return(
        <>
            <div className="TableSection">
                <div className="SectionHeader"><h2>Clusters</h2></div>
                <CompareClusters />
                <ClusterBreakdown />
            </div> 
        </>
    ) 
}   

export default TableSectionWorkorders;