import React, {useEffect, useState} from 'react'
import {useContext_SCAN_FULL} from "../../../../../Context/SCAN";
import {findClientName} from "../../../../../actions/ClusterAnalysis";

const ClusterByClientName = ()=>{
    const SCAN = useContext_SCAN_FULL();
    const [byClient, setByClient] = useState([])
    const Model = SCAN.SelectedModel;
    const ByClient=()=>{
        let client=[];
        let SumByClient
        Model.STOREMARKERCENTERPOINTS.map((sites,i)=>{
            sites.sites.map((site,i)=>{
                client.push({
                    sum:site.SumWorkOrder,
                    client:site.customers[0]
                })
            })
        })
      
        SumByClient = client.reduce(function (r, o) { (r[o.client])? r[o.client] += o.sum : r[o.client] = o.sum; return r; }, {});

        setByClient(SumByClient)
    }

    useEffect(()=>{ByClient()},[SCAN])

    return(
        <div className="ResultsHeader">
        <ul className="">
           {
               Object.keys(byClient).map(function(key, i) {
                   return(
                       <li key={i}>
                           <div>{findClientName(key)}</div>
                           <div>{byClient[key]} </div>
                       </li>
                       )
                 })        
           }
       </ul>
   </div>
    )
}

export default ClusterByClientName;