import React from 'react'
import {useContext_SCAN_FULL} from "Context/SCAN";
import {numberWithCommas} from "actions/HandleUX";

// Template
import Section from "Pages/Auth/Components/Layout/Section"
import {H4,H3, P} from "Pages/Auth/Components/Type";


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
        <> 
        <H3 Copy={`Breakdown`} />
   
                <ul className="Pod_List">
                    <li className="Pod">
                        <div className="Data"><P Copy= {numberWithCommas(TotalWorkOrders(Model.USERSELECTEDLIST))}/></div>
                        <div className="Title"> <H4 Copy={`Clients Total Work Orders`}/></div>
                    </li>
                    
                    <li className="Pod">
                       
                        <div className="Data"><P Copy={numberWithCommas(WOsCoveredInModel())} /></div>
                        <div className="Title"> <H4 Copy={`Work Orders Covered in model`}/></div>
                        <div className="Data Strong"><P Copy={`${((WOsCoveredInModel()/TotalWorkOrders(Model.USERSELECTEDLIST))*100).toFixed(2)}%`} />
                    </div>
                    </li>
                  
                </ul>
       
        </>
    )
}
export default HeaderTotalWorkOrder;