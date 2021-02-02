import React  from 'react'
// Template
import Section from "Pages/Auth/Components/Layout/Section"
import {H1,H2, P} from "Pages/Auth/Components/Type";

import ClientNames from "Pages/Auth/SingleModelResult/components/Clients_Names";

const SubSection_Client = ()=>{

    return(
        <>
        <H1 Copy={`Clients`} />
        <Section>
            <ClientNames />
        </Section>
           
       </>
    )
}

export default SubSection_Client;