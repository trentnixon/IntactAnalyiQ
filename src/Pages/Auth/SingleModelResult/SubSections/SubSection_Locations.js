import React  from 'react'

// Template
import Section from "Pages/Auth/Components/Layout/Section"
import {H1} from "Pages/Auth/Components/Type";


// components
import Locations_Basic_Stats from "../components/Locations_Basic_Stats"
import Locations_Basic_Charts from "../components/Locations_Basic_Charts";

import LocationHeatMap from "../Maps/Location_Heatmap";
import Location_ResourceSpread from "../components/Location_ResourceSpread";
import Location_WorkorderSpread from "../components/Location_WorkOrderSpread";
const SubSection_Locations = ()=>{

    return(
        <>
            <H1 Copy={`Locations`} /> 
            <Section>
                Out of Scope breakdown 
                <Locations_Basic_Stats />    
                <Locations_Basic_Charts />
                
                <LocationHeatMap />
                <Location_ResourceSpread />      
                <Location_WorkorderSpread /> 
            </Section>  
  
        </>
    )
}

// <Location_CLusterSpreadbyClient />
export default SubSection_Locations;