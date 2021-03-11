import React, { useEffect }  from 'react'
import { ResponsiveNetwork } from '@nivo/network'

import { NivoNetwork } from 'actions/CreateSingleViewModel';
import { useState } from 'react'
import {colorArray} from "actions/HandleUX";


const NivoPie=()=>{
   
    
    useEffect(()=>{
           //console.log(NivoNetwork())
    },[NivoNetwork()])

    return(
        <ResponsiveNetwork
            nodes={NivoNetwork().node}
            links={NivoNetwork().links}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            repulsivity={70}
            iterations={90}
            distanceMax={70}
       
            nodeColor={function(e){return e.color}}
            nodeBorderWidth={1}
            nodeBorderColor={{ from: 'color', modifiers: [ [ 'darker', 0.8 ] ] }}
            linkThickness={function(e){return 2*(2-e.source.depth)}}
            linkDistance={10}
            motionStiffness={90}
            motionDamping={10}
            />
    )
}

export default NivoPie;
