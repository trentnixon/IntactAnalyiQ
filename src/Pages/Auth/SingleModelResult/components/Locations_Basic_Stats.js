import React, {useEffect} from 'react'
import {useContext_SCAN_FULL} from "Context/SCAN";
import { numberWithCommas, gl} from "actions/HandleUX";
import {H4,H3, P} from "Pages/Auth/Components/Type"

const HeaderLocations=()=>{

    const SCAN = useContext_SCAN_FULL();
    const MODEL = SCAN.SelectedModel
    const inScope=()=>{ return gl(MODEL.USERSELECTEDLIST)-gl(MODEL.STORERESIDUALMARKERS) }
    useEffect(()=>{ },[SCAN]);

    return(
        <> 
            <H3 Copy={`Global Breakdown`} />
          
                <ul className="Pod_List">
                    <li className="Pod">
                        
                        <div className="Data"><P Copy= {MODEL.STOREMARKERCENTERPOINTS.length}/></div>
                        <div className="Title"> <H4 Copy={`Clusters`}/></div>
                    </li>
                    <li className="Pod">
                        
                        <div className="Data"><P Copy={numberWithCommas(gl(MODEL.USERSELECTEDLIST))}/></div>
                        <div className="Title"> <H4 Copy={`Total Locations`}/></div>
                    </li>
                    <li className="Pod">
                       
                        <div className="Data"><P Copy={numberWithCommas(inScope())}/></div>
                        <div className="Title"> <H4 Copy={`Locations Inscope`}/></div>
                        <div className="Data Strong"><P Copy={`${((inScope()/gl(MODEL.USERSELECTEDLIST)*100)).toFixed(2)} %`} />
                    </div>
                    </li>
                    <li className="Pod">
                       
                        <div className="Data"><P Copy={numberWithCommas(gl(MODEL.STORERESIDUALMARKERS))}/></div>
                        <div className="Title"> <H4 Copy={`Out of Scope`}/></div>
                    </li>
                    
                </ul>
        </>
    )
}
export default HeaderLocations;