import React  from 'react'
// Template
import Section from "Pages/Auth/Components/Layout/Section"
import {H1,H2, P} from "Pages/Auth/Components/Type";

import WorkOrders_Basics from "Pages/Auth/SingleModelResult/components/WorkOrders_Basics";
import WorkOrder_Radial_Charts from "Pages/Auth/SingleModelResult/components/WorkOrder_Radial_Charts";

import WorkordersOverTime from "Pages/Auth/SingleModelResult/components/WorkOrders_OverTime";

const SubSection_Workorders = ()=>{

    return(
        <>
         <H1 Copy={`Work Orders`} />
         <Section>
            <WorkOrders_Basics />
            <WorkOrder_Radial_Charts /> 
            <WorkordersOverTime />
         </Section>
            
        </>
    ) 
}

export default SubSection_Workorders;