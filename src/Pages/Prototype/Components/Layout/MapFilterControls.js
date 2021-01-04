import React from 'react'

import Radius from "../Controls/inputs/SelectRaduis";
import GridSpacing from "../Controls/inputs/SelectGridSpacing";
import SiteCount from "../Controls/inputs/SelectMinSitesPerScan";
import MinWorkOrders from "../Controls/inputs/SelectMinWorkOrders";
import MaxWorkOrders from "../Controls/inputs/SelectMaxWorkOrders";

const MapFilterControls = ()=>{

    return(
        <div className="FilterControlsContainer">
            <h2>Scan Controls</h2>
            <p>Here we can fine tune the parameters of the scan. Change the Grid spacing for each scan and the Radius at which each grid pointsd looks for sites </p>
            <p>Then amend the threshold to which a cluster should be accepted.i.e. Min sites and  Min v Max  Work orders per cluster.</p>
            <div className="FilterControls">
                <GridSpacing />
                <Radius />
                <SiteCount />
                <MinWorkOrders />
                <MaxWorkOrders />
            </div>
        </div>
    )
}



export default MapFilterControls;