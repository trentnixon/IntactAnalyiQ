import React  from 'react'
// Template
import Section from "Pages/Auth/Components/Layout/Section"
import {H1,H2, P} from "Pages/Auth/Components/Type";

import Trade_ResourceAllocation from "Pages/Auth/SingleModelResult/components/Trade_ResourceAllocation";
import Trade_Ratios from "Pages/Auth/SingleModelResult/components/Trade_Ratios";

const SubSection_Trade = ()=>{

    return(
        <>
        <H1 Copy={`Trade`} />
        <Section>
            <Trade_Ratios />
           <Trade_ResourceAllocation />
        </Section>
           
       </>
    ) 
}

export default SubSection_Trade;