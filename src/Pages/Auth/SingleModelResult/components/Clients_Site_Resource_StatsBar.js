import React, {useEffect, useState} from 'react'
import {useContext_UX_FULL} from "Context/UX";
import {Client_Split_by_Resources, Client_Split_by_Site,Client_Split_by_WorkOrders } from "actions/CreateSingleViewModel"
import {H3} from "Pages/Auth/Components/Type";

const ClusterByClientName = ()=>{
    const UX = useContext_UX_FULL(); 

    const [ClientResources,setClientResources] = useState([[]]) 
    const [ClientSites,setClientSites] = useState([[]]) 
    const [ClientWorkOrders,setClientWorkOrders ] = useState([[]]);
    
    useEffect(()=>{ 
        setClientResources(Client_Split_by_Resources())
        setClientSites(Client_Split_by_Site())
        setClientWorkOrders(Client_Split_by_WorkOrders())
    },[UX]) 

    return(
        <>
            
            <ul className="Stat_Bar Column">
            <H3 Copy={`Resources Allocations`} />
            {
                ClientResources.map((key, i)=> {
                    return(
                        <li key={i}>
                            <div>
                                <div>{key.name} </div>
                                <div>{key.value} </div>
                            </div>
                        </li>
                        )
                    })        
            }
             <H3 Copy={`Sites`} />
             {
                ClientSites.map((key, i)=> {
                    return(
                        <li key={i}>
                            <div>
                                <div>{key.name} </div>
                                <div>{key.value} </div>
                            </div>
                        </li>
                        )
                    })        
            }
            <H3 Copy={`Workorders`} />
             {
                ClientWorkOrders.map((key, i)=> {
                    return(
                        <li key={i}>
                            <div>
                                <div>{key.name} </div>
                                <div>{key.value} </div>
                            </div>
                        </li>
                        )
                    })        
            }

            </ul>

      
        </>
    )
}

export default ClusterByClientName;