import React, { useEffect }  from 'react'
import {useContext_UX_FULL} from "Context/UX";
import {useContext_SCAN_FULL} from "Context/SCAN";
// Template
import Section from "Pages/Auth/Components/Layout/Section"
import {H1,H4, P} from "Pages/Auth/Components/Type";

import ClientBasicChart from "Pages/Auth/SingleModelResult/components/Client_Basic_Differences";
import ClientResourceSiteStatsBar from "Pages/Auth/SingleModelResult/components/Clients_Site_Resource_StatsBar";
import ClientWorkordersOverTime from "Pages/Auth/SingleModelResult/components/Client_WorkordersOverTime";
import ClientResourceAllocationOverTime from "Pages/Auth/SingleModelResult/components/Client_ResourceAllocationOverTime";

import ClientResourceDistribution from "Pages/Auth/SingleModelResult/components/Client_ResourceDistribution";


const SubSection_Client = ()=>{
    const UX = useContext_UX_FULL();
    
    return(
        <>
            <H1 Copy={`Clients`} />
            <Section>
         
                <ClientBasicChart />
                <ClientResourceSiteStatsBar />
                <ClientWorkordersOverTime />
                <ClientResourceAllocationOverTime />
            </Section>
            {
                 UX.AreaSelectFilter.ByClient === null ? <SelectAClient /> :<ClientSpecificComponents />
            }
       </>
    )
} 

export default SubSection_Client;


const SelectAClient=()=>{
    return(
        <Section>
            <H4 Copy={`No Client Selected`}/>
            <P Copy={`To use this Section a Client must be selected from the Filter Above.`} />
        </Section>
    )
}


const ClientSpecificComponents = ()=>{
    return(
        <Section>
             <H4 Copy={`Client Specific Components`}/>
             

                By Client:
                client distrubution as a $ against cluster type and job type
                <H4 Copy={`Resource distribution `}/>
                    <ClientResourceDistribution />
                    Cluster funnel on Resource distribution by cluster
                    Radial Resource distribution 

               
        </Section>
    )
}