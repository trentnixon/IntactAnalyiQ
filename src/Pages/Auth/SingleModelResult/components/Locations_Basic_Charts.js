import React, {useEffect, useState} from 'react'
// Context
import {useContext_UX_FULL} from "Context/UX";
// Actions
import {ChartData_ClustersBy_ResourceType, ChartData_SitesInScope} from "actions/CreateSingleViewModel"
// Layout
import ChartHeader from "Pages/Auth/Components/Layout/ChartHeader";
// Chart
import PieChart from "venders/apexCharts/SimplePie";
import RadialSIngleChart from "venders/apexCharts/RadialSIngleChart";


const Chart1={
    Icon:'radial',
    Header:"Clusters as a Radial",
    Tip:"Use the Filters",
    Copy:"The Radial Graph shows the number of clusters per cluster type in a given model. Use the 'Resource Type' filter to find cluster numbers fopr a specific resource."
}

const Chart2={
    Icon:'pie',
    Header:"Sites covered in Model",
    Tip:"Use the Filters",
    Copy:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
}

const Locations_Radial_Pie_Charts=()=>{
    const UX = useContext_UX_FULL(); 
    const [CategoryOccurance,setCategoryOccurance ] = useState([[]]) 
    const [PieNumbers,setPieNumbers ] = useState([[]]) 
    
    useEffect(()=>{  
        setCategoryOccurance(ChartData_ClustersBy_ResourceType())
        setPieNumbers(ChartData_SitesInScope())
    },[UX]) 
    
    useEffect(()=>{ },[CategoryOccurance,PieNumbers])
    return(
        <div className="resultCharts">
            <div>
                <ChartHeader Icon={Chart1.Icon} Header={Chart1.Header}  Copy={Chart1.Copy} Tip={Chart1.Tip} />
                <RadialSIngleChart Data={CategoryOccurance} term={`Clusters`}/>
            </div>
            <div>
                <ChartHeader Icon={Chart2.Icon} Header={Chart2.Header}  Copy={Chart2.Copy} Tip={Chart2.Tip} />
                <PieChart Data={PieNumbers}/>
            </div>
        </div>
    )
}
export default Locations_Radial_Pie_Charts;