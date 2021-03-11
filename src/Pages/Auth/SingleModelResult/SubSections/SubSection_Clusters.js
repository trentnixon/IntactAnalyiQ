import React, { useEffect }  from 'react'
import {useContext_UX_FULL} from "Context/UX";
import {useContext_SCAN_FULL} from "Context/SCAN";
// Template
import Section from "Pages/Auth/Components/Layout/Section"
import {H2} from "Pages/Auth/Components/Type";
import Clusters_ResultsList from "Pages/Auth/SingleModelResult/components/Clusters_ResultsList";
import Clusters_List from "Pages/Auth/SingleModelResult/components/Clusters_List";
import{sumBy, groupBy, chain} from 'lodash'


import GlobalFilter from "Pages/Auth/Components/Layout/ReviewGlobalFilter";
import ModelMeta from "Pages/Auth/SingleModelResult/Layout/ModelMeta";
import AppBar from "Pages/Auth/SingleModelResult/Layout/AppBar"

const SubSection_Clusters = ()=>{

    const UX = useContext_UX_FULL();
    const MODEL = useContext_SCAN_FULL()

    useEffect(()=>{
        //console.log(MODEL.SelectedModel.STOREMARKERCENTERPOINTS)
    },[])
    return(
        <>
        <div className="InnerFrame">
         
           <Section>
                <Clusters_ResultsList />
                <Clusters_List />
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

export default SubSection_Clusters;  
