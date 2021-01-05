
import React, { useEffect, useState } from 'react'
import { Circle } from '@react-google-maps/api';
import {useContext_SCAN_FULL} from "../../Context/SCAN";

import {RegionColor} from "../../actions/HandleUX"



const MarkerCenterpoints = ()=>{
    const SCAN = useContext_SCAN_FULL();
    const [Centerpoints, setCenterpoints] = useState(null)
    
    const CreateCenterpoints = ()=>{
        let StorePoints=[]       
        SCAN.MarkerScanCenterPoints.map((center,i)=>{
        
/*
                        {
                            name:site.name,
                            center:{
                                lat: site.lat,
                                lng: site.long
                              },
                            range:Range.range[1]
                        }
            */
           //console.log(center.center, center.range)
           
           

           let options = {
               strokeColor: RegionColor(center.region),
               strokeOpacity: 0.9,
               strokeWeight: 1,
               fillColor: RegionColor(center.region),
               fillOpacity: 0.3,
               radius: ((center.range*1000)),
               zIndex: 1
             }
            let Featheroptions = {
                strokeColor: RegionColor(center.region),
                strokeOpacity: 0.7,
                strokeWeight: 3,
                fillColor: RegionColor(center.region),
                fillOpacity: 0.3,
                radius: (( (center.range+((center.feather/100)*center.range)) *1000)),  
                zIndex: 1
              }
           StorePoints.push(
           <>
            <Circle center={center.center} options={options}/>
            <Circle center={center.center} options={Featheroptions}/>
           </>
           )
            
        })
        setCenterpoints(StorePoints)
        
    }
    
    
    useEffect(()=>{  CreateCenterpoints() },[SCAN.MarkerScanCenterPoints])

    useEffect(()=>{},[ Centerpoints])

    return(
        <>
        {Centerpoints}
        </>
    )
}

export default MarkerCenterpoints;