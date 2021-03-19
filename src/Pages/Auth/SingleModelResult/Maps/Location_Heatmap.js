import React, {useEffect, useState} from 'react'
import {MapData_LocationHeatmap} from "actions/CreateSingleViewModel"
// Context
import {useContext_UX_FULL} from "Context/UX";
import {useContext_SCAN_FULL} from "Context/SCAN";
import {H3} from 'Pages/Auth/Components/Type';
import { GoogleMap,HeatmapLayer  } from '@react-google-maps/api';
import ChartHeader from "Pages/Auth/Components/Layout/ChartHeader";
import ResetMap from "Pages/Auth/Components/buttons/ResetMapBtn";

const containerStyle = { height: "500px", width: "auto" };


const LocationHeatMap = ()=>{ 
    
    const UX = useContext_UX_FULL();
    const MODEL = useContext_SCAN_FULL();
    const [HeatMapData, setHeatMapData] = useState([])
    const [HeatMapDataLength, setHeatMapDataLength] = useState([])

    useEffect(()=>{ 
        let HeatMapLocations = MapData_LocationHeatmap();
        setHeatMapData(HeatMapLocations[0])
        setHeatMapDataLength(HeatMapLocations[1])
     },[UX,MODEL])
 
    return(
        <div className="DiagramContainer">
            <div className="ScanMapMain" id="MainMap">
                <ChartHeader  Section='Locations' Chart='Map'  Meta='Map'/>
                <H3 Copy={`${HeatMapDataLength} Locations scanned in results`}  />
                <GoogleMap 
                    mapContainerStyle={containerStyle}
                    center={UX.MapParameters.LatLngBoundaries}
                    zoom={UX.MapParameters.zoom}
                    mapTypeId="satellite"
                
                >
                <HeatmapLayer  data={HeatMapData} />
                </GoogleMap>  
                <ResetMap />
            </div>
            </div>
    )
}

export default LocationHeatMap;