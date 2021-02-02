import React from 'react';
import { GoogleMap } from '@react-google-maps/api';

// Components

import Markers from "Pages/Auth/Components/Maps/LocationMarkers";
import ResidualMarkers from "Pages/Auth/Components/Maps/ResidualLocationMarkers";
import CenterPoints from "Pages/Auth/Components/Maps/MarkersCenterpoints";
import MarkerBasedResults from "Pages/Auth/Components/Maps/MarkerBasedResults";
import Polygons from "Pages/Auth/Components/Maps/Polygons"

const containerStyle = { height: "700px", width: "auto" };
const Map=()=>{
        return(
                <div className="ScanMapMain" id="MainMap">
                    <GoogleMap 
                        mapContainerStyle={containerStyle}
                        center={{
                                lat: -37.813629,
                                lng: 144.963058
                        }}
                        zoom={14}
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