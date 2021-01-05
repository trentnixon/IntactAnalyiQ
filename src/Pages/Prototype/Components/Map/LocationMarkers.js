
import React, {useEffect, useState} from 'react'

//import {useContext_STRAPI_FULL} from "../../../../Context/STRAPI";
import {useContext_UX_FULL} from "../../../../Context/UX";

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

    //const STRAPI = useContext_STRAPI_FULL();
    const UX = useContext_UX_FULL();
    
    const [DisplayMarkers,setDisplayMarkers] = useState(null)
    const [StarMarker, setStarMarker] = useState(null)
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
         let MinMax = FindMinMax(markers);
         let NewMarkers =    uniqBy(markers, 'combined');
         let StoreMarkers=[]
         
         console.log('CreateMarkers', markers.length, NewMarkers.length);
         
         NewMarkers.map((marker, i)=>{
                     let fillVariable;
         
                    if(!isNaN(parseFloat(marker.lat)) && marker.count[0] != null){

                            //Find the WO percetage value based on highest and lowest range
                            let int = ((marker.count[0].WorkOrders - MinMax[0]) * 100) / (MinMax[1] - MinMax[0])
                            fillVariable = ColorMe((int.toFixed(2)/10));

                            Targeticon = {
                                path: "M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z",
                                fillColor: fillVariable,
                                fillOpacity: .9,
                                anchor: new window.google.maps.Point(0,0),
                                strokeWeight: 0,
                                scale: 1,
                                zIndex:100
                            }; 
                               

                            StoreMarkers.push( 
                                <>
                                    <Marker
                                        key={i}
                                        onLoad={onLoadMarker}
                                        title={marker.name}
                                        label={marker.name}
                                        icon={Targeticon}
                                        onClick={()=>{OnMarkerClick(marker.name)}}
                                        position={{
                                                lat: parseFloat(marker.lat),
                                                lng: parseFloat(marker.long)
                                            }}
                                    />
                                </>
                            )
                    }                   
            })
            setDisplayMarkers(StoreMarkers);
        }

      useEffect(()=>{ CreateMarkers(UX.MapParameters.markers)},[UX.MapParameters])

      return(  <>{DisplayMarkers} {StarMarker}</>)

}


export default LocationMarkers;



const MarkerIcon  = ()=>{
    return(<svg baseProfile="basic" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
<path d="M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z"/>
</svg>)
}