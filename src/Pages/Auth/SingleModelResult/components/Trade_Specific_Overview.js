import React, {useEffect, useState} from 'react'
import {useContext_SCAN_FULL} from "Context/SCAN";
import {useContext_UX_FULL} from "Context/UX";
// Actions
import DiagramContainer from "Pages/Auth/Components/Layout/DiagramContainer"

import {OBJ_RESOURCES_GLOBAL} from "actions/CreateSingleViewModel"
import {H1,H2,H4,P} from "Pages/Auth/Components/Type";
import {find} from 'lodash'


const TradeSpecificOverview=()=>{

    const SCAN = useContext_SCAN_FULL();
    const UX = useContext_UX_FULL();
    const [tradeVolume, setTradeVolume] = useState(0)

    useEffect(()=>{ 
  
        let FindObj = find(OBJ_RESOURCES_GLOBAL(), function(o) { return o.name == UX.AreaSelectFilter.ByResourceType; });
        setTradeVolume(FindObj)

        console.log(tradeVolume, UX.AreaSelectFilter.ByResourceType)
    },[UX.AreaSelectFilter.ByResourceType]) 
     

    return( 
        <DiagramContainer>
            <div >
                <H4 Copy={` Resource Type Selected : ${tradeVolume.name}`}/>
                <H4 Copy={`Resource Allocation : ${tradeVolume.Resources}`}/>
            </div>
        </DiagramContainer>
    )
}
export default TradeSpecificOverview;
