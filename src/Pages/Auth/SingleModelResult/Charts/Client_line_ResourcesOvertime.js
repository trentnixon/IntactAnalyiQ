import React, {useEffect, useState} from 'react'
// Context
import {useContext_UX_FULL} from "Context/UX";
import {useContext_SCAN_FULL} from "Context/SCAN";
// Actions
import {CreateOBJ_Client_WO_Overtime} from "actions/CreateSingleViewModel"
import {colorArray} from "actions/HandleUX";
// Layout
import ChartHeader from "Pages/Auth/Components/Layout/ChartHeader";
import {orderBy} from 'lodash'

import {
    ComposedChart, Line, Area, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer
  } from 'recharts';


const Chart1={
    Icon:'bar',
    Header:"Clients Resource Allocation over time",
    Tip:"Use the Filters",
    filters:['cluster','resource',],
    Copy:`This Composition chart shows the selected clients Resource Allocation over time against the total Resource Allocation in the Model
            Use the filters to dive deeper into a resource or cluster type`
}


const Trade_Radial_Charts=()=>{

    const UX = useContext_UX_FULL(); 
    const MODEL = useContext_SCAN_FULL()
    const [CategoryOccurance,setCategoryOccurance ] = useState([[]]) 

    const Ignore=['UnixDate','name','Resource Allocation']
    const str='Resource_Count_'
    const FindLabels = ()=>{
        let Labels=[]  
        CategoryOccurance.map((item,i)=>{
            //console.log(item, 'name')
              
            Object.keys(item).map((key,ii)=>{
                if(key.includes(str)){
                    if(Labels.indexOf(key.replace(str,'')) === -1){
                        Labels.push(key.replace(str,''))
                    } 
                }
                })
         })

         return Labels;
    }

    useEffect(()=>{ setCategoryOccurance(CreateOBJ_Client_WO_Overtime())},[UX,MODEL]) 
    useEffect(()=>{
     
     },[CategoryOccurance])

    return(
        <div>
               <ChartHeader  Section='Locations' Chart='Pie' Meta='Pie'/>
 
                <div style={{ width: '100%', height: 400 }}>
                    <ResponsiveContainer>
                        <ComposedChart
                            data={orderBy(CategoryOccurance,'UnixDate')}
                            margin={{
                            top: 5, right: 0, left: 0, bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                                <Bar dataKey={`Resource Allocation`} opacity={0.3} fill={colorArray[3]} />
                                {
                                    FindLabels().map((label,i)=>{
                                        return(
                                            <Line type="monotone" name={`${label}`} dataKey={`${str}${label}`} stroke={colorArray[i]} />
                                        )
                                    })
                                }
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
        </div>
    )
}
export default Trade_Radial_Charts;
