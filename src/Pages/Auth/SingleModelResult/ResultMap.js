import React, {useEffect, useState} from 'react'

// Components

import Colorkey from "./components/MapColorKey"
import SingleModelMap from "./components/SingleModelMap"
const ResultMap = ()=>{
    return(
         <div className="ScanMapMain" id="MainMap">
             <h2>Model Map</h2>
             <p>Below is a Visual account of the Model.</p>
            <SingleModelMap />
            <Colorkey />
        </div>
    )
}

export default ResultMap; 