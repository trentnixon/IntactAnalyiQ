import React, {useEffect, useState} from 'react'
import {useContext_UX_FULL} from "Context/UX";
import {CreateOBJ_ResourcesAgainstClients, fixNumber} from "actions/CreateSingleViewModel"
import {colorArray} from "actions/HandleUX";
// Layout
import ChartHeader from "Pages/Auth/Components/Layout/ChartHeader";
import {partial,sumBy} from 'lodash';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,ResponsiveContainer,Legend, Tooltip } from 'recharts';


const Chart1={
    Icon:'radial',
    Header:"Resources Allocation to Clients",
    Tip:"Use the Filters",
    Copy:`The Radial Graph shows the number of Resource Allocations by Cluster Type in a given model. 
            Use the 'Cluster Type' and 'Resource type' filters to find Resource Allocation numbers for specific Clients.`
}


const Trade_Radial_Charts=()=>{

    const UX = useContext_UX_FULL();
    const [CategoryOccurance,setCategoryOccurance ] = useState([[]]) 


    const SingleValues = (category)=>{
         let Total = sumBy([category], partial(sumBy, CategoryOccurance));
         if(Total !== undefined)
             return Total.toFixed(2)
                return 0
       }

    useEffect(()=>{ 
        setCategoryOccurance(CreateOBJ_ResourcesAgainstClients())  
        
    },[UX]) 
     

    useEffect(()=>{console.log(CategoryOccurance)},[CategoryOccurance])
    return(
        <>
            <div className="resultCharts">
                <div>
                    <ChartHeader Icon={Chart1.Icon} Header={Chart1.Header} Tip={Chart1.Tip} Copy={Chart1.Copy} />
                   
                    <ResponsiveContainer width='100%' height={300}>
                        <RadarChart  outerRadius={100}  data={CategoryOccurance}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="name" />
                            <PolarRadiusAxis />
                                <Radar name={`HandyMan`} dataKey="HandyMan" stroke={colorArray[0]} fill={colorArray[0]} fillOpacity={0.6} />
                                <Radar name={`Electrician`} dataKey="Electrician" stroke={colorArray[1]} fill={colorArray[1]} fillOpacity={0.6} />
                                <Radar name={`Plumber`} dataKey="Plumber" stroke={colorArray[2]} fill={colorArray[2]} fillOpacity={0.6} />
                                <Radar name={`Specialized`} dataKey="Specialized" stroke={colorArray[3]} fill={colorArray[3]} fillOpacity={0.6} /> 
                            
                            <Tooltip />
                            <Legend />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div> 
            <ul className="Stat_Bar Column grouped">
                {
                    CategoryOccurance.map((trade,i)=>{
                        const {name, HandyMan, Electrician, Plumber, Specialized} = trade
                        return(
                            <li key={i}>
                               
                                <span> {name}</span>
                                <span>{`HandyMan`} : {fixNumber(HandyMan)}</span>
                                <span> {`Electrician`} : {fixNumber(Electrician)}</span>
                                <span>{`Plumber`} : {fixNumber(Plumber)}</span>
                                <span>{`Specialized`} : {fixNumber(Specialized)}</span>
                                
                            </li>
                        )
                    })
                }

                            <li>
                                <span>Totals</span>
                                <span>{SingleValues('HandyMan')}</span>
                                <span>{SingleValues('Electrician')}</span>
                                <span>{SingleValues('Plumber')}</span>
                                <span>{SingleValues('Specialized')}</span>
                            </li> 
                   
            </ul>
        </>  
    )
}
export default Trade_Radial_Charts;