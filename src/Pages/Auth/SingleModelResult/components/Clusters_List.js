import React, {useEffect, useState} from 'react'
import {useContext_SCAN_FULL} from "Context/SCAN";
import {OBJ_CENTERPOINTS} from 'actions/CreateSingleViewModel';

const ClusterList = ()=>{

    useEffect(()=>{
        console.log(OBJ_CENTERPOINTS())
    },[])
    return(
        <>
        List
        <ul>
            {
                OBJ_CENTERPOINTS().map((center,i)=>{
                    return(
                        <li key={i}>
                           <span>{ center.name }</span>
                           <span>{ center.type }</span>
                        </li>
                    )
                })
            }
        </ul>
        </>
    )
}
export default ClusterList;