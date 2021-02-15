import React, { useEffect }  from 'react'
import { ResponsiveFunnel } from '@nivo/funnel'
import { useState } from 'react'
import {colorArray} from "actions/HandleUX";
const NivoPie=(props)=>{

    const {data,id,value, Label} = props
    const [NivoData, setNivoData] = useState([])
    const [NivoWaffleTotal, setNivoWaffleTotal] = useState([])
    const CreateNivoData=()=>{
            console.log(id,value)
            let NivoWaffleTotal=[]
            let NivoWaffleData=[]
            data.map((row,i)=>{
                NivoWaffleTotal.push(row[value])
                console.log(row[value])
                NivoWaffleData.push({
                    "id": row[id],
                    "label": row[id],
                    "value": row[value]  === undefined ? 0 : row[value] ,
                })
            })
            console.log(NivoWaffleData)
            //console.log(NivoRadialKeys)
            setNivoData(NivoWaffleData)
            setNivoWaffleTotal(NivoWaffleTotal.reduce((a, b) => a + b, 0)) 
    }

    useEffect(()=>{ 
        
        console.log(data)
        CreateNivoData() 
    },[data])


    return(
        <ResponsiveFunnel
            data={NivoData}
            margin={{ top: 0, right: 0, bottom: 20, left: 0 }}
            valueFormat=">-.4s"
            colors={colorArray}
            borderWidth={40}
            labelColor="#ffc200"
            beforeSeparatorLength={100}
            beforeSeparatorOffset={20}
            afterSeparatorLength={100}
            afterSeparatorOffset={20}
            currentPartSizeExtension={10}
            currentBorderWidth={40}
            motionConfig="wobbly"
    />
    )
}

export default NivoPie;
