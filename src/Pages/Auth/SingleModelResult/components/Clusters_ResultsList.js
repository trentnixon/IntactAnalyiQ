import React, {useEffect, useState} from 'react'
import {useContext_SCAN_FULL} from "Context/SCAN";
import ClusterResults from "Pages/Auth/Components/Maps/ClusterMiniMapResults/ClusterResults";


import Section from "Pages/Auth/Components/Layout/Section"
import {H2} from "Pages/Auth/Components/Type";
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
        console.log(SCAN.SelectedModel.STOREMARKERCENTERPOINTS)
        if(SCAN.SelectedModel.STOREMARKERCENTERPOINTS !==null)
            extractResults()
        
    },[SCAN]);

    return(
        <Section>
            <H2 Copy={`Cluster Breakdown`}/> 
            
            
        </Section>
    )
}

export default CulsterResults; 

// <ul className="ListResults">{Results}</ul>