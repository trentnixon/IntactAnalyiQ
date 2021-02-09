import React, {useEffect, useState} from 'react'

import {useContext_UX_FULL} from "Context/UX";
import {CreateMapParameters} from "actions/HandleUX"

import { GoogleMap, LoadScript ,Marker} from '@react-google-maps/api';

// Components
import LocationMarkers from "./LocationMarkers";
import PerimeterBox from "./PerimeterBox";
import ScanBox from "./ScanBox"; 
import AddNewRegion from "./AddNewRegion";

let _ = require('lodash');
const iconBase ="/icons/";
const containerStyle = { height: "600px", width: "auto" };
let Targeticon = {};
const MapSwitch = ()=>{
    
    //const STRAPI = useContext_STRAPI_FULL();
    const UX = useContext_UX_FULL();
    
    // USe function pulls the Meta data from UX.SelectedArea. Its !IMPORTANT
    useEffect(()=>{ CreateMapParameters(UX.SelectedArea) },[UX.AreaSelectFilter])

    useEffect(()=>{ CreateMapParameters(UX.SelectedArea) },[UX.SelectedArea])
    return( 
        <>
            {
                UX.MapParameters.SetMap ? <DisplayMap />:<div>Switch</div>
            }
        </>
    )

   
}


export default MapSwitch;



const DisplayMap=()=>{

    const UX = useContext_UX_FULL();
    const [MapParameters, setMapParameters] = useState(UX.MapParameters)
    const onLoad = React.useCallback(function callback(map) {

        Targeticon = {
            url: iconBase + "target.png", // url
            scaledSize: new window.google.maps.Size(50, 50), // scaled size
            origin: new window.google.maps.Point(0,0), // origin
            anchor: new window.google.maps.Point(25, 25) // anchor
        }; 

                const bounds = new window.google.maps.LatLngBounds(
                    //bottom left
                    new window.google.maps.LatLng(MapParameters.LatLngBoundaries[0], MapParameters.LatLngBoundaries[2]),
                    //top right
                    new window.google.maps.LatLng(MapParameters.LatLngBoundaries[1], MapParameters.LatLngBoundaries[3])
                    )
                    map.fitBounds(bounds)
                    //setMap(map);
                
      }, [])
      
      
      const onUnmount = React.useCallback(function callback(map) {
        //setMap(null)
  }, []);


  useEffect(()=>{
      setMapParameters(UX.MapParameters);},[UX.MapParameters])

    return(
       <div className="ScanMapMain" id="MainMap">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={{
                    lat: MapParameters.BoundaryCenterPoint[0],
                    lng: MapParameters.BoundaryCenterPoint[1]
                  }}
                zoom={MapParameters.zoom}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
            { /* Child components, such as markers, info windows, etc. */ }
            <PerimeterBox />
            <LocationMarkers />
            <ScanBox />
            <AddNewRegion />
        </GoogleMap>
        </div>
    )
}

/*

      
             
             


      const ReverseGeoCode = (OBJ)=>{

        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${OBJ.lat},${OBJ.lng}&key=AIzaSyCfjTtkNqCy9J_CTva17nVpWqRff8CeCjI`)
        .then((res)=>{ 
                //console.log(res);
                if(res.data.results.length > 0 ){
                    //console.log(res.formatted_address)
                    setCenteredLocation(res.data.results[0].formatted_address)
                }
                else{
                    setCenteredLocation("No Result Returned!")
                }
                
            })
      }





      

const GeoSourceResources = (props)=>{



    // collection infomation from Feature
    const {SelectedRegion} = props
    const [center,setCenter] = useState({ lat: 37.090240, lng: -95.712891 })
    const [LatLngBounds, setLatLngBounds] = useState([])
    const [zoom, setZoom] = useState(2)
    const [Markerset, setMarkerset]= useState(null)
    
    // Display Map when true
    const [LoadingMapDetails, setLoadingMapDetails] = useState(false)
    

    const findBoundary = (Data)=>{

            let centerLatArray = [];
            let centerLngArray = [];
            Data.map((marker, i)=>{
                if(!isNaN(parseFloat(marker.lat))){
                    centerLatArray.push(parseFloat(marker.lat))
                    centerLngArray.push(parseFloat(marker.long))
                }
            })

            var centerLat = ((Math.min(...centerLatArray) + Math.max(...centerLatArray))/2)
            var centerLng = ((Math.min(...centerLngArray) + Math.max(...centerLngArray))/2)

            //console.log(centerLat);
            //console.log(centerLng);
            
            setLatLngBounds([Math.min(...centerLatArray),Math.max(...centerLatArray),Math.min(...centerLngArray),Math.max(...centerLngArray)])
            setZoom(14)
            setCenter({lat:centerLat, lng:centerLng})
            setLoadingMapDetails(true)
          
      }



      useEffect(()=>{ 
          //console.log("New Location Selected")
            findBoundary(SelectedRegion.sites); 
        }, [SelectedRegion])

    return (
        <div>
            { LoadingMapDetails ? <DisplayMap LatLngBounds={LatLngBounds} center={center} zoom={zoom} {...props}/>: 'Loading Map'  }
        </div>
    )
}


*/