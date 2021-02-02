import React, { useEffect, useState } from 'react'
import {useContext_STRAPI_FULL} from "Context/STRAPI";
import {useContext_SCAN_FULL} from "Context/SCAN";
import { orderBy,  remove} from 'lodash'; 
import {FetchSelectedItems} from "actions/HandleScanProcess";
import BacktoSelectItems from "./Components/BacktoAddItems"

const ReviewSelected = ()=>{

    const STRAPI = useContext_STRAPI_FULL();
    const SCAN = useContext_SCAN_FULL();
    const [Fetching, setFetching] = useState('Im just fetching these items... Please Wait here!')

    const USERSCAN = SCAN.UserScanState;

    useEffect(()=>{
    
        if(USERSCAN.UserWorkingDataSet_Single.length === 0){
          //  FetchSelectedItems(USERSCAN.UserScanSingleDataSets)
        }
        
        console.log(USERSCAN.UserWorkingDataSet_Single)
        
    },[USERSCAN.UserWorkingDataSet_Single])
    
    return(
        <div>
                <h2>Review</h2>
                <BacktoSelectItems />

                <h3>{Fetching}</h3>
            {
                USERSCAN.UserScanSingleDataSets.map((item,i)=>{
                    return(
                        <li key={i}>
                            {item.name}
                        </li>
                    )
                })
            }


            
        </div>
    )
}


export default ReviewSelected; 