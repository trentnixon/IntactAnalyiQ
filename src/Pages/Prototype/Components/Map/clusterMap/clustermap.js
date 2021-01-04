import React, {useEffect } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import ClusterMarkers from "./ClusterMarkers"
import ScannedRegionalBoundary from "./ScannedRegionalBoundary";
import ClusterScanRadius from "./ClusterScanRadius";
import ClusterBoundary from "./ClusterBoundary";

const containerStyle = { height: "300px", width: "auto" };


const ClusterMap = (props)=>{
    const {Data} = props


    useEffect(()=>{},[Data]) 
    if(Data=== null)
    return false;
    
    return (
      
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{
                lat: Data.Boundary.north,
                lng: Data.Boundary.west
              }}
            zoom={14}
          >
            { /* Child components, such as markers, info windows, etc. */ }
            <>
              <ClusterMarkers {... props}/>
              <ClusterBoundary {... props}/>
              <ScannedRegionalBoundary />
              <ClusterScanRadius {... props}/>
            </>
          </GoogleMap>
   
      )
}

export default ClusterMap;

/*

              
              
              
*/
