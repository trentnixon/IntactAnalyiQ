import React, { useEffect, useState } from 'react'
import{NumberReducer, RegionColor, GroupArrayByOccurances} from "../../../../actions/HandleUX";
import {findClientName, FindTradeTypeAllocation} from "../../../../actions/ClusterAnalysis";
import ClusterMiniMap from "./ClusterMiniMap";
import LocationCityIcon from '@material-ui/icons/LocationCity';


const ClusterResult = (props)=>{

    const {result, i} = props;
    const [WorkOrderTotal, setWorkOrderTotal] = useState(0)
   
    const SumWorkorders = (data)=>{
        let total = []
        data.map((site)=>{
            if(!isNaN(site.SumWorkOrder))
                total.push(site.SumWorkOrder)
        })
        setWorkOrderTotal(total.reduce((a, b) => a + b, 0))
    }

    const SumTradeType = ()=>{

    }

    useEffect(()=>{ 
        //FindClusterTotal(result)
        SumWorkorders(result.sites) 
        SumTradeType(result.sites)
        console.log(result)
    },[result])

    return(
        <>
            
            <div className="colorkey" style={{backgroundColor:RegionColor(result.scanCategory)}}>
             <strong>{result.scanCategory}</strong>
            </div>
          
            <h3><LocationCityIcon /> Cluster { (i+1) }</h3>            
            <ul className="ListStats">
                <li>Sites: <strong>{result.sites.length}</strong></li>
                <li>Total Work Orders: <strong>{WorkOrderTotal}</strong></li>
                <li>Resource Quota : <strong>{result.resourceQuota.toFixed(2)}</strong></li> 
               
               <li>
                   Clients
                   <GetClientName clients = {GroupArrayByOccurances(JSON.parse(result.sites[0].count[0].Customers))}/></li>
                <li>
                    Trade Types
                   <GetTradeName Trades = {FindTradeTypeAllocation([{sites:result.sites}])}/></li>
               
             
            </ul>
            <h4></h4> 
           
            
            
            <div className="ListResultContainer">
               <ClusterMiniMap result={result}/>
            </div>
                
               
        </>
    )
}

/*
   <li>est Cost : <strong>$?</strong></li>
  <CenterPoints />
                        <Markers />
                        <ResidualMarkers />
*/
export default ClusterResult;

//<h3> {result.name}</h3>

const GetTradeName = (props)=>{
    const {Trades} = props
    return(
        <ul>
            {
                Trades[0].map((trade,i)=>{
                    return(
                        <li key={i}>
                            {trade} <strong>{Trades[1][i]}</strong>
                        </li>
                    )
                })

            }
        </ul>
    )
}


const GetClientName = (props)=>{
    const {clients} = props
    return(
        <ul>
            {
                clients[0].map((client, i )=>{
                    return(
                        <li key={i}><strong>{findClientName(client)}</strong></li>
                    )
                })

            }
        </ul>
    )
}




