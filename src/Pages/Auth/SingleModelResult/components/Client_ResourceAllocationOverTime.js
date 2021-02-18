import React from 'react'
import DiagramContainer from "Pages/Auth/Components/Layout/DiagramContainer"
import Client_line_ResourcesOvertime from 'Pages/Auth/SingleModelResult/Charts/Client_line_ResourcesOvertime'

const Client_line_ResourcesOvertime_Container =()=>{
    return(
        <DiagramContainer>
            <div className="resultCharts">
                <Client_line_ResourcesOvertime />
            </div>
        </DiagramContainer>
    )
}
export default Client_line_ResourcesOvertime_Container;
