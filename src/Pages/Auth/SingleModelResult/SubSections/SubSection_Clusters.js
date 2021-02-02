import React  from 'react'
// Template
import Section from "Pages/Auth/Components/Layout/Section"
import {H1} from "Pages/Auth/Components/Type";
import Clusters_ResultsList from "Pages/Auth/SingleModelResult/components/Clusters_ResultsList";

const SubSection_Clusters = ()=>{

    return(
        <>
        <H1 Copy={`Clusters`} />
           <Section>
                <Clusters_ResultsList />
           </Section>
       </>
    ) 
}

export default SubSection_Clusters; 