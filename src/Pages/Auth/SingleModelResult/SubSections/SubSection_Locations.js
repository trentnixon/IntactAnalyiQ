import React  from 'react'

// Template
import Section from "Pages/Auth/Components/Layout/Section"
import {H1,H2, P} from "Pages/Auth/Components/Type";

// components
import Locations_Basic_Stats from "../components/Locations_Basic_Stats"
import Locations_Basic_Charts from "../components/Locations_Basic_Charts";
import Locations_ByTier from "../components/Locations_ByTier";
import Location_CLusterSpreadbyClient from "../components/Location_CLusterSpreadbyCLient";

const SubSection_Locations = ()=>{

    return(
        <>
            <H1 Copy={`Locations`} />
            <Section>

                [Location stats]
                by state?
                work order by tier Bar Charts


                <Locations_Basic_Stats />
                <Locations_ByTier />
                <Locations_Basic_Charts />
                <Location_CLusterSpreadbyClient />
            </Section>

        </>
    )
}
//<LocationCharts />
//<ClusterByCategory /> 
export default SubSection_Locations;