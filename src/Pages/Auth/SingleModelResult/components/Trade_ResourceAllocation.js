import React from 'react'
import {useContext_SCAN_FULL} from "Context/SCAN";


// Template
import Section from "Pages/Auth/Components/Layout/Section"
import {H4,H2, P} from "Pages/Auth/Components/Type";
 
const ResourceAllocationRatios = ()=>{

    const SCAN = useContext_SCAN_FULL();
    const Model = SCAN.SelectedModel;
    
    const FindTotalResourceAllocation = ()=>{
        let TotalResources = 0
        Model.STOREMARKERCENTERPOINTS.map((point,i)=>{
            point.resourceQuota.map((resource,i)=>{
                TotalResources = TotalResources + resource.ResourceAllocation
            })
                
        })
        return TotalResources.toFixed(2);
    }

    const TotalWorkOrders=(data)=>{
        let TotalWOs=[]
        data.map((site,i)=>{
            if(site.SumWorkOrder !== undefined) 
                TotalWOs.push(site.SumWorkOrder)
        })
        return TotalWOs.reduce((a, b) => a + b, 0)
    }

    const WOsCoveredInModel = ()=>{
        let ModelTotal=[];
        Model.STOREMARKERCENTERPOINTS.map((site)=>{
                ModelTotal.push(TotalWorkOrders(site.sites))
            })
        return ModelTotal.reduce((a, b) => a + b, 0)
    }

    return(
        <> 
        <H2 Copy={`Resource Allocations`} />
        <Section>
        <ul className="Pod_List">
                    <li className="Pod">
                        <div className="Data"><P Copy= {FindTotalResourceAllocation()}/></div>
                        <div className="Title"> <H4 Copy={`Resource Allocation`}/></div>
                    </li>
                    
                    <li className="Pod">
                       
                        <div className="Data"><P Copy={((WOsCoveredInModel()/FindTotalResourceAllocation())/250).toFixed(2)} /></div>
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