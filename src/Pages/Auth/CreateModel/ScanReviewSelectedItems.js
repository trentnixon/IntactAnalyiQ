import React, { useEffect, useState } from 'react'
import {useContext_SCAN_FULL} from "Context/SCAN";
import { orderBy,  remove} from 'lodash'; 
//import {FetchSelectedItems} from "actions/HandleScanProcess";
import BacktoSelectItems from "../Components/buttons/BacktoAddItemsSingleScan"
import ScanForm from "../../../venders/MaterialUI/Forms/CreateScanoptions";
import CreateNewModelBtn from "../Components/buttons/CreateNewModel";

const ReviewSelected = ()=>{


    const SCAN = useContext_SCAN_FULL();
    
    const [Fetching, setFetching] = useState('Review items')

    const USERSCAN = SCAN.UserScanState;

    useEffect(()=>{
    
        if(USERSCAN.UserWorkingDataSet_Single.length === 0){
          //  FetchSelectedItems(USERSCAN.UserScanSingleDataSets)
        }
        
        console.log(USERSCAN.processing)
        
    },[USERSCAN])
    
    return(
        <>
            {
                USERSCAN.processing ? <ReviewSent />:<ReviewScanContnt />
            }
               
        </>
    )
}


export default ReviewSelected; 


const ReviewScanContnt = ()=>{
    
    const SCAN = useContext_SCAN_FULL();
    
    const [Fetching, setFetching] = useState('Model Name and Description')

    const USERSCAN = SCAN.UserScanState;

    useEffect(()=>{
    
        if(USERSCAN.UserWorkingDataSet_Single.length === 0){
          //  FetchSelectedItems(USERSCAN.UserScanSingleDataSets)
        }
        
        console.log(USERSCAN.processing)
        
    },[USERSCAN])
    return(
        <div>
                <h2>Name and Save Model</h2>
                
                <div className="ControlBar">
                    <BacktoSelectItems />
                </div>
            

                <div className="ModelReview">
                    <div>
                        <h2>Model Name and Description</h2>
                        <p>Add a clear and consis name and description for this model. This will be used later when comparing and anylisis models against each other.</p>
                        <ScanForm  DataSet={USERSCAN.UserScanSingleDataSets} />
                    </div>
                    <div>
                        <ul> 
                            {
                                USERSCAN.UserScanSingleDataSets.map((item,i)=>{
                                    return(
                                        <li key={i}>
                                            {item.name}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>


                   
                </div>
               

               
        </div>
    )
}

const ReviewSent=()=>{
    return(
        <>
            <h2>Building new Model</h2>
            <p>We are currently building the new model as requested.</p>
            <p>You can check the progess of the model under the "Resource Models" page</p>
            <p>Once the model status has changed to 'complete' your results will be viewable</p>
            <CreateNewModelBtn />
        </>
    )
}