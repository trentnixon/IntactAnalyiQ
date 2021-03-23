import React, { useEffect, useState }  from 'react'

import {useContext_SCAN_FULL} from "Context/SCAN";
import {useContext_UX_FULL} from "Context/UX";

import Section from "Pages/Auth/Components/Layout/Section"
import {H2,H3,P} from "Pages/Auth/Components/Type";

import {find} from 'lodash';

const SiteMeta = (props)=>{
    const {id} = props
    const UX = useContext_UX_FULL();
    const SCAN = useContext_SCAN_FULL();

    const  [site,setSite] = useState([])



    useEffect(()=>{
        setSite(find(SCAN.SelectedModel.USERSELECTEDLIST, { 'id': id  }))
        console.log(id)
        
    },[id])

    return(
        <Section>
            <H2 Copy={`Address : ${site.name}`} />
           
        

           <div>Work Orders : {site.SumWorkOrder}</div>
           <div>Clients : {site.customers}</div>
        </Section>
    )
}

export default SiteMeta;