import React  from 'react'
import {useContext_COMMS_FULL} from 'Context/COMMS'
import ChartHeader from "Pages/Auth/Components/Layout/ChartHeader";
import NivoNetwork from "venders/Nivo/NivoNetwork"



const LocationsNetwork = ()=>{
    const CHARTSETUP = useContext_COMMS_FULL().ChartSetup
    const CHARTMETA = useContext_COMMS_FULL().ChartMeta

    return( 
        <>
        
            <ChartHeader Section='Locations' Chart='Network' Meta='Network'/>
            <div style={{height: 400, width:'100%'}}><NivoNetwork /></div>
        </>
    ) 

}

export default LocationsNetwork; 