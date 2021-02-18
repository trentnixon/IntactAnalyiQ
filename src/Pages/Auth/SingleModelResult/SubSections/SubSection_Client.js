import React from 'react'
import {useContext_UX_FULL} from "Context/UX";

// Template
import Section from "Pages/Auth/Components/Layout/Section"
import {H1,H4, P} from "Pages/Auth/Components/Type";

import ClientBasicChart from "Pages/Auth/SingleModelResult/components/Client_Basic_Differences";
import ClientWorkordersOverTime from "Pages/Auth/SingleModelResult/components/Client_WorkordersOverTime";
import ClientResourceAllocationOverTime from "Pages/Auth/SingleModelResult/components/Client_ResourceAllocationOverTime";
import ClientSingleSelected from "Pages/Auth/SingleModelResult/components/Client_SingleSelectedComponents";

import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

const SubSection_Client = ()=>{
    const UX = useContext_UX_FULL();
    
    return(
        <> 
            <H1 Copy={`Clients`} />
            <Section>
                <ClientBasicChart />
                <ClientWorkordersOverTime /> 
                <ClientResourceAllocationOverTime />
            </Section>
            {
                 UX.AreaSelectFilter.ByClient === null ? <SelectAClient /> :<ClientSingleSelected />
            }
       </>
    )  
} 
 
export default SubSection_Client;  


const SelectAClient=()=>{
    return(
        <Section>
            <div className="PleaseSelectOption">
                <PeopleAltIcon />
                <H4 Copy={`Client Required.`}/>
                <P Copy={`To use this Section a Client must be selected from the Filter Above.`} />
            </div>
            
        </Section>
    )
}