import React, {useEffect, useState} from 'react'
import { useSelector } from "react-redux";
import axios from 'axios';
// import {NodeGeocoder} from 'node-geocoder';
//

import { GoogleMap, LoadScript, Rectangle, Marker,Polyline  } from '@react-google-maps/api';

const Sweeper = ()=>{

    
    const onLoadpoly=()=>{}
    const Polypath = [  {lat: -37.82212105, lng:144.94395588854985},{lat: -37.8010762, lng:144.94395588854985},];

    const Polyoptions = {
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      clickable: false,
      draggable: false,
      editable: false,
      visible: true,
      radius: 30000,
      zIndex: 1
    };


    return(
        <Polyline
                onLoad={onLoadpoly}
                path={Polypath}
                options={Polyoptions}
                />
    )
}

export default Sweeper;