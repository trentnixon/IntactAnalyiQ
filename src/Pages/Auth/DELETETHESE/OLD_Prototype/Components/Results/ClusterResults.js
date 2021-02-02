import React, { useEffect, useState } from 'react'

import{NumberReducer} from "actions/HandleUX";

import DeleteClusterBtn from "../Controls/buttons/DeleteClusterBtn";
import BacktoMap from "../Controls/buttons/BacktoMapBtn";
import ClusterMap from "../Map/clusterMap/clustermap";
import MoreInfo from "./MoreInfo";


import LocationCityIcon from '@material-ui/icons/LocationCity';
const ClusterResult = (props)=>{

    const {result, i} = props;
    const [Multiplier, setMultiplier]= useState(1000)
    const [ClusterTotal, setClusterTotal] = useState(0)


    const FindClusterTotal = (result)=>{
        let total=0;
        result.ClusterCost.map((type,i)=>{ total = total + type[1] })
        
        setClusterTotal(NumberReducer(parseFloat((total*Multiplier).toFixed(2))))
    }


    useEffect(()=>{ FindClusterTotal(result) },[result])

    return(
        <>
        <h3><LocationCityIcon /> Cluster { (i+1) }</h3> 
        <h3>Resources Required : <strong>{result.TradeTypeCount[0].length}</strong></h3>
        <h3>est Cluster Cost : <strong>${ClusterTotal}</strong></h3>
        <div className="ListResultContainer">
                <div className="Title">
                    
                    <div className="metaData">
                        <BacktoMap />
                        <h3> Work order Count : <strong>{result.WorkOrderCount}</strong></h3>
                        <h3> Sites in this Region : <strong>{result.SiteCount}</strong></h3>
                        <DeleteClusterBtn Data={result}/> 
                    </div>
                    
                </div>
              
                <ClusterMap Data={result}/>
                <MoreInfo result={result}/>
        </div>
        </>
    )
} 

export default ClusterResult;

/*
  <div className="ClusterOverview">
                    
                    </div>
*/