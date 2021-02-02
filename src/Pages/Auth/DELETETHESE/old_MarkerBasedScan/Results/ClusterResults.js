import React, { useEffect, useState } from 'react'

import{NumberReducer} from "actions/HandleUX";

//import DeleteClusterBtn from "../Controls/buttons/DeleteClusterBtn";
//import BacktoMap from "../Controls/buttons/BacktoMapBtn";
//import ClusterMap from "../../Prototype/Components/Map/clusterMap/clustermap"
//import MoreInfo from "./MoreInfo";


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


    useEffect(()=>{ 
        //FindClusterTotal(result) 
        //console.log(result)
    },[result])

    return(
        <>
            <h3><LocationCityIcon /> Cluster { (i+1) }  - <strong>{result.scanCategory}</strong></h3>
            <h3>Cluster Resource Quota : <strong>{result.resourceQuota.toFixed(2)}</strong></h3> 
            <h3>est Cluster Cost : <strong>${0}</strong></h3>
            <div className="ListResultContainer">
                <div className="Title">
                <h3> {result.name}</h3>
                </div>
                Add Map and Cluster Details once Data dump has been completed
 
            </div>
                
               
        </>
    )
}

export default ClusterResult;
