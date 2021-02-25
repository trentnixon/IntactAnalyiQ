import React, { useEffect }  from 'react'
import { ResponsiveLine } from '@nivo/line'
import { useState } from 'react'
import {colorArray} from "actions/HandleUX";

const NivoPie=(props)=>{

    const {data,Xaxis,value,Yaxis, label} = props
    const [NivoData, setNivoData] = useState([])
    
    const CreateNivoData=()=>{
            //console.log(Xaxis,value)
            let Nivo=[{ 'id':Yaxis, "color": "#ffc200", 'data':[]}]

            data.map((row,i)=>{
                
                Nivo[0]['data'].push({
                    "x": row[Xaxis],
                    "y": row[value],
                    
                })
            }) 
            //console.log(Nivo)
            setNivoData(Nivo)
    }

    useEffect(()=>{ 
        //console.log(data);
        CreateNivoData() },[data])


    return(
        <ResponsiveLine
        data={NivoData}
        margin={{ top: 10, right: 10, bottom: 80, left: 50 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: label,
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        pointSize={10}
        pointColor="#ffc200"
        pointBorderWidth={2}
        pointBorderColor="#ffc200"
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom',
                direction: 'column',
                justify: false,
                translateX: 0,
                translateY: 70,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: '#ffc200',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
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