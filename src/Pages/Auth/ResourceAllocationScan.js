import React, {useEffect, useState} from 'react'
import {useContext_STRAPI_FULL} from "Context/STRAPI";
import {useContext_UX_FULL} from "Context/UX";
import {useContext_SCAN_FULL} from "Context/SCAN";
import {ScanSites} from "actions/HandleMarkerBasedScan";

// Components
import ResourceAllocationMap from "./ResourceAllocationScan/Map";

const RenderScamSites = new ScanSites();

const RecourseAllocationScan = ()=>{

    
    const STRAPI = useContext_STRAPI_FULL();
    const UX = useContext_UX_FULL();
    const SCAN = useContext_SCAN_FULL();


    const Scan = ()=>{
        //console.log(STRAPI.sites);
        // Pass only fully loaded sites
        let SiteList=[]
        STRAPI.sites.map((site)=>{
                console.log(site.count)
    
                // Add any new rules if required
                if(site.count.length!== 0){
                    SiteList.push(site)
                }
        })
        RenderScamSites.SiteList=SiteList;
        RenderScamSites.Search();
    }


    useEffect(()=>{ if(SCAN.active){Scan() }},[SCAN.active])

    return(
        <>
            {SCAN.MarkerScanResults ?  <ResourceAllocationMap />: false}
        </>
    )
}
//  <ScanBtn />
export default RecourseAllocationScan;