import React, {useEffect, useState} from 'react'
// Context
import {useContext_SCAN_FULL} from "Context/SCAN";
import {useContext_UX_FULL} from "Context/UX";

// Actions
import {CreateRadial_ResourcesAgainstClusters} from "actions/CreateSingleViewModel"

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
     
    },[UX]) 
    
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
                    Header="Resource Split by Cluster type"
                    Copy="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
                />
                    <PieChart Data={CategoryOccurance}/>
                </div>
            </div>
  
    )
}

export default Trade_Radial_Charts;