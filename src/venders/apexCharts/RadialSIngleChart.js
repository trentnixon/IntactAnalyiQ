import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,ResponsiveContainer,Legend, Tooltip} from 'recharts';
import {colorArray} from "actions/HandleUX";


const SimpleRadial = (props)=>{
    const {Data, term} = props
    return(
        <ResponsiveContainer width='100%' height={300}>
        <RadarChart  outerRadius={100}  data={Data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <PolarRadiusAxis />
            <Radar name={term} dataKey="value" stroke={colorArray[0]} fill={colorArray[0]} fillOpacity={0.6} />
            <Tooltip />
            <Legend />
        </RadarChart>
      </ResponsiveContainer>
    )
}


export default SimpleRadial;