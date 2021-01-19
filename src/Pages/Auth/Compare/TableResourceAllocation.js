import React, {useEffect} from 'react'

    // Locations
    import TotalResourceAllocation from "./CompareTable/TableTotalResourceAllocation"
    import TableResourceAllocationPerResourceTotal from "./CompareTable/TableResourceAllocationPerResourceTotal"
const TableSectionWorkorders = ()=>{
    return(
        <>
          <div className="TableSection">
              <div className="SectionHeader">
                  <h2>Resource Allocations</h2>
               </div>
            <TotalResourceAllocation />
            <TableResourceAllocationPerResourceTotal/>
                   
        </div>  
        </>
    )
}   

export default TableSectionWorkorders;