
import React, {useEffect, useState} from 'react'

import {useContext_STRAPI_FULL} from "../../Context/STRAPI";
import {useContext_UX_FULL} from "../../Context/UX";
import {useContext_SCAN_FULL} from "../../Context/SCAN";

import {interpolate} from "d3-interpolate";
import {  Marker  } from '@react-google-maps/api';
//const iconBase ="https://developers.google.com/maps/documentation/javascript/examples/full/images/";
import {uniqBy} from 'lodash'; 


const divStyle = {
    background: `white`,
    padding: 1
  }
 

/** Loop Markers */ 
const LocationMarkers = ()=>{

    const STRAPI = useContext_STRAPI_FULL();
    const UX = useContext_UX_FULL();
    const SCAN = useContext_SCAN_FULL();
    const [DisplayMarkers,setDisplayMarkers] = useState(null)
   
    let Targeticon = { };

    const onLoadMarker = marker => {console.log('marker Created')}
    const OnMarkerClick=(name)=>{console.log("Marker Clicked", name) }


      const ColorMe = (val)=>{
        let color = interpolate("#466dfb", "#ff6d6d")
        return  color((val).toFixed(2))
      }

      const FindMinMax=(Data)=>{
        let arr=[]

        console.log("FindMinMax", Data)
        Data.map((marker,i)=>{ 
       
            if(marker.count[0] != null){
              //console.log(marker.count[0])
              //console.log(marker.count[0].WorkOrders)
              arr.push(marker.count[0].WorkOrders) 
            }
          })
        return [Math.min(...arr),Math.max(...arr)]
      }


      const CreateMarkers = (markers)=>{

        console.log("markers", markers)
        
        let StoreMarkers=[]         
                markers.map((site,i)=>{
                    Targeticon = {
                        path: "M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z",
                        fillColor: '#fff',
                        fillOpacity: .9,
                        anchor: new window.google.maps.Point(0,0),
                        strokeWeight: 0,
                        scale: 1,
                        zIndex:10
                    }; 

                    console.log(site)
                    StoreMarkers.push( 
                        <>
                            <Marker
                                key={i}
                                onLoad={onLoadMarker}
                                title={site.name}
                                label={site.name}
                                icon={Targeticon}
                                onClick={()=>{OnMarkerClick(site.name)}}
                                position={{
                                        lat: parseFloat(site.lat),
                                        lng: parseFloat(site.long)
                                    }}
                            />
                        </>
                    )
                })
            
        
        setDisplayMarkers(StoreMarkers);
        
        }

      useEffect(()=>{ 
         
          CreateMarkers(STRAPI.sites)},[STRAPI.sites])

      return(  <>{DisplayMarkers}</>)

}


export default LocationMarkers;



const MarkerIcon  = ()=>{
    return(<svg baseProfile="basic" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
<path d="M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z"/>
</svg>)
}