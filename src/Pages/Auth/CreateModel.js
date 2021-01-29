import React, { useEffect, useState } from 'react'
import {useContext_SCAN_FULL} from "../../Context/SCAN";
import CreateButton from "./Components/buttons/CreateSingleScanBtn"
import SelectandReview from "./CreateNewScan/SelectandReview";

import Footer from "./Components/Layout/Footer"
const CreateNewScan = ()=>{
  
    const SCAN = useContext_SCAN_FULL();
    const USERSCAN = SCAN.UserScanState;
  
    useEffect(()=>{
            console.log(USERSCAN)
    },[USERSCAN])
    return(
        <div className="AuthLayout">
            <div className="Header">
                <h2>Create a Model</h2>
            </div>
            <div className="Content">
                {USERSCAN.ScanOptionSelected !== false ?<SelectandReview />:<ScanSelectScanType />}  
            </div>

            <Footer />
        </div>
    )
}

export default CreateNewScan;



const ScanSelectScanType=()=>{
    return( 
        <div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <div className="BtnWrapper">
                <CreateButton />
            </div> 
            
        </div> 
    )
}