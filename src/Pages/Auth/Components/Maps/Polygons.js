import React, {useEffect, useState} from 'react'
import {useContext_SCAN_FULL} from "Context/SCAN";
import {RegionColor} from "actions/HandleUX"
import {Polygon} from '@react-google-maps/api';


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
    const [DisplayPolygons, setPolygons] = useState([])

    const CreatePolygons = ()=>{
        let CreatePolyPaths=[]
        SCAN.SelectedModel.STOREMARKERCENTERPOINTS.map((centerpoint,i)=>{
                //console.log(centerpoint.polygon)

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



    useEffect(()=>{  
     
        CreatePolygons()
     },[SCAN.SelectedModel])

     useEffect(()=>{},[DisplayPolygons])
    return(
        <>
            {DisplayPolygons}
        </>
    )
} 

export default Polygons;