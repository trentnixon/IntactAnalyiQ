import React, {useEffect } from 'react'
import {useContext_UX_FULL} from "Context/UX";
//import {useContext_SCAN_FULL} from "Context/SCAN";
import {
    OBJ_CLIENT_RESOURCES,
    OBJ_CLUSTER_GLOBAL
} from "actions/CreateSingleViewModel"

// Layout
import DiagramContainer from "Pages/Auth/Components/Layout/DiagramContainer"
import Stats_Bar from "Pages/Auth/Components/Layout/Stats_Bar";
import {H3} from "Pages/Auth/Components/Type";

// Charts
import Resources_Pie_ClientBreakdown from 'Pages/Auth/SingleModelResult/Charts/Resources_Pie_ClientsBreakdown';
import Resource_Cluster_Funnel from 'Pages/Auth/SingleModelResult/Charts/Resources_Cluster_Funnel';

const Resources_Client_Brekdown=()=>{

    const UX = useContext_UX_FULL();
    useEffect(()=>{ },[UX]) 
    return(
        <>
            <H3 Copy={`Title Required`} />
            <DiagramContainer>
            
                <div className="resultCharts">
                    <Resources_Pie_ClientBreakdown />
                    <Resource_Cluster_Funnel />
                </div>

                <Stats_Bar data={OBJ_CLIENT_RESOURCES()} name={`name`} value={`Sum`}/>
                <Stats_Bar data={OBJ_CLUSTER_GLOBAL()} name={`name`} value={`Resource_Count_${UX.AreaSelectFilter.ByResourceType}`}/>
            </DiagramContainer>
        </>
    )
}
export default Resources_Client_Brekdown;