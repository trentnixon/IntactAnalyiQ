import React, {useEffect, useState} from 'react'
import {useContext_SCAN_FULL} from "../../../Context/SCAN";
import ClusterResults from "./components/ClusterResults";

const CulsterResults = ()=>{
   
    const SCAN = useContext_SCAN_FULL();
    const [Results, setResults] = useState(null)

    const extractResults=()=>{
        let ResultArr=[];
            SCAN.SelectedModel.STOREMARKERCENTERPOINTS.map((result,i)=>{
                ResultArr.push( <li key={i}> <ClusterResults  result={result} i={i}/></li>)
                return true
            })
            setResults(ResultArr);
    }

    useEffect(()=>{
        if(SCAN.SelectedModel.STOREMARKERCENTERPOINTS !==null)
            extractResults()
        
    },[SCAN]);

    return(
        <>
            <div class="MetaRow"> <h2> Cluster Breakdown</h2></div>
           
            <ul className="ListResults">{Results}</ul>
        </>
    )
}

export default CulsterResults; 