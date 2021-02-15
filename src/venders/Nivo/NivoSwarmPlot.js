import React, { useEffect }  from 'react'
import { ResponsiveSwarmPlot } from '@nivo/swarmplot'
import { useState } from 'react'
import {colorArray} from "actions/HandleUX";
import {sumBy} from 'lodash'
const NivoPie=(props)=>{

  
    const {data,Volume, Group} = props
    const [NivoData, setNivoData] = useState([])
    const [NivoRadialKeys, setNivoRadialKeys] = useState([])
    const [VolumeSize, setVolumeSize] = useState([])
    const [ValueSize, setValueSize] = useState([])
    const CreateNivoData=()=>{
            console.log(data)
            let Nivo=[]
            let NivoRadialKeys=[]
            let CreateVolumeSize=[]
            let CreateValueSize=[]
            data.map((row,i)=>{
               // console.log(sumBy(row.resourceQuota, function(o) { return o.ResourceAllocation; }))
               // console.log(row.resourceQuota)
                Nivo.push({
                    "id":`${i}_${row[Group]}`,
                    "group": row[Group],
                    "value": sumBy(row.StripedSites, function(o) { return o.SumWorkOrder; }),
                    "volume": row[Volume].length,
                })
                CreateVolumeSize.push( row[Volume].length)
                CreateValueSize.push(sumBy(row.StripedSites, function(o) { return o.SumWorkOrder; }))

                if(NivoRadialKeys.indexOf(row[Group]) === -1){
                    NivoRadialKeys.push(row[Group])
                }
               
            }) 
            setNivoData(Nivo)

           // console.log(Nivo)
           // console.log(NivoRadialKeys)
            setNivoRadialKeys(NivoRadialKeys)
            setVolumeSize(CreateVolumeSize)
            setValueSize(CreateValueSize)


           // console.log(CreateVolumeSize, [ Math.min(...CreateVolumeSize), Math.max(...CreateVolumeSize) ])
    }

    useEffect(()=>{ CreateNivoData() },[data])


    return(
        <ResponsiveSwarmPlot
        data={NivoData}
        groups={NivoRadialKeys}
        value="value"
        valueFormat=""
        valueScale={{ type: 'linear', min: Math.min(...ValueSize), max: Math.max(...ValueSize), reverse: false }}
        size={{ key: 'volume', values: [ Math.min(...VolumeSize), Math.max(...VolumeSize) ], sizes: [ 6, 20 ] }}
        forceStrength={1}
        simulationIterations={100}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.6
                ],
                [
                    'opacity',
                    0.5
                ]
            ]
        }}
        margin={{ top: 80, right: 100, bottom: 80, left: 100 }}
        axisTop={{
            orient: 'top',
            tickSize: 10,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Place Work orders, Size on Site numbers',
            legendPosition: 'middle',
            legendOffset: -46
        }}
        axisRight={{
            orient: 'right',
            tickSize: 10,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'price if vertical, group if horizontal',
            legendPosition: 'middle',
            legendOffset: 76
        }}
        axisBottom={{
            orient: 'bottom',
            tickSize: 10,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'group if vertical, price if horizontal',
            legendPosition: 'middle',
            legendOffset: 46
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 10,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'price if vertical, group if horizontal',
            legendPosition: 'middle',
            legendOffset: -76
        }}
        motionStiffness={50}
        motionDamping={10}
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