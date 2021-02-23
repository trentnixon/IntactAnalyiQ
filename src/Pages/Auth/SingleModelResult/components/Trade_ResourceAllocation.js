import React,{useEffect, useState} from 'react'
import {useContext_SCAN_FULL} from "Context/SCAN";
import { workingDaysBetweenDates} from "actions/HandleUX";
import {WorkorderTotals, OBJ_SITE_GLOBAL} from "actions/CreateSingleViewModel"

// Template
import {H4,H3, P} from "Pages/Auth/Components/Type";

import {sumBy} from 'lodash'

const ResourceAllocationRatios = ()=>{

    const SCAN = useContext_SCAN_FULL();
    const [WorkingDays, setWorkingDays] = useState(0)
    const [ResourceSum, setResourceSum] = useState(0)


    useEffect(()=>{
        console.log(OBJ_SITE_GLOBAL())
        setResourceSum(sumBy(OBJ_SITE_GLOBAL(), function(o) { return o['Resources']; }).toFixed(2))
        setWorkingDays(workingDaysBetweenDates(SCAN.SelectedModelMeta.DateStart,SCAN.SelectedModelMeta.DateEnd))
    },[])
   
    return(
        <>  
        <H3 Copy={`Model Resource Allocations`} />
     
            <ul className="Pod_List"> 
            <li className="Pod">
                    <div className="Data"><P Copy={WorkorderTotals()[0]}/></div>
                    <div className="Title"> <H4 Copy={`Work Order Total`}/></div>
                </li> 
                <li className="Pod">
                    <div className="Data"><P Copy= {ResourceSum}/></div>
                    <div className="Title"> <H4 Copy={`Total Resource Allocation`}/></div>
                </li> 
                <li className="Pod"> 
                    <div className="Data"><P Copy= {WorkingDays}/></div>
                    <div className="Title"> <H4 Copy={`Working Days in Model`}/></div>
                </li> 
                
                <li className="Pod">
              
                    <div className="Data"><P Copy={(ResourceSum/WorkingDays).toFixed(2)} /></div>
                    <div className="Title"> <H4 Copy={`Avg WO/resource`}/></div>
                    
                </li>
            </ul>
      
        </>
    )
} 

export default ResourceAllocationRatios;