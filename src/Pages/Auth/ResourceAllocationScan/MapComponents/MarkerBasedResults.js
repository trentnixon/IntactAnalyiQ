import React, {useEffect, useState} from 'react'
import {useContext_SCAN_FULL} from "Context/SCAN";
import ClusterResults from "../Results/ClusterResults";
import {GroupArrayByOccurances} from "actions/HandleUX";

const MarkerBasedResults = ()=>{
    const SCAN = useContext_SCAN_FULL();

    const [Results, setResults] = useState(null)
    const [CategoryOccurance,setCategoryOccurance ] = useState([[]])
    const extractResults=()=>{
        //console.log(SCAN.MarkerScanCenterPoints);

        let ResultArr=[];
        let CategoryInt=[]
            SCAN.MarkerScanCenterPoints.map((result,i)=>{
                ResultArr.push( <li key={i}> <ClusterResults  result={result} i={i}/></li>)
                CategoryInt.push(result.scanCategory)
                return true
            })
            setResults(ResultArr);
            setCategoryOccurance(GroupArrayByOccurances(CategoryInt))
    }


    useEffect(()=>{
        if(SCAN.MarkerScanCenterPoints !==null)
            extractResults()

    },[SCAN]);

    return(
        <>
            <div className="ResultsHeader">
            <h2>Results</h2>
            <h3>Clusters : <strong>{SCAN.MarkerScanCenterPoints.length}</strong></h3>
            <h4>By Category:</h4>
            <ul className="ClustersbyCategory">
            {
                CategoryOccurance[0].map((cat,i)=>{
                    return(
                        <li key={i}>
                                {cat} : {CategoryOccurance[1][i]}
                        </li>
                    )
                })
            }
            </ul>
            <h3>Sites were not allocated a Cluster : <strong>{SCAN.MarkerScanResidual.length} </strong></h3>
            <h3>Sites were not included in this scan : <strong>{SCAN.NoLongLat.length} </strong></h3>
            </div>

            <ul className="ListResults">
                    {Results}
            </ul>
        </>
    )
}

export default MarkerBasedResults;