import React, {useEffect, useState} from 'react'
// Actions
import {Resources_HeatMap} from "actions/CreateSingleViewModel"
// Context
import {useContext_UX_FULL} from "Context/UX";
import {useContext_SCAN_FULL} from "Context/SCAN";
import { GoogleMap,HeatmapLayer  } from '@react-google-maps/api';
import ChartHeader from "Pages/Auth/Components/Layout/ChartHeader";
import {H3} from 'Pages/Auth/Components/Type';
const containerStyle = { height: "500px", width: "auto" };

const Chart1={
    Icon:'map',
    Header:"Heat map of Resource Allocation based on Cluster Types",
    Tip:"Use the Filters",
    filters:['cluster','resource'],
    Copy:`This heat map shows areas of high volume Resource Allocation within the model.`
}

const LocationHeatMap = ()=>{
    
    const UX = useContext_UX_FULL();
    const MODEL = useContext_SCAN_FULL();

    const [HeatMapData, setHeatMapData] = useState([])
    const [HeatMapDataLength, setHeatMapDataLength] = useState([])

    useEffect(()=>{ 
       let HeatMap = Resources_HeatMap() 
       setHeatMapDataLength(HeatMap[1].toFixed(2))
       setHeatMapData(HeatMap[0]) 
    },[UX,MODEL])
 
    return( 
        <> 
       
            <div className="ScanMapMain" id="MainMap">
                <ChartHeader  {...Chart1}/>
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
        </>
    )
}

export default LocationHeatMap;