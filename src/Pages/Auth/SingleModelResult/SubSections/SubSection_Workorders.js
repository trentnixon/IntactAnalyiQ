import React  from 'react'
// Template
import Section from "Pages/Auth/Components/Layout/Section"
import {H2} from "Pages/Auth/Components/Type";

import WorkOrders_Basics from "Pages/Auth/SingleModelResult/components/WorkOrders_Basics";
import WorkOrder_Radial_Charts from "Pages/Auth/SingleModelResult/components/WorkOrder_Radial_Charts";
import WorkOrder_Basic_Charts from "Pages/Auth/SingleModelResult/components/WorkOrders_Basic_Charts";

import WorkordersOverTime from "Pages/Auth/SingleModelResult/components/WorkOrders_OverTime";
import WorkOrderHeatMap from   "Pages/Auth/SingleModelResult/Maps/WorkOrder_Heatmap";

import GlobalFilter from "Pages/Auth/Components/Layout/ReviewGlobalFilter";
import ModelMeta from "Pages/Auth/SingleModelResult/Layout/ModelMeta";
import AppBar from "Pages/Auth/SingleModelResult/Layout/AppBar"

const SubSection_Workorders = ()=>{

    return(
        <>
            <div className="InnerFrame">
            <H2 Copy={`Work Orders`} /> 
            <Section>
                <WorkOrders_Basics />
                <WorkOrder_Radial_Charts /> 
                <WorkOrder_Basic_Charts />
                <WorkOrderHeatMap />
                <WorkordersOverTime />  
            </Section> 
            </div>
            <AppBar />
            <div className="SideBarRight"> 
                <ModelMeta />
                <GlobalFilter />
            </div>
        </>
    )  
}
/*

            
*/
export default SubSection_Workorders;