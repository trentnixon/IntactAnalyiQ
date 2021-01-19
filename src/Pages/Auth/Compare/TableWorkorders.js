import React, {useEffect} from 'react'

import CompareTableTotalWorkOrdersCoveredInCluster from "./CompareTable/TableTotalWorkOrdersCoveredInCluster";
import CompareTableTotalWorkOrders from "./CompareTable/TableTotalWorkOrders"
import WorkorderByClient from "./CompareTable/TableWorkOrderByClient";
const TableSectionWorkorders = ()=>{
    return(
        <>
        
          <div className="TableSection">
            <div className="SectionHeader"><h2>Work Orders</h2></div>
                <CompareTableTotalWorkOrders />
                <WorkorderByClient />
                <CompareTableTotalWorkOrdersCoveredInCluster />
            </div>
        </>
    )
}    

export default TableSectionWorkorders;