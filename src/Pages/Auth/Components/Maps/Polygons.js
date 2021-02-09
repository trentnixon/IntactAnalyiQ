import React, {useEffect, useState} from 'react'
import {useContext_SCAN_FULL} from "Context/SCAN";
import {useContext_UX_FULL} from "Context/UX";
import {RegionColor} from "actions/HandleUX"
import {Polygon} from '@react-google-maps/api';
import {findIndex} from 'lodash'; 

const options = {
    fillColor: "lightblue",
    fillOpacity: .1,
    strokeColor: "red",
    strokeOpacity: 1,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    geodesic: false,
    zIndex: 1
  }


const Polygons = ()=>{

    const SCAN = useContext_SCAN_FULL();
    const UX = useContext_UX_FULL();
    const [DisplayPolygons, setPolygons] = useState([])

    const CreatePolygons = ()=>{
        let CreatePolyPaths=[]
        SCAN.SelectedModel.STOREMARKERCENTERPOINTS.map((centerpoint,i)=>{

  
            
/* ******************************************************************************** */         
// Map Filters

        //console.log(centerpoint.scanCategory)
        // Filter Results by Cluster Type    
        if(UX.AreaSelectFilter.ByClusterType !== null)  
            if(centerpoint.scanCategory != UX.AreaSelectFilter.ByClusterType)
                return

        // Filter Results by Reource Type  
        if(UX.AreaSelectFilter.ByResourceType !== null)  
            if(findIndex(centerpoint.resourceQuota, function(o) { return o.Trade === UX.AreaSelectFilter.ByResourceType}) === -1)
                 return

// End Map Filters
/* ******************************************************************************** */         


                let options = {
                    strokeColor: RegionColor(centerpoint.scanCategory),
                    strokeOpacity: 1,
                    strokeWeight: 1.5,
                    fillColor: RegionColor(centerpoint.scanCategory),
                    fillOpacity: 0.1,
                  
                    zIndex: 1
                  }

                let PolygonPath=[]
                centerpoint.polygon.map((point,i)=>{
                    //console.log(point)
                    PolygonPath.push({ lat: point[0], lng: point[1]})
                })
                CreatePolyPaths.push(
                    <Polygon paths={PolygonPath} options={options} />
                )
                
        })

        setPolygons(CreatePolyPaths)
    }



     useEffect(()=>{ CreatePolygons() },[SCAN.SelectedModel])
     useEffect(()=>{},[DisplayPolygons])
     useEffect(()=>{ CreatePolygons() },[UX])
    return(
        <>
            {DisplayPolygons}
        </>
    )
} 

export default Polygons;