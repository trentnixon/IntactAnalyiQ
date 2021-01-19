import React, {useEffect} from 'react'

    // Trade TYpes
import TradetypeBreakDown from "./CompareTable/TableTradeTypeBreakdown";
const TableSectionTradeTypes = ()=>{
    return(
        <>
          <div className="TableSection">
              <div className="SectionHeader">
                  <h2>Trade Types</h2>
               </div>
          
                   <TradetypeBreakDown />
        </div>  
        </>
    )
}   

export default TableSectionTradeTypes;