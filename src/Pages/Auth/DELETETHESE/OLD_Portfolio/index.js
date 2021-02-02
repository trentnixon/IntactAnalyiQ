import React, { useEffect, useState } from 'react'
import {useContext_SCAN_FULL} from "Context/SCAN";
import CreateButton from "./Components/CreateButton"
import SelectandReview from "./SelectandReview";

const Portfolio = ()=>{
  
    const SCAN = useContext_SCAN_FULL();
    const USERSCAN = SCAN.UserScanState;
  
    useEffect(()=>{},[USERSCAN])
    return(
        <div>
               <h1>New Scan Options</h1>
                {USERSCAN.ScanOptionSelected !== false ?<SelectandReview />:<ScanSelectScanType />}  
               
        </div>
    )
}

export default Portfolio;




const ScanSelectScanType=()=>{
    return(
        <div>
            <h2>Create New</h2>
            <CreateButton />
            <SelectPreviousScan/>
        </div> 
    )
}


const SelectPreviousScan = ()=>{
    return(
            <div>
                <h2>Previous Scans</h2>
            </div>
            )
}