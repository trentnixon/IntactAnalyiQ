import React, {useEffect, useState} from 'react'
import {MapData_LocationHeatmap} from "actions/CreateSingleViewModel"
import {useContext_UX_FULL} from "Context/UX";
import { GoogleMap,HeatmapLayer  } from '@react-google-maps/api';
import ChartHeader from "Pages/Auth/Components/Layout/ChartHeader";
const containerStyle = { height: "500px", width: "auto" };

const Chart1={
    Icon:'map',
    Header:"Heat map of Sites based in model",
    Tip:"Use the Filters",
    Copy:"The Heat map Below shows high volume areas of locations. Filter site by clusters by using the ' cluster type' Filter option"
}

const LocationHeatMap = ()=>{
    
    const UX = useContext_UX_FULL();
    const [HeatMapData, setHeatMapData] = useState([])
    const [HeatMapDataLength, setHeatMapDataLength] = useState([])

    useEffect(()=>{ 
        let HeatMapLocations = MapData_LocationHeatmap();
        setHeatMapData(HeatMapLocations[0])
        setHeatMapDataLength(HeatMapLocations[1])
     },[UX])

    return(
        <>
            <div className="ScanMapMain" id="MainMap">
                <ChartHeader Icon={Chart1.Icon} Header={Chart1.Header}  Copy={Chart1.Copy} Tip={Chart1.Tip} />
                <GoogleMap 
                    mapContainerStyle={containerStyle}
                    center={UX.MapParameters.LatLngBoundaries}
                    zoom={UX.MapParameters.zoom}
                    mapTypeId="satellite"
                
                >
                <HeatmapLayer  data={HeatMapData} />
                </GoogleMap> 
                <p>{HeatMapDataLength} Locations scanned in results</p>
            </div>
        </>
    )
}

export default LocationHeatMap;