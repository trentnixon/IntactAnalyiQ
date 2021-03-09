import React, { useEffect }  from 'react'
import { ResponsivePie } from '@nivo/pie'
import { ResponsiveSunburst } from '@nivo/sunburst'
import { useState } from 'react'
import {colorArray} from "actions/HandleUX";

const NivoSunburst=(props)=>{

    const {data,id,value} = props
    const [NivoData, setNivoData] = useState([])


    useEffect(()=>{ 
        console.log(data)
     },[data])


    return(
        <ResponsiveSunburst
            data={data}
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            id="name"
            value="loc"
            cornerRadius={2}
            borderWidth={1}
            borderColor="white"
            colors={function(e){return e.color} }
            childColor={{ from: 'color', modifiers: [['brighter', 0.30]] }}
            //childColor={function(e){return e.color} }
            //childColor="noinherit"
            animate={true}
            motionConfig="wobbly"
            isInteractive={true}
        />
    )
}

export default NivoSunburst;
