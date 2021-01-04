import React from 'react'
import Controls from "../Controls/controls"
import Header from "./Header";
import Map from "../Map/map"
import ScanListResults from "./ScanResults"
import FilterControls from "./MapFilterControls"; 
import ScanNow from "../Controls/buttons/ScanStateBtn";

const ScanResultsLayout = ()=>{

    return(
        <div className="Main">
                <Controls />
                <Header />
                <FilterControls />
                <Map />
                <ScanNow />
                <ScanListResults /> 
        </div>
    )
}



export default ScanResultsLayout;




