import React, {useEffect, useState} from 'react'
import {useContext_COMMS_FULL} from 'Context/COMMS'
import {useContext_UX_FULL} from "Context/UX";
import {useContext_SCAN_FULL} from "Context/SCAN";
import { numberWithCommas, gl} from "actions/HandleUX";
import {OBJ_SITE_GLOBAL} from 'actions/CreateSingleViewModel'

import {H4,H3, P} from "Pages/Auth/Components/Type"
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Tooltip from '@material-ui/core/Tooltip';

const HeaderLocations=()=>{
    const UX = useContext_UX_FULL();
    const SCAN = useContext_SCAN_FULL();
    const COMMS = useContext_COMMS_FULL()

    const INFO = COMMS.information;

    const MODEL = SCAN.SelectedModel
    const [SiteBreakdown, setSiteBreakdown] = useState([])
   
    const SiteNum=()=>{
        let SiteCount=[];
        MODEL.STOREMARKERCENTERPOINTS.map((model,i)=>{ SiteCount.push(model.StripedSites.length) })
        return SiteCount.reduce((a, b) => a + b, 0)
    }

    useEffect(()=>{ setSiteBreakdown(OBJ_SITE_GLOBAL()) },[UX]);



    const Numbers=[
        {
            info:INFO.CLUSTER,
            number:gl(MODEL.STOREMARKERCENTERPOINTS),
            label:'Clusters',
            perc:null
        },{
            info:INFO.TOTALLOCATIONS,
            number:SiteNum()+gl(MODEL.STORERESIDUALMARKERS),
            label:'Total Locations',
            perc:null
        },{
            info:INFO.LOCATIONSINSCOPE,
            number:gl(SiteBreakdown),
            label:'Locations Inscope',
            perc:`${((gl(SiteBreakdown)/(gl(SiteBreakdown)+gl(MODEL.STORERESIDUALMARKERS))*100)).toFixed(2)} %`
        },{
            info:INFO.LOCATIONSOUTSCOPE,
            number:numberWithCommas(gl(MODEL.STORERESIDUALMARKERS)),
            label:'Out of Scope',
            perc:null
        },{
            info:INFO.EXCLUDEDLOCATIONS,
            number:numberWithCommas( gl(MODEL.USERSELECTEDLIST)-(SiteNum()+gl(MODEL.STORERESIDUALMARKERS))  ),
            label:'Excluded Locations',
            perc:null
        },{
            info:INFO.FULLPORTFOLIO,
            number:numberWithCommas( gl(MODEL.USERSELECTEDLIST) ),
            label:'Full Portfolio',
            perc:null
        }
    ]

    return(
        <>       
                <ul className="Pod_List">
                    {
                        Numbers.map((number,i)=>{
                            return(
                                <Tooltip title={number.info} key={i}>
                                    <li className="Pod">
                                        <div className="Data"><P Copy= {number.number}/></div>
                                        <div className="Title"> <H4 Copy={number.label}/></div>
                                        <div className="Data Strong"><P Copy={number.perc} /></div>
                                        
                                        <HelpOutlineIcon />
                                    </li> 
                                </Tooltip>
                            )
                        })
                    }
                </ul>
        </>
    )
}
export default HeaderLocations;