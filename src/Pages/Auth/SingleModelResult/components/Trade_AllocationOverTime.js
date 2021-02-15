import React, {useEffect, useState} from 'react'
//import {useContext_SCAN_FULL} from "Context/SCAN";
import {useContext_UX_FULL} from "Context/UX";
// Actions
import {OBJ_DATESPREAD_TRADE} from "actions/CreateSingleViewModel"
import {colorArray} from "actions/HandleUX";
// Layout
import ChartHeader from "Pages/Auth/Components/Layout/ChartHeader";
import DiagramContainer from "Pages/Auth/Components/Layout/DiagramContainer"
import {orderBy} from 'lodash'
import {H3} from "Pages/Auth/Components/Type";
// NIvo
import NivoLine from "venders/Nivo/NivoLine";

import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer
  } from 'recharts';

const Chart1={
    Icon:'bar',
    Header:"Resources Allocation over time",
    Tip:"Use the Filters",
    Copy:`The Bar Graph shows the number of Resource Allocations over the time period of the Model. 
        Use the 'Cluster Type' and 'Resource type' filters to filter the chart to a specific Recourse or cluster type`
}


const Trade_Radial_Charts=()=>{

    //const SCAN = useContext_SCAN_FULL();
    const UX = useContext_UX_FULL();
    const [ResourcesOverTime,setResourcesOverTime ] = useState([[]]) 

    useEffect(()=>{ setResourcesOverTime(OBJ_DATESPREAD_TRADE()) },[UX]) 
    
    useEffect(()=>{},[ResourcesOverTime]) 

    return(
        <>
         <H3 Copy={`Title Required`} />
        <DiagramContainer>
            <div className="resultCharts">
                <div>
                    <ChartHeader 
                        Icon={Chart1.Icon}
                        Header={Chart1.Header} 
                        Tip={Chart1.Tip} 
                        Copy={Chart1.Copy}
                    />
                
                   
                    <div style={{height: 400}}>
                    <NivoLine 
                        data={orderBy(ResourcesOverTime,'UnixDate')} 
                        Xaxis={`name`} 
                        Yaxis={UX.AreaSelectFilter.ByResourceType} 
                        value={'Resources'}
                        label = {`Resource Allocation`}
                    />
                </div>
                </div>

             
               
            </div>
        </DiagramContainer>
        </>
    )
}
export default Trade_Radial_Charts;
/*

 <div style={{ width: '100%', height: 400 }}>
                        <ResponsiveContainer>
                            <BarChart
                                data={orderBy(ResourcesOverTime,'UnixDate')}
                                margin={{
                                top: 5, right: 0, left: 0, bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />              
                                    <Bar dataKey={UX.AreaSelectFilter.ByResourceType} fill={colorArray[0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
*/