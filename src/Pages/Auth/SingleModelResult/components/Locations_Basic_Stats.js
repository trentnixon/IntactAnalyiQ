import React, {useEffect, useState} from 'react'
import {useContext_UX_FULL} from "Context/UX";
import {useContext_SCAN_FULL} from "Context/SCAN";
import { numberWithCommas, gl} from "actions/HandleUX";
import {OBJ_SITE_GLOBAL} from 'actions/CreateSingleViewModel'

import {H4,H3, P} from "Pages/Auth/Components/Type"

const HeaderLocations=()=>{
const UX = useContext_UX_FULL();
    const SCAN = useContext_SCAN_FULL();
    const MODEL = SCAN.SelectedModel
    const [SiteBreakdown, setSiteBreakdown] = useState([])
   
    const SiteNum=()=>{
        let SiteCount=[];
        MODEL.STOREMARKERCENTERPOINTS.map((model,i)=>{ SiteCount.push(model.StripedSites.length) })
        return SiteCount.reduce((a, b) => a + b, 0)
    }

    useEffect(()=>{ setSiteBreakdown(OBJ_SITE_GLOBAL()) },[UX]);

    return(
        <> 
            <H3 Copy={`Global Breakdown`} /> 
          
                <ul className="Pod_List">
                    <li className="Pod">
                        <div className="Data"><P Copy= {gl(MODEL.STOREMARKERCENTERPOINTS)}/></div>
                        <div className="Title"> <H4 Copy={`Clusters`}/></div>
                    </li> 
                    <li className="Pod">
                        <div className="Data"><P Copy= {SiteNum()+gl(MODEL.STORERESIDUALMARKERS)}/></div>
                        <div className="Title"> <H4 Copy={`Total Locations`}/></div>
                    </li>
                  
                    <li className="Pod">
                        <div className="Data"><P Copy={gl(SiteBreakdown)}/></div>
                        <div className="Title"> <H4 Copy={`Locations Inscope`}/></div>
                        <div className="Data Strong"><P Copy={`${((gl(SiteBreakdown)/(gl(SiteBreakdown)+gl(MODEL.STORERESIDUALMARKERS))*100)).toFixed(2)} %`} />
                    </div>
                    </li>
                    <li className="Pod">
                        <div className="Data"><P Copy={numberWithCommas(gl(MODEL.STORERESIDUALMARKERS))}/></div>
                        <div className="Title"> <H4 Copy={`Out of Scope`}/></div>
                    </li>
                    <li className="Pod">
                        <div className="Data"><P Copy={numberWithCommas( gl(MODEL.USERSELECTEDLIST)-(SiteNum()+gl(MODEL.STORERESIDUALMARKERS))  )}/></div>
                        <div className="Title"> <H4 Copy={`Excluded Locations`}/></div>
                    </li>
                    <li className="Pod">
                        <div className="Data"><P Copy={numberWithCommas( gl(MODEL.USERSELECTEDLIST) )}/></div>
                        <div className="Title"> <H4 Copy={`Full Portfolio`}/></div>
                    </li>
                </ul>
        </>
    )
}
export default HeaderLocations;