import React, {useEffect} from 'react'

    // Locations
    import CompareTableTotalLocations from "./CompareTable/TableTotalLocations"
    import CompareTableLocationsInscope from "./CompareTable/TableLocationsInScope";
    import CompareTableLocationsUnaccomidated from "./CompareTable/TableLocationsUnaccomidated";
    import LocationSitesByTier from "./CompareTable/TableSitesByTier";

const TableSectionWorkorders = ()=>{
    return(
        <>
          <div className="TableSection">
              <div className="SectionHeader">
                  <h2>Locations</h2>
               </div>

                    <CompareTableTotalLocations />
                    <CompareTableLocationsInscope />
                    <LocationSitesByTier />
                    <CompareTableLocationsUnaccomidated />
        </div>  
        </>
    )
}   

export default TableSectionWorkorders;