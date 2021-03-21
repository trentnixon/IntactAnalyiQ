import React, {useEffect, useState} from 'react'
import {useContext_SCAN_FULL} from "Context/SCAN";
import {useContext_UX_FULL} from "Context/UX";
import {Polygon} from '@react-google-maps/api';
import {findIndex} from 'lodash'; 
import {RegionColor,ResourceColor,SetFilterPolygon,SetSelectedCluster} from "actions/HandleUX";

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


    const FindColor = (type, cluster, resource)=>{
        let FixedColor
            if(type === 'Cluster'){
                FixedColor = RegionColor(cluster)
            }else{
                if(resource.length===1){
                    console.log(resource[0].Trade)
                    FixedColor = ResourceColor(resource[0].Trade)
                }
                else{
                    console.log("RESOURCE MIXED")
                    FixedColor = ResourceColor('CombinedCluster')
                }
            }

        return FixedColor;
    }


    const handleClick=(centerpoint)=>{
        console.log("Polygon Clicked", centerpoint)
        SetFilterPolygon(centerpoint.name)
        SetSelectedCluster(centerpoint)
    }

    const CreatePolygons = ()=>{
        let CreatePolyPaths=[]
        SCAN.SelectedModel.STOREMARKERCENTERPOINTS.map((centerpoint,i)=>{

  
            
/* ******************************************************************************** */         
// Map Filters
        //console.log(UX.AreaSelectFilter.ByColorScheme) 
        //console.log(centerpoint)
        // Filter Results by Cluster Type    
        if(UX.AreaSelectFilter.ByPolygon !== false)  
            if(centerpoint.name != UX.AreaSelectFilter.ByPolygon)
                return


        if(UX.AreaSelectFilter.ByClusterType !== false)  
            if(centerpoint.scanCategory != UX.AreaSelectFilter.ByClusterType)
                return

        // Filter Results by Reource Type  
        if(UX.AreaSelectFilter.ByResourceType !== false)  
            if(findIndex(centerpoint.resourceQuota, function(o) { return o.Trade === UX.AreaSelectFilter.ByResourceType}) === -1)
                 return


// End Map Filters
/* ******************************************************************************** */         


                let options = {
                    strokeColor: FindColor(UX.AreaSelectFilter.ByColorScheme, centerpoint.scanCategory, centerpoint.resourceQuota),
                    strokeOpacity: 1,
                    strokeWeight: 1.5,
                    fillColor:  FindColor(UX.AreaSelectFilter.ByColorScheme, centerpoint.scanCategory, centerpoint.resourceQuota),
                    fillOpacity: 0.1,
                  
                    zIndex: 1
                  }

                let PolygonPath=[]
                centerpoint.polygon.map((point,i)=>{
                    //console.log(point)
                    PolygonPath.push({ lat: point[0], lng: point[1]})
                })
                CreatePolyPaths.push(
                    <Polygon 
                        onClick={()=>{handleClick(centerpoint)}}    
                        paths={PolygonPath} 
                        key={`Polygon_${i}`}
                        options={options} />
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