import React, {useEffect, useState} from 'react'
import {useContext_UX_FULL} from "Context/UX";
// Actions
import {CreateOBJ_Client_WO_Overtime} from "actions/CreateSingleViewModel"
import {colorArray} from "actions/HandleUX";
// Layout
import ChartHeader from "Pages/Auth/Components/Layout/ChartHeader";
import DiagramContainer from "Pages/Auth/Components/Layout/DiagramContainer"
import {orderBy} from 'lodash'

import {
    ComposedChart, Line, Area, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer
  } from 'recharts';


const Chart1={
    Icon:'bar',
    Header:"Clients Resource Allocation over time",
    Tip:"Use the Filters",
    Copy:`This Composition chart shows the selected clients Resource Allocation over time against the total Resource Allocation in the Model
            Use the filters to dive deeper into a resource or cluster type`
}


const Trade_Radial_Charts=()=>{

    const UX = useContext_UX_FULL();
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

    useEffect(()=>{       
         
        //console.log(CreateOBJ_Client_WO_Overtime())
        setCategoryOccurance(CreateOBJ_Client_WO_Overtime())   
        },[UX]) 
    useEffect(()=>{
     
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
            </div>
        </DiagramContainer>
    )
}
export default Trade_Radial_Charts;
