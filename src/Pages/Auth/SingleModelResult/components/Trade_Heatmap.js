import React, {useEffect, useState} from 'react'
// Actions
import {Resources_HeatMap} from "actions/CreateSingleViewModel"
// Context
import {useContext_UX_FULL} from "Context/UX";
import { GoogleMap,HeatmapLayer  } from '@react-google-maps/api';
import ChartHeader from "Pages/Auth/Components/Layout/ChartHeader";

const containerStyle = { height: "500px", width: "auto" };

const LocationHeatMap = ()=>{
    
    const UX = useContext_UX_FULL(); 
    const [HeatMapData, setHeatMapData] = useState([])
    const [HeatMapDataLength, setHeatMapDataLength] = useState([])

    useEffect(()=>{ 
       let HeatMap = Resources_HeatMap() 
       setHeatMapDataLength(HeatMap[1])
       setHeatMapData(HeatMap[0])
    },[UX])

    return(
        <>
      
            <div className="ScanMapMain" id="MainMap">
            <ChartHeader 
                    Icon='map'
                    Header="Heat map of Resource Allocation based on Cluster Types"
                    Copy="This heat map shows areas of high volume Resource Allocation within the model. 
                            Use the  'Cluster Type' and  'Resource type' Filters to deep dive into more specific areas "
                />
                
                <p>{HeatMapDataLength} resources scanned in results</p>

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