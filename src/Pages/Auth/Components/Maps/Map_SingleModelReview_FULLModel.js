import React, { useEffect, useRef } from 'react';
import {useContext_UX_FULL} from "Context/UX";
import { GoogleMap } from '@react-google-maps/api';

// Components

import Markers from "Pages/Auth/Components/Maps/LocationMarkers";
import ResidualMarkers from "Pages/Auth/Components/Maps/ResidualLocationMarkers";
//import CenterPoints from "Pages/Auth/Components/Maps/MarkersCenterpoints";
//import MarkerBasedResults from "Pages/Auth/Components/Maps/MarkerBasedResults";
import Polygons from "Pages/Auth/Components/Maps/Polygons"

const containerStyle = { height: "700px", width: "auto" };
const Map=()=>{
    const UX = useContext_UX_FULL();

    useEffect(()=>{
        //console.log(UX)
    },[UX])
        return(
                <div className="ScanMapMain" id="MainMap">
                        <GoogleMap 
                            mapContainerStyle={containerStyle}
                            center={UX.MapParameters.LatLngBoundaries}
                            zoom={UX.MapParameters.zoom}
                        >
                            { /* Child components, such as markers, info windows, etc. */ }
                            
                            <Markers />
                            <ResidualMarkers />
                            <Polygons />
                        </GoogleMap> 
                    </div>
                )
}

//<CenterPoints />
 
export default Map;