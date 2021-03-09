import React,{useEffect, useState} from 'react'
import {useContext_SCAN_FULL} from "Context/SCAN";
import {useContext_UX_FULL} from "Context/UX";
import { workingDaysBetweenDates,numberWithCommas} from "actions/HandleUX";
import {SingleRecourseCostOverModel, CostPerWorkOrder} from 'actions/CostsandPricings';
// Actions
import {WorkorderTotals, OBJ_SITE_GLOBAL,OBJ_RESOURCES_GLOBAL} from "actions/CreateSingleViewModel"

// Template
import {H4,H3, P,S} from "Pages/Auth/Components/Type";

import {sumBy} from 'lodash'

const ResourceAllocationRatios = ()=>{
    const UX = useContext_UX_FULL();
   // const SCAN = useContext_SCAN_FULL();
    //const [WorkingDays, setWorkingDays] = useState(0)
    const [ResourceSum, setResourceSum] = useState(0)
    

    const RecourseCost= SingleRecourseCostOverModel()    
    const [CostperWO, setCost]= useState(0)
    

    useEffect(()=>{

       // console.log(`Singler Resource Cost over the Model ${SingleRecourseCostOverModel()}`)
       // console.log(OBJ_RESOURCES_GLOBAL(['ByClusterType','ByClient']))
        setResourceSum(sumBy(OBJ_SITE_GLOBAL(), function(o) { return o['Resources']; }).toFixed(2))
        
    },[UX]) 

    useEffect(()=>{  setCost(CostPerWorkOrder()) },[ResourceSum]) 
   
    return(
        <>  
       
            <H3 Copy={`Resource Costs`} />
            <ul className="Pod_List">

                <li className="Pod">
                    <div className="Data"><P Copy={`$${numberWithCommas(SingleRecourseCostOverModel())}`}/></div>
                    <div className="Title"><H4 Copy={`1x Resource cost (Model)`}/></div>
                    <div className="Title"><S Copy={`(Days in Model * Hours) * Price Per Hour`}/></div>
                </li> 

                
                <li className="Pod">
                    <div className="Data"><P Copy={`$${numberWithCommas((CostperWO*ResourceSum).toFixed(2))}`}/></div>
                    <div className="Title"> <H4 Copy={`Total Resource Cost`}/></div>
                    <div className="Title"><S Copy={`(Cost per WO * Resources)`}/></div>
                </li> 

                <li className="Pod">
                    <div className="Data"><P Copy={`$${numberWithCommas(CostperWO)}`}/></div>
                    <div className="Title"> <H4 Copy={`Cost per Work Order`}/></div>
                    <div className="Title"><S Copy={`( Resources * Resource Cost ) / WOs`}/></div>
                </li> 

            </ul>
            <ul className="Pod_List">
                {
                    OBJ_RESOURCES_GLOBAL(['ByClusterType','ByClient']).map((resource,i)=>{
                        return(
                            <li className="Pod" key={i}>
                                <div className="Data"><P Copy={`$${numberWithCommas((resource.ResourceCost).toFixed(2))}`}/></div>
                                <div className="Title"> <H4 Copy={`${resource.name}`}/></div>
                                <div className="Title"><S Copy={`(Cost per WO * ${resource.name} Allocation )`}/></div>
                            </li>
                        )
                    })
                }
            </ul>
            
        </>  
    )
} 

export default ResourceAllocationRatios;