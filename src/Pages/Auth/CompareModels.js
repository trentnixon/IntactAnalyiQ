import React, {useEffect } from 'react'
import {useContext_COMPARE_FULL} from "Context/COMPARE";

// Components
import SelectModels from "./Compare/SelectModels";
import ModelComparision from "./Compare/CompareModels";
import ResetModels from "Pages/Auth/Components/buttons/ResetCompareModels"

const CompareModels=()=>{

    const COMPARE = useContext_COMPARE_FULL();
    useEffect(()=>{ },[COMPARE])
    return(
        <> { COMPARE.CompareProcessing ? <FetchingModels /> :<UIswitch /> } </>
    )
}

export default CompareModels


const UIswitch = ()=>{ 
    const COMPARE = useContext_COMPARE_FULL();
    return( 
        <> { COMPARE.CompareStatus ? <ModelComparision /> :<SelectModels /> } </>
    )
}

const FetchingModels = ()=>{
    return(
        <> <h1>Fetching Models</h1><ResetModels /> </> 
    )
} 