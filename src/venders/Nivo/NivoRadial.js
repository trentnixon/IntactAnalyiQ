import React, { useEffect }  from 'react'
import { ResponsiveRadar } from '@nivo/radar'
import { useState } from 'react'
import {colorArray} from "actions/HandleUX";
const NivoPie=(props)=>{

    const {data,id,value, Label} = props
    const [NivoData, setNivoData] = useState([])
    const [NivoRadialKeys, setNivoRadialKeys] = useState([])
    const CreateNivoData=()=>{
            //console.log(id,value)
            let NivoRadialKeys=[]
            let NivoRadialData=[]
            data.map((row,i)=>{
                NivoRadialKeys.push(row[id])

                NivoRadialData.push({
                    "Name":row[id],
                    [Label]:row[value]=== undefined ? 0 : row[value],
                }) 
            })
           //console.log(NivoRadialData)
            //console.log(NivoRadialKeys)
            setNivoData(NivoRadialData)
            setNivoRadialKeys(NivoRadialKeys)
    }

    useEffect(()=>{ 
        
        //console.log(data)
        CreateNivoData() },[data])


    return(
        <ResponsiveRadar
            data={NivoData}
            keys={[Label]}
            indexBy={'Name'}
            colors={colorArray}
            maxValue="auto"
            margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
            curve="linearClosed"
            borderWidth={1}
            borderColor="#ffc200" 
            gridLevels={15}
            gridShape="circular"
            gridLabelOffset={26}
            enableDots={true}
            dotSize={10}
            dotColor="#ffc200"
            dotBorderWidth={2}
            dotBorderColor="#ffc200"
            enableDotLabel={true}
            dotLabel="value"
            dotLabelYOffset={-12}
            colors={{ scheme: 'nivo' }}
            fillOpacity={0.5}
            blendMode="multiply"
            animate={true}
            motionConfig="wobbly"
            isInteractive={true}
       
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