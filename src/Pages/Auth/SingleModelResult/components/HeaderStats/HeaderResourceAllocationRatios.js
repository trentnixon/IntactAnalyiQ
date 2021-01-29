import React from 'react'
import {useContext_SCAN_FULL} from "../../../../../Context/SCAN";


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
        <div className="MetaRow">
        <h2>Resources</h2>
                <div>
                    {FindTotalResourceAllocation()}
                    <h3>Resource Allocation </h3>
                </div>
                <div>
                   {((WOsCoveredInModel()/FindTotalResourceAllocation())/250).toFixed(2)}
                    <h3>Avg WO Completed per resource</h3>
                </div>
        </div>
    )
}

export default ResourceAllocationRatios;