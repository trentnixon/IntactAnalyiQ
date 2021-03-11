import React, { useEffect } from 'react'
import {useContext_UX_FULL} from "Context/UX";

// Template
import Section from "Pages/Auth/Components/Layout/Section"
import {H1,H2,H4, P} from "Pages/Auth/Components/Type";

import ClientBasicChart from "Pages/Auth/SingleModelResult/components/Client_Basic_Differences";
import ClientWorkordersOverTime from "Pages/Auth/SingleModelResult/components/Client_WorkordersOverTime";
import ClientResourceAllocationOverTime from "Pages/Auth/SingleModelResult/components/Client_ResourceAllocationOverTime";
import ClientSingleSelected from "Pages/Auth/SingleModelResult/components/Client_SingleSelectedComponents";

import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

import GlobalFilter from "Pages/Auth/Components/Layout/ReviewGlobalFilter";
import ModelMeta from "Pages/Auth/SingleModelResult/Layout/ModelMeta";
import AppBar from "Pages/Auth/SingleModelResult/Layout/AppBar"

const SubSection_Client = ()=>{
    const UX = useContext_UX_FULL();
    
    useEffect(()=>{
        //console.log(UX.AreaSelectFilter.ByClient)
    },[])
    return(
        <>  <div className="InnerFrame">
            <H2 Copy={`Clients`} />
            <Section>
                <ClientBasicChart />
                <ClientWorkordersOverTime /> 
                <ClientResourceAllocationOverTime />
            </Section>
            {
                 UX.AreaSelectFilter.ByClient === false ? <SelectAClient /> :<ClientSingleSelected />
            }
            </div>
            <AppBar />
            <div className="SideBarRight"> 
                <ModelMeta />
                <GlobalFilter />
            </div>
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