import React from 'react'

// Components
import Map_SingleModelReview_FULLModel from "Pages/Auth/Components/Maps/Map_SingleModelReview_FULLModel"
import MapColorKey from "Pages/Auth/Components/Maps/MapColorKey"


const ResultMap = ()=>{
    return(
         <div className="ScanMapMain" id="MainMap">
            <Map_SingleModelReview_FULLModel />
            <MapColorKey />
        </div>
    )
}

export default ResultMap; 