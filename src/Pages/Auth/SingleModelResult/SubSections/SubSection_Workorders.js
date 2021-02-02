import React  from 'react'
// Template
import Section from "Pages/Auth/Components/Layout/Section"
import {H1,H2, P} from "Pages/Auth/Components/Type";

import WorkOrders_Basics from "Pages/Auth/SingleModelResult/components/WorkOrders_Basics";
import WorkOrders_Basics_Charts from "Pages/Auth/SingleModelResult/components/WorkOrders_Basic_Charts";
const SubSection_Workorders = ()=>{

    return(
        <>
         <H1 Copy={`Work Orders`} />
         <Section>
            <WorkOrders_Basics />
            <WorkOrders_Basics_Charts />
         </Section>
            
        </>
    ) 
}

export default SubSection_Workorders;