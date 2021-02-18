import React  from 'react'
import {useContext_UX_FULL} from "Context/UX";
// Template
import Section from "Pages/Auth/Components/Layout/Section"
import {H1,H2,H4,P} from "Pages/Auth/Components/Type";

import Trade_ResourceAllocation from "Pages/Auth/SingleModelResult/components/Trade_ResourceAllocation";
import Trade_Radial_Charts from "Pages/Auth/SingleModelResult/components/Trade_Radial_Charts";
import Trade_Radial_Clients from "Pages/Auth/SingleModelResult/components/Trade_Radial_Clients";
import Trade_ResourceAllocationOverTime from "Pages/Auth/SingleModelResult/components/Trade_AllocationOverTime";
import TradeSpecific_ClientBreakdown from "Pages/Auth/SingleModelResult/components/Trade_Specific_ClientBreakdown";
import TradeSpecific_Overview from "Pages/Auth/SingleModelResult/components/Trade_Specific_Overview";
import Trade_Ratios from "Pages/Auth/SingleModelResult/components/Trade_Ratios";
import TradeHeatMap from  "Pages/Auth/SingleModelResult/Maps/Trade_Heatmap";
import FaceIcon from '@material-ui/icons/Face';

const SubSection_Trade = ()=>{
    const UX = useContext_UX_FULL();
    return(
        <>
        <H1 Copy={`Resources`} /> 
        <Section>
      
           
            stat bar : resource figures
            stat bar resources by client.
            Bar WO spread over resources 
            Bar : resources by cluster type  
           
            <Trade_ResourceAllocation />  
            <Trade_Radial_Charts />
            <Trade_Radial_Clients />     
            <TradeHeatMap /> 
                <Section>
                    {
                            UX.AreaSelectFilter.ByResourceType === null ? <SelectATrade /> :<TradeSpecificComponents />
                        }
                </Section>
        </Section>  
           
       </> 
    ) 
}

//  <Trade_Ratios />
export default SubSection_Trade;


const SelectATrade = ()=>{
    return(
        <Section>
            <div className="PleaseSelectOption">
                <FaceIcon />
                <H4 Copy={`No Resource Type Selected`}/>
                <P Copy={`To use this Section a Resource Type must be selected from the Filter Above.`} />
            </div>
            
        </Section>
    )
}

const TradeSpecificComponents=()=>{
    return(
        <Section className="SelectedItem"> 
                <TradeSpecific_Overview />   
                <TradeSpecific_ClientBreakdown />
                <Trade_ResourceAllocationOverTime />
                
                break down stats for each resource Type. i.e. handyman section
           </Section>
    )
}