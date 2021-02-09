import React from 'react'

// Components
import Map_SingleModelReview_FULLModel from "Pages/Auth/Components/Maps/Map_SingleModelReview_FULLModel"
import MapColorKey from "Pages/Auth/Components/Maps/MapColorKey"
import MainMapFilters from "Pages/Auth/Components/Maps/MapMainFilter";

const ResultMap = ()=>{
    return(
        <>
  
            <div className="ScanMapMain" id="MainMap">
                <MainMapFilters />
                <MapColorKey />
                <Map_SingleModelReview_FULLModel />
            </div>
        </>
    )
}

export default ResultMap; 