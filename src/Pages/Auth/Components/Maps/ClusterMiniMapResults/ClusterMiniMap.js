import React, { useEffect, useState } from 'react'
import { GoogleMap, Circle,Marker,Polygon } from '@react-google-maps/api';

import {RegionColor} from "actions/HandleUX";

const containerStyle = { height: "300px", width: "auto" };
let Targeticon = { };
const ClusterMap = (props)=>{
    const {result} = props;

    const [markers, setMarkers] = useState([])
    const [PolyPath, setPolyPath] = useState([])

    let options = {
        strokeColor: RegionColor(result.scanCategory),
        strokeOpacity: 0.9,
        strokeWeight: 1,
        fillColor: RegionColor(result.scanCategory),
        fillOpacity: 0.2,
        radius: ((result.range*1000)),
        zIndex: 1
      }

      const CreateMarkers = ()=>{

        //console.log("markers", markers)
        let StoreMarkers=[];

    
          //console.log(centerPoint.sites)
          result.sites.map((site,ii)=>{

              Targeticon = {
                //path: "M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z",
                path:"M-24-48h48v48h-48z",
                fillColor: RegionColor(result.scanCategory),
                fillOpacity: .9,
                anchor: new window.google.maps.Point(0,0), 
                strokeWeight: 0,
                scale: .5
            }; 
          
            
            StoreMarkers.push( 
                
                    <Marker
                       
                        key={site.name}
                     
                        title={site.name}
                        label={site.name}
                        icon={Targeticon}
                        
                        position={{
                                lat: parseFloat(site.lat),
                                lng: parseFloat(site.long)
                            }}
                    />
                
            )
            })
            setMarkers(StoreMarkers);
        }



        const CreatePolygon = ()=>{
          let Polyoptions = {
            strokeColor: RegionColor(result.scanCategory),
            strokeOpacity: 1,
            strokeWeight: 1.5,
            fillColor: RegionColor(result.scanCategory),
            fillOpacity: 0.1,
          
            zIndex: 1
          }

              let PolygonPath=[]
              result.polygon.map((point,i)=>{
                  //console.log(point)
                  PolygonPath.push({ lat: point[0], lng: point[1]})
              })
              
              setPolyPath(<Polygon paths={PolygonPath} options={Polyoptions} />)
              
            }


      useEffect(()=>{  
        CreateMarkers() 
        CreatePolygon()
      },[])

    return(
        <GoogleMap 
                mapContainerStyle={containerStyle}
                center={result.center}
                zoom={15}
            >
                { /* Child components, such as markers, info windows, etc. */ }
               
                {markers}
                {PolyPath}
        </GoogleMap>

    )
}
// <Circle center={result.center} options={options}/>
export default ClusterMap;