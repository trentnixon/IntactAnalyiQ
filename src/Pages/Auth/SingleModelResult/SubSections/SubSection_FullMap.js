import React  from 'react'
// Template
import Section from "Pages/Auth/Components/Layout/Section"
import {H1} from "Pages/Auth/Components/Type";

import Map_Full_Main from "Pages/Auth/SingleModelResult/components/Map_Full_MAin";
const SubSection_FullMap = ()=>{

    return(
        <>
         <H1 Copy={`Model Overview`} />
            <Section>
                <Map_Full_Main />
            </Section>
        </>
    )  
} 

export default SubSection_FullMap;