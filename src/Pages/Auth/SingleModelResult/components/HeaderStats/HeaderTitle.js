import React, { useEffect } from 'react'
import {useContext_SCAN_FULL} from "../../../../../Context/SCAN";
import { HandleTZDate} from "../../../../../actions/HandleUX";
const HeaderTitle = ()=>{
    const SCAN = useContext_SCAN_FULL();
    const SCANMODELMETA = SCAN.SelectedModelMeta

    useEffect(()=>{
        console.log(SCAN)
    },[])
    return(
        <div className="ModelSingleHeader">
                <div className="created"><p>Created : {HandleTZDate(SCANMODELMETA.createdAt)}</p></div>
                <h2>Model : {SCANMODELMETA.Name}</h2>
                <p>{SCANMODELMETA.Description}</p>
        </div>
    )
}

export default HeaderTitle;