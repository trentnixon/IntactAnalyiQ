import React from 'react'

import DiagramContainer from "Pages/Auth/Components/Layout/DiagramContainer"

// Charts
import Client_Pie_Resources from 'Pages/Auth/SingleModelResult/Charts/Client_Pie_Resources'
import Client_Pie_Sites from 'Pages/Auth/SingleModelResult/Charts/Client_Pie_Sites'
import Client_Pie_WorkOrders from 'Pages/Auth/SingleModelResult/Charts/Client_Pie_WorkOrders'
import ClientResourceSiteStatsBar from "Pages/Auth/SingleModelResult/components/Clients_Site_Resource_StatsBar";

const Client_Wrapup= ()=>{

 
    return(
        <DiagramContainer>
            <div className="resultCharts">
                <Client_Pie_Resources />
                <Client_Pie_Sites />
                <Client_Pie_WorkOrders />
            </div>
            <ClientResourceSiteStatsBar /> 
        </DiagramContainer>
    )
}

export default Client_Wrapup;