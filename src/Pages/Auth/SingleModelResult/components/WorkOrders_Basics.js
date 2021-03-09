import React, { useEffect } from 'react'
import {numberWithCommas} from "actions/HandleUX";
import {WorkorderTotals} from 'actions/CreateSingleViewModel'
// Template
//import Section from "Pages/Auth/Components/Layout/Section"
import {H4, P} from "Pages/Auth/Components/Type";


const WOrkOrders_TotalWorkOrder = ()=>{
    useEffect(()=>{console.log(WorkorderTotals())})
    return(
        <>
                <ul className="Pod_List">
                    <li className="Pod">
                        <div className="Data"><P Copy= {numberWithCommas(WorkorderTotals().reduce((a, b) => a + b, 0))}/></div>
                        <div className="Title"> <H4 Copy={`Total Work orders in Model`}/></div>
                    </li>
                    
                    <li className="Pod">
                        <div className="Data"><P Copy={numberWithCommas(WorkorderTotals()[0])} /></div>
                        <div className="Title"> <H4 Copy={`Work Orders Covered in model`}/></div>
                        <div className="Data Strong"><P Copy={`${((WorkorderTotals()[0]/WorkorderTotals().reduce((a, b) => a + b, 0))*100).toFixed(2)}%`} />
                    </div>
                    </li>

                    <li className="Pod">
                       <div className="Data"><P Copy={numberWithCommas(WorkorderTotals()[1])} /></div>
                       <div className="Title"> <H4 Copy={`Work Orders Out of Scope`}/></div>
                       <div className="Data Strong"><P Copy={`${((WorkorderTotals()[1]/WorkorderTotals().reduce((a, b) => a + b, 0))*100).toFixed(2)}%`} />
                   </div>
                   </li>
                </ul>  

               
        </>
    )
}
export default WOrkOrders_TotalWorkOrder;