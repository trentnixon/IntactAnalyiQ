import React  from 'react'
import { Rectangle } from '@react-google-maps/api';
import {useContext_UX_FULL} from "../../../../../Context/UX";

  
const ScannedRegionalBoundary = ()=>{
    const UX = useContext_UX_FULL();
    const  Boundaries = UX.MapParameters.LatLngBoundaries
    return(
        <Rectangle bounds={ { north: Boundaries[1], south: Boundaries[0], east: Boundaries[3], west: Boundaries[2] } }/>
    )
}

export default ScannedRegionalBoundary;