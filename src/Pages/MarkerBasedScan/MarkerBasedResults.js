import React, {useEffect, useState} from 'react'
//import {useContext_STRAPI_FULL} from "../../Context/STRAPI";
//import {useContext_UX_FULL} from "../../Context/UX";
import {useContext_SCAN_FULL} from "../../Context/SCAN";

const MarkerBasedResults = ()=>{
    const SCAN = useContext_SCAN_FULL();

    const [Results, setResults] = useState(null)
    
    const extractResults=()=>{
        console.log(SCAN.MarkerScanCenterPoints);

        let ResultArr=[]
            SCAN.MarkerScanCenterPoints.map((result,i)=>{
                ResultArr.push(
                    <li key={i}>
                        <div>
                            <h2>Cluster Center</h2>
                            <p>{result.name}</p>
                        </div>
                        <div>
                            <h2>Region Category</h2>
                            <p>{result.region}</p>
                        </div>
                        <div>
                            <h2>Cluster Resource Quota</h2>
                            <p>{result.resourceQuota.toFixed(2)}</p>
                        </div>
                     
                        
                    </li>
                )
                return true


            })
        
            setResults(ResultArr)
    }

    useEffect(()=>{
      
        if(SCAN.MarkerScanCenterPoints !==null)
            extractResults()

    },[SCAN])
    return(
        <div>
            <h3>Results</h3>

            <ul className="ListBasicResults">
                    {Results}
            
            </ul>
        </div>
    )
}

export default MarkerBasedResults;