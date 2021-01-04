import React, {useEffect } from 'react'
import {useContext_UX_FULL} from "../../Context/UX";

// Layout
import SelectARegion from "./Components/Layout/SelectRegionLayout";
import ScanResultsLayout from "./Components/Layout/ScanResultsLayout";

const GeoSourceResources = ()=>{

    const UX = useContext_UX_FULL();

    const RegionSelected = ()=>{
        let Filters = UX.AreaSelectFilter, isTrue=true;
        if(Filters.country === null || Filters.state === null || Filters.region === null){ isTrue=false  }
        return isTrue
    }

    useEffect(()=>{ console.log(UX.AreaSelectFilter)},[UX.AreaSelectFilter])

    if(RegionSelected()){return(<ScanResultsLayout />)}
    else {return( <SelectARegion /> )}
}

export default GeoSourceResources