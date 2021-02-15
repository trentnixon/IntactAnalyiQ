import React, {useEffect, useState} from 'react'
import {useContext_SCAN_FULL} from "Context/SCAN";
import {useContext_UX_FULL} from "Context/UX";
// Actions
import {CreateOBJ_WO_Overtime} from "actions/CreateSingleViewModel"
import {colorArray} from "actions/HandleUX";
// Layout
import ChartHeader from "Pages/Auth/Components/Layout/ChartHeader";
import DiagramContainer from "Pages/Auth/Components/Layout/DiagramContainer"
import {orderBy} from 'lodash'

import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer
  } from 'recharts';

const Chart1={
    Icon:'bar',
    Header:"Workorders",
    Tip:"Use the Filters",
    Copy:`The Bar Graph shows the number of Work Orders over the time period of the Model. 
        Use the 'Cluster Type' and 'Resource type' filters to filter the chart to a specific Recourse or cluster type`
}


const Trade_Radial_Charts=()=>{
 
    const UX = useContext_UX_FULL();
    const [CategoryOccurance,setCategoryOccurance ] = useState([[]]) 

    useEffect(()=>{  setCategoryOccurance(CreateOBJ_WO_Overtime())   },[UX]) 
    
    useEffect(()=>{
        //console.log(CategoryOccurance)
     },[CategoryOccurance])

    return(
        <DiagramContainer>
            <div className="resultCharts">
                <div>
                    <ChartHeader 
                        Icon={Chart1.Icon}
                        Header={Chart1.Header} 
                        Tip={Chart1.Tip} 
                        Copy={Chart1.Copy}
                    />
                
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
            </div>
        </DiagramContainer>
    )
}
export default Trade_Radial_Charts;
