import React  from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer
} from 'recharts';

/*
example
const data = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
];
*/

const SimpleBarChart = (props)=>{

    const {Data} = props
    return (
      <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
          <BarChart
            width={600}
            height={400}
            data={Data}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#ffbf00" />
          
          </BarChart>
        </ResponsiveContainer>
        </div>
      );
}

export default SimpleBarChart;
