import React, {useEffect} from 'react'

//import {useContext_STRAPI_FULL} from "../../../../../Context/STRAPI";
import {useContext_UX_FULL} from "../../../../../Context/UX";

import MaterialUISelectCountry from "./inputs/SelectStateCountry"
import MaterialUISelectState from "./inputs/SelectStateState"
import MaterialUISelectRegion from "./inputs/SelectStateRegion"

const Controls = ()=>{
   const UX = useContext_UX_FULL(); 
    useEffect(()=>{},[UX.AreaSelectFilter])
    return(
        <div className="SelectControls">
              <MaterialUISelectCountry />
              <MaterialUISelectState />
              <MaterialUISelectRegion />
        </div>
    )
}
export default Controls;