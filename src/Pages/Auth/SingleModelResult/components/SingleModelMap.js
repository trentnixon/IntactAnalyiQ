import React from 'react';
import { GoogleMap } from '@react-google-maps/api';

// Components

import Markers from "./LocationMarkers";
import ResidualMarkers from "./ResidualLocationMarkers";
import CenterPoints from "./MarkersCenterpoints";
import MarkerBasedResults from "./MarkerBasedResults";


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
                        <CenterPoints />
                        <Markers />
                        <ResidualMarkers />
                    </GoogleMap>
                
                    </div>
                )
}

export default Map;