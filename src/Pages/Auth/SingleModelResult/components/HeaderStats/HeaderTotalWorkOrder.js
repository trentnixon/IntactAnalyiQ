import React from 'react'
import {useContext_SCAN_FULL} from "../../../../../Context/SCAN";
import {numberWithCommas} from "../../../../../actions/HandleUX";

const HeaderTotalWorkOrder = ()=>{
    const SCAN = useContext_SCAN_FULL();
    const Model = SCAN.SelectedModel;
    
    const TotalWorkOrders=(Data)=>{
        let TotalWOs=[]
        Data.map((site,i)=>{
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
        <h2>Workorders</h2>
                <div>
                        {numberWithCommas(TotalWorkOrders(Model.USERSELECTEDLIST))}
                        <h3>Clients Total Work Orders </h3>
                        &nbsp;
                </div>
                <div>
                    {numberWithCommas(WOsCoveredInModel())} 
                    
                    <h3>Work Orders Covered in model </h3>
                    {((WOsCoveredInModel()/TotalWorkOrders(Model.USERSELECTEDLIST))*100).toFixed(2)}%
                </div>
        </div>
    )
}
export default HeaderTotalWorkOrder;