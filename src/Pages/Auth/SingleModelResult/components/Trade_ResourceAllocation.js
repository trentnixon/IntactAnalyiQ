import React,{useEffect, useState} from 'react'
import {useContext_SCAN_FULL} from "Context/SCAN";

import { workingDaysBetweenDates} from "actions/HandleUX";

import {WOsCoveredInModel, TotalWorkOrders, FindTotalResourceAllocation} from "actions/CreateSingleViewModel"
// Template
import Section from "Pages/Auth/Components/Layout/Section"
import {H4,H3, P} from "Pages/Auth/Components/Type";
 
const ResourceAllocationRatios = ()=>{

    const SCAN = useContext_SCAN_FULL();
    const Model = SCAN.SelectedModel;
    const [WorkingDays, setWorkingDays] = useState(0)
   
    useEffect(()=>{
        console.log(SCAN.SelectedModel)
        setWorkingDays(workingDaysBetweenDates(SCAN.SelectedModelMeta.DateStart,SCAN.SelectedModelMeta.DateEnd))
    },[])
   
    return(
        <> 
        <H3 Copy={`Model Resource Allocations`} />
        <Section>
            <ul className="Pod_List">
                <li className="Pod">
                    <div className="Data"><P Copy= {FindTotalResourceAllocation().toFixed(2)}/></div>
                    <div className="Title"> <H4 Copy={`Resource Allocation`}/></div>
                </li> 
                <li className="Pod">
                    <div className="Data"><P Copy={(FindTotalResourceAllocation()/WorkingDays).toFixed(2)} /></div>
                    <div className="Data">{WOsCoveredInModel()}<P Copy={(WOsCoveredInModel()/WorkingDays)/FindTotalResourceAllocation()} /></div>
                    <div className="Title"> <H4 Copy={`Avg WO Completed per resource`}/></div>
                    <div className="Data Strong"><P Copy={`${((WOsCoveredInModel()/TotalWorkOrders(Model.USERSELECTEDLIST))*100).toFixed(2)}%`} />
                </div>
                </li>
            </ul>
        </Section>
        </>
    )
}

export default ResourceAllocationRatios;