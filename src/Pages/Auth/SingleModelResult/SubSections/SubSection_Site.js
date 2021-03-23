import React, { useEffect }  from 'react'
import { useParams } from "react-router-dom";

import {useContext_SCAN_FULL} from "Context/SCAN";
import {useContext_UX_FULL} from "Context/UX";

import Section from "Pages/Auth/Components/Layout/Section"
import {H2,P} from "Pages/Auth/Components/Type";

import GlobalFilter from "Pages/Auth/Components/Layout/ReviewGlobalFilter";
import ModelMeta from "Pages/Auth/SingleModelResult/Layout/ModelMeta";
import AppBar from "Pages/Auth/SingleModelResult/Layout/AppBar"


import SiteMeta from "Pages/Auth/SingleModelResult/components/Site_Single_Meta"

const SubSection_Site = ()=>{

    let { id } = useParams();
    const UX = useContext_UX_FULL();
    const SCAN = useContext_SCAN_FULL();
    useEffect(()=>{},[id])
    return(  
        <>
        <div className="InnerFrame">
        <H2 Copy={`Model Site ${id}`} />
        <P Copy={`Section is in Alhpa Development`}/>
        

        <Section>
            <SiteMeta id={id}/>
            
        </Section>  
        </div>
        <AppBar />
        <div className="SideBarRight"> 
            <ModelMeta />
            <GlobalFilter />
        </div>
    </>
    )
}

export default SubSection_Site;




const SiteLocation = ()=>{

    return(
        <>
            SiteLocation
        </>
    )
}


const SiteResources = ()=>{

    return(
        <>
            SiteResources
        </>
    )
}

const SiteCosts = ()=>{

    return(
        <>
            SiteCosts
        </>
    )
}