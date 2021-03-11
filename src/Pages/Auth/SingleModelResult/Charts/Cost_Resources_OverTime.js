import React, {useEffect, useState} from 'react'
// Context
import {useContext_UX_FULL} from "Context/UX";
import {useContext_SCAN_FULL} from "Context/SCAN";
// Actions
import {CreateOBJ_Client_WO_Overtime, OBJ_DATESPREAD_TRADE} from "actions/CreateSingleViewModel"
import {colorArray} from "actions/HandleUX";
// Layout
import ChartHeader from "Pages/Auth/Components/Layout/ChartHeader";
import {orderBy} from 'lodash'

import {
    ComposedChart, Line, Area, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer
  } from 'recharts';


const Chart1={
    Icon:'bar',
    Header:"Resource Cost over time",
    Tip:"Use the Filters",
    filters:['cluster','resource',],
    Copy:`This Composition chart shows the resource cost for the selected model or cluster over the time of the model`
}


const Client_Line_Workorders=()=>{

    const UX = useContext_UX_FULL(); 
    const MODEL = useContext_SCAN_FULL()
    const [CategoryOccurance,setCategoryOccurance ] = useState([[]]) 

    const str='_cost'
    const FindLabels = ()=>{
        let Labels=[]  

        CategoryOccurance.map((item,i)=>{
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

    useEffect(()=>{          
        //console.log(OBJ_DATESPREAD_TRADE());
        setCategoryOccurance(OBJ_DATESPREAD_TRADE())    
    },[UX,MODEL]) 
    
    useEffect(()=>{},[CategoryOccurance])

    return(
        <div>
            <ChartHeader  {...Chart1}/>

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
                            
                            {
                                FindLabels().map((label,i)=>{
                                    return(
                                        <Line type="monotone" name={`${label}`} dataKey={`${label}${str}`} stroke={colorArray[i]} />
                                    )
                                })
                            }
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
export default Client_Line_Workorders;
//<Bar dataKey={'ResourceCost'} opacity={0.3} fill={colorArray[3]} />
