import React from 'react'

import DiagramContainer from "Pages/Auth/Components/Layout/DiagramContainer"
import Client_Line_Workorders from 'Pages/Auth/SingleModelResult/Charts/Client_line_WorkordersOvertime'

const Client_Line_Workorders_Container=()=>{

    return(
        <DiagramContainer>
            <div className="resultCharts">
                <Client_Line_Workorders />
            </div>
        </DiagramContainer>
    )
}
export default Client_Line_Workorders_Container;
