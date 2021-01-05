import React, {useEffect, useState} from 'react'
import {useContext_STRAPI_FULL} from "../../Context/STRAPI";
import {useContext_UX_FULL} from "../../Context/UX";
import {useContext_SCAN_FULL} from "../../Context/SCAN";
import {RegionColor} from "../../actions/HandleUX"
import {ScanSites} from "../../actions/HandleMarkerBasedScan";

import { GoogleMap, LoadScript ,Marker} from '@react-google-maps/api';
// Components
import Markers from "./LocationMarkers";
import ALLMarkers from "./LocationMarkersALL";
import CenterPoints from "./MarkersCenterpoints";
import MarkerBasedResults from "./MarkerBasedResults";

const RenderScamSites = new ScanSites();
const MarkerBasedScan = ()=>{

    
    const STRAPI = useContext_STRAPI_FULL();
    const UX = useContext_UX_FULL();
    

    useEffect(()=>{
        console.log(STRAPI.sites);
        RenderScamSites.SiteList=STRAPI.sites;
        RenderScamSites.Search();
    },[STRAPI])

    return(
        <div>
            <Map />
           
        </div>
    )
}

export default MarkerBasedScan;


const containerStyle = { height: "600px", width: "auto" };
const Map=()=>{
    const SCAN = useContext_SCAN_FULL();
    useEffect(()=>{
        console.log(SCAN.MarkerScanResults)
    },[SCAN])
return(
    <div className="ScanMapMain" id="MainMap">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={{
                    lat: -37.813629,
                    lng: 144.963058
                  }}
                zoom={14}
               
            >
            { /* Child components, such as markers, info windows, etc. */ }
            
                <Markers />
                <CenterPoints />
            </GoogleMap>

            <ColorKey />
            <MarkerBasedResults />
        </div>
)
}

// <ALLMarkers />





const ColorKey = ()=>{

    return (
        
        <div>
        <div className="MapColorKey">
              <div >
                  <span style={{backgroundColor:RegionColor('SameBuilding')}}></span>
                  <h2>SameBuilding</h2>
              </div>
              <div >
                  <span style={{backgroundColor:RegionColor('CBD')}}></span>
                  <h2>CBD</h2>
              </div>
              <div >
                  <span style={{backgroundColor:RegionColor('InnerCity')}}></span>
                  <h2>InnerCity</h2>
              </div>
              <div>
                  <span  style={{backgroundColor:RegionColor('Metro')}}></span>
                  <h2>Metro</h2>
              </div>
              <div >
                  <span style={{backgroundColor:RegionColor('OuterMetro')}}></span>
                  <h2>OuterMetro</h2>
              </div>
              <div >
                  <span style={{backgroundColor:RegionColor('Regional')}}></span>
                  <h2>Regional</h2>
              </div>
              <div >
                  <span style={{backgroundColor:RegionColor('Remote')}}></span>
                  <h2>Remote</h2>
              </div>
              
              <div >
                  <span style={{backgroundColor:RegionColor('ExtremeRemote')}}></span>
                  <h2>ExtremeRemote</h2>
              </div>
        </div>
  </div>
    )
}



/*
 {
                STRAPI.sites.map((site, i)=>{
                    return(
                        <li key={i}>{i}. {site.name}</li>
                        
                    )
                })
            }
 onLoad={onLoad}
                onUnmount={onUnmount}
                <PerimeterBox />
            <LocationMarkers />
            <ScanBox />
            <AddNewRegion />
*/