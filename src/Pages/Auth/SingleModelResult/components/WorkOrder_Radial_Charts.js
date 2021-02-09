import React, {useEffect, useState} from 'react'
import {useContext_SCAN_FULL} from "Context/SCAN";
import {useContext_UX_FULL} from "Context/UX";

import {CreateRadial_ResourcesAgainstClusters,WorkOrderCompletion} from "actions/CreateSingleViewModel"
// Layout
import ChartHeader from "Pages/Auth/Components/Layout/ChartHeader";
// Chart
import PieChart from "venders/apexCharts/SimplePie";
import RadialSIngleChart from "venders/apexCharts/RadialSIngleChart";

const Chart1={
    Icon:'radial',
    Header:"Resources Allocation to Cluster Type",
    Tip:"Use the Filters",
    Copy:"The Radial Graph shows the number of Resource Allocations by Cluster Type in a given model. Use the 'Cluster Type' filter to find Resource Allocation numbers for a specific resource."
}


const Trade_Radial_Charts=()=>{

    const SCAN = useContext_SCAN_FULL();
    const UX = useContext_UX_FULL();
    const MODELCENTER = SCAN.SelectedModel.STOREMARKERCENTERPOINTS
    const [CategoryOccurance,setCategoryOccurance ] = useState([[]]) 

    useEffect(()=>{ 
        setCategoryOccurance(CreateRadial_ResourcesAgainstClusters(MODELCENTER))  
    },[UX,SCAN]) 
    
    return(
  
            <div className="resultCharts">
                <div>
                    <ChartHeader 
                        Icon={Chart1.Icon}
                        Header={Chart1.Header}
                        Tip={Chart1.Tip}
                        Copy={Chart1.Copy}
                    />
                    <RadialSIngleChart Data={CategoryOccurance} term={`Resource Allocation`}/>
                </div>
                <div>
                 <ChartHeader 
                    Icon='pie'
                    Header="Work orders covered in Model"
                    Copy="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
                />
                    <PieChart Data={[
                        { name: 'Work Order Completed',value: WorkOrderCompletion()[0]}, 
                        { name: 'Out of Scope', value:WorkOrderCompletion()[1] }]}
                    />
                </div>
            </div>
  
    )
}

export default Trade_Radial_Charts;

/*

 <div>
                 <ChartHeader 
                  Icon='pie'
                    Header="Sites covered in Model"
                    Copy="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
                />
                    <PieChart Data={[{ name: 'Work Order Completed', value: NumSites }, { name: 'Out of Scope', value: gl(MODEL.USERSELECTEDLIST)-NumSites }]}/>
                </div>
*/