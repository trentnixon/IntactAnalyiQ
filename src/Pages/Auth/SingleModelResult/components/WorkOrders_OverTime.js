import React from 'react'

import DiagramContainer from "Pages/Auth/Components/Layout/DiagramContainer"
import Workorder_Bar_Overtime from 'Pages/Auth/SingleModelResult/Charts/Workorder_Bar_Overtime'

const Trade_Radial_Charts=()=>{

    return(
        <DiagramContainer> 
            <div className="resultCharts">
                <Workorder_Bar_Overtime />
            </div>
        </DiagramContainer>
    )
}
export default Trade_Radial_Charts;
