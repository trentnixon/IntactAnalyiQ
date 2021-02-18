import React from 'react'

// Layout
import DiagramContainer from "Pages/Auth/Components/Layout/DiagramContainer"
import {H3} from "Pages/Auth/Components/Type";

// Charts
import Resources_Line_Allocation_OverTime from 'Pages/Auth/SingleModelResult/Charts/Resources_Line_Allocation_OverTime';

const Trade_Radial_Charts=()=>{
    return(
        <>
         <H3 Copy={`Title Required`} />
            <DiagramContainer>
                <Resources_Line_Allocation_OverTime />
            </DiagramContainer>
        </>
    )
}
export default Trade_Radial_Charts;