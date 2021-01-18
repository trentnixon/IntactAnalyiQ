import React, { useEffect } from 'react'

import {useContext_SCAN_FULL} from "../../../../../Context/SCAN";
import ClusterResult from "./ClusterResults";


const ResultRow = ()=>{

    const SCAN = useContext_SCAN_FULL();

    useEffect(()=>{},[SCAN])

    return(
            <>
                <div className="ResultsHeader"> 
                    <h2>Results</h2>
                    
                    <h3>{SCAN.Results.length} clusters found</h3>
                    <p>Find more Information about the clusters below. Remove clusters that may have overlapping site to more accurately  dial in the clients needs.</p>
                </div>
             
                 <ul className="ListResults">

                    {
                        SCAN.Results.map((result,i)=>{
                                return(
                                    <li key={i} id={`Cluster${i}`}><ClusterResult result={result} i={i}/></li>
                                )
                        })
                    } 
            </ul>
            </>
    )
}
export default ResultRow;