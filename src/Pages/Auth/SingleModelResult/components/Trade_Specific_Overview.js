import React, {useEffect, useState} from 'react'
import {useContext_SCAN_FULL} from "Context/SCAN";
import {useContext_UX_FULL} from "Context/UX";
// Actions
import {colorArray} from "actions/HandleUX";

import {CreateRadial_ResourcesAgainstClusters} from "actions/CreateSingleViewModel"
import {H1,H2,H4,P} from "Pages/Auth/Components/Type";
import {find} from 'lodash'


const Trade_Radial_Charts=()=>{

    const SCAN = useContext_SCAN_FULL();
    const UX = useContext_UX_FULL();
    const [tradeVolume, setTradeVolume] = useState(0)

    useEffect(()=>{ 
        console.log(SCAN.SelectedModel.STOREMARKERCENTERPOINTS) 
        let SetVolume = (CreateRadial_ResourcesAgainstClusters())
        let FindObj = find(SetVolume, function(o) { return o.name == UX.AreaSelectFilter.ByResourceType; });
        setTradeVolume(FindObj)
    },[UX]) 
    

    return( 
            <div >
                <H4 Copy={` Resource Type Selected : ${tradeVolume.name}`}/>
                <H4 Copy={`Resource Allocation : ${tradeVolume.value}`}/>
                
            </div>
    )
}
export default Trade_Radial_Charts;
