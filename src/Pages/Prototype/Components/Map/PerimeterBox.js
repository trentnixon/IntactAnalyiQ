import React, {useEffect, useState} from 'react'

import {useContext_UX_FULL} from "../../../../Context/UX";
import { Rectangle} from '@react-google-maps/api';

 const PerimeterBox = ()=>{

    const UX = useContext_UX_FULL();
    const [RecBounds, setRecBounds] = useState(null)
    const onLoadRec = ()=>{ console.log("REC BOX DONE")}

        useEffect(()=>{
            setRecBounds(
                {
                    north: UX.MapParameters.LatLngBoundaries[1],
                    south: UX.MapParameters.LatLngBoundaries[0],
                    east: UX.MapParameters.LatLngBoundaries[3],
                    west: UX.MapParameters.LatLngBoundaries[2]
                  } 
            )
        },[UX.MapParameters])

        useEffect(()=>{},[RecBounds]) 
     return( <Rectangle  onLoad={onLoadRec}  bounds={RecBounds} /> )
 }

 export default PerimeterBox;