import React, {useEffect, useState} from 'react'
import {useContext_SCAN_FULL} from "Context/SCAN";
import {useContext_UX_FULL} from "Context/UX";
// Actions
import {CreateOBJ_WO_Overtime} from "actions/CreateSingleViewModel"
import {colorArray} from "actions/HandleUX";
// Layout
import ChartHeader from "Pages/Auth/Components/Layout/ChartHeader";

import {orderBy} from 'lodash'

import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer
  } from 'recharts';


const Workorder_Bar_Overtime=()=>{
 
    const UX = useContext_UX_FULL();
    const MODEL = useContext_SCAN_FULL()
    const [CategoryOccurance,setCategoryOccurance ] = useState([[]]) 
    useEffect(()=>{  setCategoryOccurance(CreateOBJ_WO_Overtime())   },[UX,MODEL]) 
    useEffect(()=>{},[CategoryOccurance])

    return(
        <div>
                    <ChartHeader  Section='WorkOrders' Chart='Bar'  Meta='Bar_Workorders_Overtime'/>
                
                    <div style={{ width: '100%', height: 400 }}>
                        <ResponsiveContainer>
                            <BarChart
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
                                    <Bar dataKey={'Work Orders'} fill={colorArray[0]} />
                                 
                            
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
    )
}
export default Workorder_Bar_Overtime;
