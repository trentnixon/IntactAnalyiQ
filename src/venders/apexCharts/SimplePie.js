import React  from 'react';

import { ResponsiveContainer,PieChart, Pie,Legend, Tooltip,Cell} from 'recharts';
import {colorArray} from "actions/HandleUX";

      
const ExportPieChart = (props)=>{
    const {Data} = props
    return (
      <>
      <ResponsiveContainer width='100%' height={300}>
        <PieChart >
            <Pie dataKey="value" isAnimationActive={false} data={Data}  outerRadius={80} fill="#ffbf00" label >
              {
                Data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colorArray[index]}/>
                ))
              }   
          </Pie>
        <Tooltip />
        <Legend /> 
        </PieChart>
        
        </ResponsiveContainer>
        </>
      );
}
export default ExportPieChart;
