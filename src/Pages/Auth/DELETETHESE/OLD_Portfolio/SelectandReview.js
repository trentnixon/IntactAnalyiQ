import React, { useEffect, useState } from 'react'
import {useContext_STRAPI_FULL} from "Context/STRAPI";
import {useContext_SCAN_FULL} from "Context/SCAN";
import { orderBy,  remove} from 'lodash'; 
import ReviewSelectionBtn from "./Components/SetSelectedBtn";

import SelectScanItems from "./ScanSelectItems";
import ReviewSelection from "./ScanReviewSelectedItems";


const SelectandReview = ()=>{

    const STRAPI = useContext_STRAPI_FULL();
    const SCAN = useContext_SCAN_FULL();
    const USERSCAN = SCAN.UserScanState;

    useEffect(()=>{},[SCAN])
 
        return(
            <>
                { USERSCAN.ScanOptionSelected === 0?<Single />:<Compare /> }
            </>
        )
}



const Single = ()=>{

    const SCAN = useContext_SCAN_FULL();
    const USERSCAN = SCAN.UserScanState;

    useEffect(()=>{ },[SCAN]);

    return(
        <div>
            <h2>Select and Review</h2>
            {
                USERSCAN.SetSelectedDatabase ? <ReviewSelection />:<SelectScanItems />
            }    
        </div>
    )
}


const Compare = ()=>{
    return(
        <div>
            Compare
        </div>
    )
}
/*
 
*/
export default SelectandReview;