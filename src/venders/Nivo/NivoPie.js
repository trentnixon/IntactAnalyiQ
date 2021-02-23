import React, { useEffect }  from 'react'
import { ResponsivePie } from '@nivo/pie'
import { useState } from 'react'
import {colorArray} from "actions/HandleUX";
const NivoPie=(props)=>{

    const {data,id,value} = props
    const [NivoData, setNivoData] = useState([])
    const CreateNivoData=()=>{
            let Nivo=[]
            data.map((row,i)=>{
                Nivo.push({
                    "id": row[id],
                    "label": row[id],
                    "value": row[value],
                })
            }) 
            setNivoData(Nivo)
    }

    useEffect(()=>{ CreateNivoData() },[data])


    return(
        <ResponsivePie 
            data={NivoData}
            margin={{ top: 50, right: 100, bottom: 50, left: 100 }}
            innerRadius={0.4}
            padAngle={3}
            cornerRadius={3}
            colors={colorArray}
            sortByValue={true}
            borderWidth={1}
            borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
            radialLabelsSkipAngle={10}
            radialLabelsTextColor="#2f2f2f"
            radialLabelsLinkColor={{ from: 'color' }}
            sliceLabelsSkipAngle={10}
            sliceLabelsTextColor="#ffc200"
            radialLabelsLinkStrokeWidth={1}
            radialLabelsTextXOffset={1}
            radialLabelsLinkHorizontalLength={15}    
        />
    )
}

export default NivoPie;
/*
  legends={[
                {
                    anchor: 'bottom-left',
                    direction: 'column',
                    justify: false,
                    translateX: 0,
                    translateY: 56,
                    itemsSpacing: 0,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: '#999',
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 18,
                    symbolShape: 'circle',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000'
                            }
                        }
                    ]
                }
            ]}
*/