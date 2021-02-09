
import React, {useEffect, useState} from 'react'

import {useContext_UX_FULL} from "Context/UX";
import {useContext_SCAN_FULL} from "Context/SCAN";

import {interpolate} from "d3-interpolate";
import {  Marker, MarkerClusterer  } from '@react-google-maps/api';
//const iconBase ="https://developers.google.com/maps/documentation/javascript/examples/full/images/";
import {uniqBy} from 'lodash'; 
import {RegionColor} from "actions/HandleUX"

const divStyle = {
    background: `white`,
    padding: 1
  }
 
  const mcOptions = {
    styles: [{
        height: 53,
        url: "/clusters/m1.png",
        width: 53,

      },
      {
        height: 56,
        url: "/clusters/m2.png",
        width: 56,
      },
      {
        height: 66,
        url: "/clusters/m3.png",
        width: 66,
      },
      {
        height: 78,
        url: "/clusters/m4.png",
        width: 78,
      },
      {
        height: 90,
        url: "/clusters/m5.png",
        width: 90,
      }
    ]
  }

/** Loop Markers */ 
const MarkerBasedLocationMarkers = ()=>{

    //const STRAPI = useContext_STRAPI_FULL();
    const UX = useContext_UX_FULL();
    const SCAN = useContext_SCAN_FULL();
    const [DisplayMarkers,setDisplayMarkers] = useState(null)
   
    let Targeticon = { };

    const onLoadMarker = marker => {console.log('marker Created')}
    const OnMarkerClick=(name, Region)=>{console.log("Marker Clicked", name, Region) }


      const ColorMe = (val)=>{
        let color = interpolate("#466dfb", "#ff6d6d")
        return  color((val).toFixed(2))
      }

      const FindMinMax=(Data)=>{
        let arr=[]

        //console.log("FindMinMax", Data)
        Data.map((marker,i)=>{ 
       
            if(marker.count[0] != null){
              //console.log(marker.count[0])
              //console.log(marker.count[0].WorkOrders)
              arr.push(marker.count[0].WorkOrders) 
            }
          })
        return [Math.min(...arr),Math.max(...arr)]
      }


      const CreateMarkers = (markers,  clusterer)=>{

        //console.log("markers", markers)
        let StoreMarkers=[];

        markers.map((centerPoint,i)=>{
          //console.log(centerPoint.sites)
          centerPoint.sites.map((site,ii)=>{

              Targeticon = {
                path: "M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z",
                fillColor: RegionColor(centerPoint.scanCategory),
                fillOpacity: .9,
                anchor: new window.google.maps.Point(0,0),
                strokeWeight: 0,
                scale: 1
            }; 
          
            
            StoreMarkers.push( 
                
                    <Marker
                        clusterer={clusterer}
                        key={site.name}
                        onLoad={onLoadMarker}
                        title={site.name}
                        label={site.name}
                        icon={Targeticon}
                        onClick={()=>{OnMarkerClick(site.name, centerPoint.scanCategory)}}
                        position={{
                                lat: parseFloat(site.lat),
                                lng: parseFloat(site.long)
                            }}
                    />
                
            )
            })
        })
        /*
        Object.keys(markers).map((key, value)=>{
            //console.log(markers[key], value)
              markers[key].map((sites,i)=>{
                  sites.map((site,ii)=>{

                  
                  })
              })
          })*/
     //   setDisplayMarkers(StoreMarkers);
        return StoreMarkers;
        }


 
   

      useEffect(()=>{ 
        if(CreateMarkers(SCAN.SelectedModel.STOREMARKERCENTERPOINTS) != undefined)
          CreateMarkers(SCAN.SelectedModel.STOREMARKERCENTERPOINTS)
      },[SCAN.SelectedModel])

      return(  <>
               
                 <MarkerClusterer options={mcOptions} maxZoom={12} minimumClusterSize={30}>
                    {(clusterer) =>
                       CreateMarkers(SCAN.SelectedModel.STOREMARKERCENTERPOINTS, clusterer)
                    }
                  </MarkerClusterer>
                </>
                )

}


export default MarkerBasedLocationMarkers;

//  {DisplayMarkers}
/*
locations.map((location) => (
                        <Marker key={createKey(location)} position={location} clusterer={clusterer} />
                      ))
*/