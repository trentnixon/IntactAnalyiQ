import React, { useEffect } from 'react'
import {useContext_SCAN_FULL} from "Context/SCAN";

// Components
import CreateButton from "Pages/Auth/Components/buttons/CreateSingleScanBtn"
import SelectandReview from "Pages/Auth/CreateModel/SelectandReview";
import Footer from "Pages/Auth/Components/Layout/Footer"

const CreateNewScan = ()=>{
  
    const SCAN = useContext_SCAN_FULL();
    const USERSCAN = SCAN.UserScanState;
  
    useEffect(()=>{
            //console.log(USERSCAN)
    },[USERSCAN])
    return(
        <>
            <div className="OuterContainer">
                {USERSCAN.ScanOptionSelected !== false ?<SelectandReview />:<ScanSelectScanType />}  
            </div> 
            <Footer />
        </>
    )
}

export default CreateNewScan;



const ScanSelectScanType=()=>{
    return(  
        <>
            <div className="InnerFrame">
                <h2>Create a Model</h2>
                <p>Loremipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
            <div className="SideBarRight">
                <div className="ControlBar"><CreateButton /></div>
                
            </div>
        </> 
    )
}