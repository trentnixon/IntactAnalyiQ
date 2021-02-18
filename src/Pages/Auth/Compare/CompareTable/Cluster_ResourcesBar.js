
import React from 'react'

import {OBJ_CLUSTER_GLOBAL} from "actions/CreateCompareModelView"
// Layout
import ChartHeader from "Pages/Auth/Components/Layout/ChartHeader";
import DiagramContainer from "Pages/Auth/Components/Layout/DiagramContainer"
// Charts
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer} from 'recharts';
import {colorArray} from "actions/HandleUX";


const Chart1={ 
    Icon:'pie',
    Header:"Cluster Comparison",
    Tip:"Use the Filters",
    Copy:"Graph shows the Cluster Comparison within the Model"
}

const ClusterResourcesBar = ()=>{
    return(
        <DiagramContainer>
       
            {
                    OBJ_CLUSTER_GLOBAL().map((SELETCED, i )=>{

                        return(
                            <ResponsiveContainer width='100%' height={300}>
                            <BarChart
                                 
                                   data={SELETCED}
                                   margin={{
                                           top: 20, right: 0, left: 0, bottom: 0,
                                   }}
                               > 
                                   <CartesianGrid strokeDasharray="3 3" />
                                   <XAxis dataKey="name" />
                                   <YAxis />
                                   <Tooltip />
                                   <Legend />
                                       <Bar dataKey="Resource_Count_HandyMan" name="HandyMan" stackId="a" fill={colorArray[0]} />
                                       <Bar dataKey="Resource_Count_Electrician" name="Electrician" stackId="a" fill={colorArray[1]} />
                                       <Bar dataKey="Resource_Count_Plumber" name="Plumber" stackId="a" fill={colorArray[2]} />
                                       <Bar dataKey="Resource_Count_Specialized" name="Specialized" stackId="a" fill={colorArray[3]} />
                                  
                               </BarChart>
                               </ResponsiveContainer>
                        )
                        
                    })
                }

            
            

            </DiagramContainer>
    )
}

export default ClusterResourcesBar;