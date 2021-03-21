import React, { useEffect, useState }  from 'react'
import {useContext_UX_FULL} from "Context/UX";

import {findClientName} from "actions/ClusterAnalysis"
import {      
    ClientOutOfScopeNum,
    OBJ_CLIENT_GLOBAL_Filter
} from "actions/CreateSingleViewModel"
// Template
import Section from "Pages/Auth/Components/Layout/Section"
import {H2,H3,H4, P} from "Pages/Auth/Components/Type";

import ClientResourceDistribution from "Pages/Auth/SingleModelResult/components/Client_ResourceDistribution";
import Client_WorkOrderDistribution from "Pages/Auth/SingleModelResult/components/Client_WorkOrderDistribution";
import Client_Selected_ClusterSpread from "Pages/Auth/SingleModelResult/components/Client_Selected_ClusterSpread";

import {find} from 'lodash'

/* ************************************** */
// Client specific section
// Move to own file


const ClientSpecificComponents = ()=>{
    const UX = useContext_UX_FULL();

    return( 
        <Section className="SelectedItem">
             <H2 Copy={`Selected Client : ${findClientName(UX.AreaSelectFilter.ByClient)}`}/>
             <P copy={`The following is a breakdown of how ${findClientName(UX.AreaSelectFilter.ByClient)} fits into the Model`} />

                <ByClientBaseNumbers /> 
                <ClientResourceDistribution /> 
                <Client_WorkOrderDistribution />
                <Client_Selected_ClusterSpread /> 
                  
        </Section>
    ) 
}


const ByClientBaseNumbers = ()=>{
    const UX = useContext_UX_FULL();
    const [ClientResources,setClientResources ] = useState(null) 

    useEffect(()=>{
        setClientResources(find(OBJ_CLIENT_GLOBAL_Filter(), function(o) { return o.name === findClientName(UX.AreaSelectFilter.ByClient)}));
    },[UX])

    return(
        <> { ClientResources !== null ? <DisplayNumbers ClientResources={ClientResources}/>:false }</>
    )
}

export default ClientSpecificComponents;

const DisplayNumbers = (props)=>{

    const {ClientResources} = props

    useEffect(()=>{},[ClientResources])
    return(
        <ul className="Pod_List">
            <li className="Pod">
                <div className="Data"><P Copy= {ClientResources.Resources}/></div>
                <div className="Title"> <H4 Copy={`Resources`}/></div>
            </li>
            <li className="Pod">
                <div className="Data"><P Copy={ClientResources['Work Orders']}/></div>
                <div className="Title"> <H4 Copy={`Work Orders`}/></div>
            </li>
            <li className="Pod">
                <div className="Data"><P Copy={ClientResources.Clusters}/></div>
                <div className="Title"> <H4 Copy={`found in Clusters`}/></div>
            </li>
            <li className="Pod">
                <div className="Data"><P Copy={ClientOutOfScopeNum()[0]}/></div>
                <div className="Title"> <H4 Copy={`Sites Out of Scope`}/></div>
            </li>
            <li className="Pod">
                <div className="Data"><P Copy={ClientOutOfScopeNum()[1]}/></div>
                <div className="Title"> <H4 Copy={`Uncounted Work Orders`}/></div>
            </li>
        </ul>
    )
}