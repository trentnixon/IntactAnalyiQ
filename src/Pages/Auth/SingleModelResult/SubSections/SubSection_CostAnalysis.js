import React  from 'react'
// Template
import Section from "Pages/Auth/Components/Layout/Section"
import {H2,P} from "Pages/Auth/Components/Type";

import Cost_Resources from "Pages/Auth/SingleModelResult/components/Cost_Resources";
import Cost_Resource_PieCharts from "Pages/Auth/SingleModelResult/components/Cost_Resource_PieCharts";
import Cost_Resource_OverTime from "Pages/Auth/SingleModelResult/components/Cost_Resource_OverTime";
import Cost_Trade_Heatmap from "../Maps/Cost_Trade_Heatmap";

import GlobalFilter from "Pages/Auth/Components/Layout/ReviewGlobalFilter";
import ModelMeta from "Pages/Auth/SingleModelResult/Layout/ModelMeta";
import AppBar from "Pages/Auth/SingleModelResult/Layout/AppBar"

const SubSection_Workorders = ()=>{

    return(
        <>
            <div className="InnerFrame">
            <H2 Copy={`Cost Analysis`} />
            <P Copy={`For Development Purposes ONLY!!! `}/>
            <P Copy={`The Figures in the follow section are not based on real world figures.`}/>
            
 
            <Section>
                <Cost_Resources />
                 <Cost_Resource_PieCharts />
                 <Cost_Resource_OverTime />
                 <Cost_Trade_Heatmap />
                
                
                    MORE TO COME... 
            </Section>  
            </div>
            <AppBar />
            <div className="SideBarRight"> 
                <ModelMeta />
                <GlobalFilter />
            </div>
        </>
    )  
}
/*

         individual trade
                
                Location
                bar Chart

                Client
                break down
                pie
                individual client   
*/
export default SubSection_Workorders;