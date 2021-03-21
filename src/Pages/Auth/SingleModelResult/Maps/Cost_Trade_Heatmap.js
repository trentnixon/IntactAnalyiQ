import React, {useEffect, useState} from 'react'
// Actions
import {COSTANALYSIS_Resources_HeatMap} from "actions/CreateSingleViewModel" 
// Context
import {useContext_UX_FULL} from "Context/UX";
import {useContext_SCAN_FULL} from "Context/SCAN";
import { GoogleMap,HeatmapLayer  } from '@react-google-maps/api';
import ChartHeader from "Pages/Auth/Components/Layout/ChartHeader";
import {H3} from 'Pages/Auth/Components/Type';
const containerStyle = { height: "500px", width: "auto" };

const LocationHeatMap = ()=>{
    
    const UX = useContext_UX_FULL();
    const MODEL = useContext_SCAN_FULL();

    const [HeatMapData, setHeatMapData] = useState([])
    const [HeatMapDataLength, setHeatMapDataLength] = useState([])

    useEffect(()=>{ 
       let HeatMap = COSTANALYSIS_Resources_HeatMap() 
       setHeatMapDataLength(HeatMap[1].toFixed(2))
       setHeatMapData(HeatMap[0]) 
    },[UX,MODEL])
 
    return( 
        <div className="DiagramContainer">
        
                <div className="ScanMapMain" id="MainMap">
                    <ChartHeader  Section='Costs' Chart='Map'  Meta='Map_HeatMapCosts'/>
                    <H3 Copy={`${HeatMapDataLength} Resources scanned in results`}  />
                        <GoogleMap  
                            mapContainerStyle={containerStyle}
                            center={UX.MapParameters.LatLngBoundaries}
                            zoom={UX.MapParameters.zoom}
                            mapTypeId="satellite"
                        
                        >
                    <HeatmapLayer data={HeatMapData} />
                </GoogleMap> 
                
            </div> 
        </div> 
    )
}

export default LocationHeatMap;