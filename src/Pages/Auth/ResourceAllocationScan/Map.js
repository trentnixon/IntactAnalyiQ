import React, {useEffect, useState} from 'react'
//import {useContext_STRAPI_FULL} from "Context/STRAPI";
//import {useContext_UX_FULL} from "Context/UX";
import {useContext_SCAN_FULL} from "Context/SCAN";
import {ScanSites} from "actions/HandleMarkerBasedScan";
import { GoogleMap,} from '@react-google-maps/api';

// Components
import Markers from "./MapComponents/LocationMarkers";
import ResidualMarkers from "./MapComponents/ResidualLocationMarkers";
import CenterPoints from "./MapComponents/MarkersCenterpoints";
import MarkerBasedResults from "./MapComponents/MarkerBasedResults";
import ColorKey from "./Results/ColorKey"

const RenderScamSites = new ScanSites();

const containerStyle = { height: "600px", width: "auto" };


const ResourceAllocationMap=()=>{

    const SCAN = useContext_SCAN_FULL();
    useEffect(()=>{
        //console.log(SCAN.MarkerScanResults)
    },[SCAN])
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
                <CenterPoints />
                <ResidualMarkers />
            </GoogleMap>

            <ColorKey />
            <MarkerBasedResults />
        </div>
)
}

export default ResourceAllocationMap;