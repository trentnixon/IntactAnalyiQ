import React, { useEffect }  from 'react'
import { ResponsiveWaffle } from '@nivo/waffle'
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
                NivoWaffleData.push({
                    "id": row[id],
                    "label": row[id],
                    "value": row[value],
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
        <ResponsiveWaffle

        data={NivoData}
        total={NivoWaffleTotal}
        rows={10}
        columns={50}
        fillDirection="left"
        margin={{ top: 60, right: 10, bottom: 10, left: 0 }}
        colors={colorArray}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.3 ] ] }}
        animate={true}
        motionStiffness={90}
        motionDamping={11}
        legends={[
            {
                anchor: 'top',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: -50,
                itemsSpacing: 4,
                itemWidth: 300,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                itemTextColor: '#777',
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000',
                            itemBackground: '#f7fafb'
                        }
                    }
                ]
            }
        ]}
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