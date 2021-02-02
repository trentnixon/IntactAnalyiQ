import React  from 'react';

import { ResponsiveContainer,PieChart, Pie,Legend, Tooltip,Cell} from 'recharts';

/*
const data01 = [
  { name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 }, { name: 'Group D', value: 200 },
  { name: 'Group E', value: 278 }, { name: 'Group F', value: 189 },
];
*/

var colorArray = ['#030303', '#D4D4D3', '#313231', '#777777', '#999A9A', '#575757', 
		  '#3A3A3A', '#787878', '#575757', '#444444',];
      
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
