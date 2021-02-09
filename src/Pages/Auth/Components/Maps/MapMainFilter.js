import React from 'react';
// Filters 
import ByResourceType from "Pages/Auth/Components/Maps/Filters/Filter_ByResourceType";
import ByClusterType from "Pages/Auth/Components/Maps/Filters/Filter_ByClusterType";
import ByCapitalCities from "Pages/Auth/Components/Maps/Filters/Filter_ByCapitalCities";

const MapFilter=()=>{
    return(
            <ul className="Stat_Bar">
                <li><ByCapitalCities /> </li>
                <li><ByClusterType/></li>
                <li> <ByResourceType /></li>
               
            </ul>
        )
}

export default MapFilter;