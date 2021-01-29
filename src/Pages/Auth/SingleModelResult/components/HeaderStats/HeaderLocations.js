import React, {useEffect} from 'react'
import {useContext_SCAN_FULL} from "../../../../../Context/SCAN";
import { numberWithCommas} from "../../../../../actions/HandleUX";

const HeaderLocations=()=>{

    const SCAN = useContext_SCAN_FULL();
    const MODEL = SCAN.SelectedModel
 
    const gl=(data)=>{
        return data.length
    }

    const inScope=()=>{
        return gl(MODEL.USERSELECTEDLIST)-gl(MODEL.STORERESIDUALMARKERS)
    }

    useEffect(()=>{
        console.log(MODEL)
    },[]) 
    return(
        <div className="MetaRow">
            <h2>Locations</h2>
                <div>
                    {MODEL.STOREMARKERCENTERPOINTS.length}
                    <h3>Clusters </h3>
                    &nbsp;
                </div>
                <div>
                    {numberWithCommas(gl(MODEL.USERSELECTEDLIST))}
                    <h3>Total Locations </h3>
                    &nbsp;
                </div>
                <div>
                 {numberWithCommas(inScope())} 
                    <h3>Locations Inscope </h3>
                    { ((inScope()/gl(MODEL.USERSELECTEDLIST)*100)).toFixed(2)}%
                </div>
                <div>
                    {numberWithCommas(gl(MODEL.STORERESIDUALMARKERS))}
                    <h3>Out of Scope</h3>
                    &nbsp;
                </div>
        </div>
    )
}
export default HeaderLocations;