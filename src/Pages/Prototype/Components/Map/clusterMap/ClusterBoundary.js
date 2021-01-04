import React from 'react'
import { Rectangle } from '@react-google-maps/api';


const options = {
    strokeColor: '#008000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#008000',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    zIndex: 1
  }
const RegionalBoundary = (props)=>{
    const {Data} = props
    const  Boundaries = Data.GroupedBoxBoundaryLimits
    return(
        <Rectangle options={options} bounds={ { north: Boundaries[2], south: Boundaries[3], east: Boundaries[0], west: Boundaries[1] } }/>
    )
}

export default RegionalBoundary;