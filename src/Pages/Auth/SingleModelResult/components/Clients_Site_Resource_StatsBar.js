import React, {useEffect, useState} from 'react'
import {useContext_UX_FULL} from "Context/UX";
import {OBJ_CLIENT_GLOBAL_Filter } from "actions/CreateSingleViewModel"
import {H3} from "Pages/Auth/Components/Type";

const ClusterByClientName = ()=>{
    const UX = useContext_UX_FULL(); 
    const [ClientBreakDown,setClientBreakDown ] = useState([[]]) 

    useEffect(()=>{    
        setClientBreakDown(OBJ_CLIENT_GLOBAL_Filter())
        //console.log(OBJ_CLIENT_GLOBAL_Filter())
    },[UX]) 

    return(
        <>
            <ul className="Stat_Bar Column">
            <H3 Copy={`Resources Allocations`} />
            {
                ClientBreakDown.map((key, i)=> {
                    return(
                        <li key={i}>
                            <div>
                                <div>{key.name} </div>
                                <div>{key.Resources} </div>
                            </div>
                        </li>
                        )
                    })        
            }
             <H3 Copy={`Sites`} />
             {
                ClientBreakDown.map((key, i)=> {
                    return(
                        <li key={i}>
                            <div>
                                <div>{key.name} </div>
                                <div>{key.['Total Sites']} </div>
                            </div>
                        </li>
                        )
                    })        
            }
            <H3 Copy={`Workorders`} />
             {
                ClientBreakDown.map((key, i)=> {
                    return(
                        <li key={i}>
                            <div>
                                <div>{key.name} </div>
                                <div>{key.['Work Orders']} </div>
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