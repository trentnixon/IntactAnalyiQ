import React  from 'react'

// Template
import Section from "Pages/Auth/Components/Layout/Section"
import {H2} from "Pages/Auth/Components/Type";


// components
import Locations_Basic_Stats from "../components/Locations_Basic_Stats"
import Locations_Basic_Charts from "../components/Locations_Basic_Charts";

import LocationHeatMap from "../Maps/Location_Heatmap";
import Location_ResourceSpread from "../components/Location_ResourceSpread";
import Location_WorkorderSpread from "../components/Location_WorkOrderSpread";
import LocationsNetwork from "Pages/Auth/SingleModelResult/components/Locations_Network";
import GlobalFilter from "Pages/Auth/Components/Layout/ReviewGlobalFilter";
import ModelMeta from "Pages/Auth/SingleModelResult/Layout/ModelMeta";
import AppBar from "Pages/Auth/SingleModelResult/Layout/AppBar"

const SubSection_Locations = ()=>{

    return(
        <>
            <div className="InnerFrame">
                <H2 Copy={`Locations`} /> 
                
                
                <Section>
                    <Locations_Basic_Stats />    
                    <LocationsNetwork /> 
                    <Locations_Basic_Charts />
                    <LocationHeatMap />
                    <Location_ResourceSpread />      
                    <Location_WorkorderSpread /> 
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

// <Location_CLusterSpreadbyClient />
export default SubSection_Locations;