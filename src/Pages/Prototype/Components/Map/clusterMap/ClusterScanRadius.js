
import React, { useEffect } from 'react'
import { Circle } from '@react-google-maps/api';
// Context
import {useContext_SCAN_FULL} from "../../../../../Context/SCAN";

  
  
const ClusterScanRadius = (props)=>{ 
    const {Data} = props;
    const SCAN= useContext_SCAN_FULL();
   
    let options = {
      strokeColor: '#6094ff',
      strokeOpacity: 0.9,
      strokeWeight: 1,
      fillColor: '#6094ff',
      fillOpacity: 0.15,
      radius: (SCAN.LocationFilter.SearchRadius*1000),
      zIndex: 1
    }
    const CenterDotoptions = {
      strokeColor: '#6094ff',
      strokeOpacity: 1,
      strokeWeight: 1,
      fillColor: '#6094ff',
      fillOpacity: .5,
      radius: 10,
      zIndex: 1
    }

    useEffect(()=>{
      //options.radius= (SCAN.LocationFilter.SearchRadius*100)
      console.log((SCAN.LocationFilter.SearchRadius*100))
    },[SCAN])
    return(
        <>
            <Circle center={{lat: Data.Boundary.north,lng: Data.Boundary.west}} options={options}/>
            <Circle center={{lat: Data.Boundary.north,lng: Data.Boundary.west}} options={CenterDotoptions}/>
        </>
    )
}

export default ClusterScanRadius;