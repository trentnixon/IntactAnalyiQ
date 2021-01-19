import React, { useEffect, useState } from 'react'
import {useContext_SCAN_FULL} from "../../Context/SCAN";
import CreateButton from "./Components/buttons/CreateSingleScanBtn"
import SelectandReview from "./CreateNewScan/SelectandReview";

const CreateNewScan = ()=>{
  
    const SCAN = useContext_SCAN_FULL();
    const USERSCAN = SCAN.UserScanState;
  
    useEffect(()=>{
            console.log(USERSCAN)
    },[USERSCAN])
    return(
        <div>
            <h2>Create a new Resource Model</h2>
            {USERSCAN.ScanOptionSelected !== false ?<SelectandReview />:<ScanSelectScanType />}  
        </div>
    )
}

export default CreateNewScan;



const ScanSelectScanType=()=>{
    return(
        <div>
            
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <CreateButton />
        </div> 
    )
}