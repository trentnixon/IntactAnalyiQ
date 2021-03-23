import React, {useEffect, useState} from 'react'

// Context
import {useContext_UX_FULL} from "Context/UX";

import { GoogleMap,HeatmapLayer,Marker  } from '@react-google-maps/api';
import DiagramContainer from "Pages/Auth/Components/Layout/DiagramContainer"
const containerStyle = { height: "400px", width: "auto" };

const LocationHeatMap = (props)=>{
    const{site} = props
    const UX = useContext_UX_FULL();

    const  Homeicon = {
        path:"M38.8823 0.384155L0.579987 34.26H10.06V74.76H66.94V34.26H76.42L38.8823 0.384155Z",
        fillColor: '#ea9a40',
        fillOpacity: 1,
        anchor: new window.google.maps.Point(50,50),
        strokeWeight: 0,
        scale: .4
    };  

    useEffect(()=>{ 
       console.log(site)
    },[site])
 
    return( 
        <DiagramContainer>
        <GoogleMap  
            mapContainerStyle={containerStyle}
            center={{lat:site.lat,lng:site.long}}
            zoom={13}
            mapTypeId="satellite"
        >
                <Marker
                    position={{lat:site.lat,lng:site.long}}
                    icon={Homeicon}
                    />    
        </GoogleMap> 
        </DiagramContainer>
    )
}

export default LocationHeatMap;