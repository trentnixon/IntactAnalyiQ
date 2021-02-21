import React, { useEffect }  from 'react'
import {useContext_UX_FULL} from "Context/UX";
import {useContext_SCAN_FULL} from "Context/SCAN";
// Template
import Section from "Pages/Auth/Components/Layout/Section"
import {H1} from "Pages/Auth/Components/Type";
import Clusters_ResultsList from "Pages/Auth/SingleModelResult/components/Clusters_ResultsList";
import Clusters_List from "Pages/Auth/SingleModelResult/components/Clusters_List";
import{sumBy, groupBy, chain} from 'lodash'

const SubSection_Clusters = ()=>{

    const UX = useContext_UX_FULL();
    const MODEL = useContext_SCAN_FULL()

    useEffect(()=>{
        console.log(MODEL.SelectedModel.STOREMARKERCENTERPOINTS)
    },[])
    return(
        <>
        <H1 Copy={`Clusters`} />
           <Section>
            
                <Clusters_ResultsList />
                <Clusters_List />
           </Section>
       </>
    ) 
}

export default SubSection_Clusters;  
