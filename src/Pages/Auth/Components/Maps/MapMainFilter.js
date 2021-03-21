import React, { useEffect, useState } from 'react';

// Filters 
import ByResourceType from "Pages/Auth/Components/Maps/Filters/Filter_ByResourceType";
import ByClusterType from "Pages/Auth/Components/Maps/Filters/Filter_ByClusterType";
import ByCapitalCities from "Pages/Auth/Components/Maps/Filters/Filter_ByCapitalCities";
import ByMarkers from "Pages/Auth/Components/Maps/Filters/Filter_ByMarkerType";
import ByColorScheme from "Pages/Auth/Components/Maps/Filters/Filter_ByColorScheme";


const MapFilter=()=>{
    return(
        <>
            <ul className="Stat_Bar">
                <li><ByColorScheme /> </li>
                <li><ByMarkers /> </li>
                <li><ByCapitalCities /> </li>
                <li><ByClusterType/></li>
                <li> <ByResourceType /></li>
            </ul>
         
        </>
        )
}

export default MapFilter;


