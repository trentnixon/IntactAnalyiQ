import React, {useEffect, useState} from 'react'
// Context
import {useContext_UX_FULL} from "Context/UX";
import {useContext_SCAN_FULL} from "Context/SCAN";
// Actions
import {Client_Split_by_Resources, Client_Split_by_Site, Client_Split_by_WorkOrders } from "actions/CreateSingleViewModel"
// Layout
import ChartHeader from "Pages/Auth/Components/Layout/ChartHeader";
// Chart
import PieChart from "venders/apexCharts/SimplePie";

import {findIndex} from 'lodash'

const Chart1={
    Icon:'pie',
    Header:"By Resource Allocation",
    Tip:"Use the Filters",
    Copy:"Graph shows the Resource Allocation to each client within the Model"
}

const Chart2={
    Icon:'pie',
    Header:"By Location",
    Tip:"Use the Filters",
    Copy:"Graph shows the site distribution by client over the Model "
}

const Chart3={
    Icon:'pie',
    Header:"By Workorders",
    Tip:"Use the Filters",
    Copy:"Graph shows the Work Order distribution by client over the Model "
}

const Locations_Radial_Pie_Charts=()=>{
    const UX = useContext_UX_FULL(); 
    const MODEL = useContext_SCAN_FULL()
    
    const [ClientResources,setClientResources ] = useState([[]]) 
    const [ClientSites,setClientSites ] = useState([[]]) 
    const [ClientWorkOrders,setClientWorkOrders ] = useState([[]]) 
    

    const Client_Split_by_Resourcesssss=()=>{
        
        let Temp=[]
        let ChartData=[]
        MODEL.SelectedModel.STOREMARKERCENTERPOINTS.map((model,i)=>{
            //console.log(model)
            Object.keys(model.ClientGroupedBy).map(function(key, index) {
                model.ClientGroupedBy[key].map((c,ii)=>{
                    //console.log(c.Customer)

                    let Index = findIndex(Temp,{name:c.Customer})
                    if(Index === -1){ 
                        Temp.push({name:c.Customer})
                        Index = findIndex(Temp,{name:c.Customer})
                    }
                    
                    if(Temp[Index]['Ratio'] === undefined) { Temp[Index]['Ratio']=[]; }
                    if(Temp[Index].Ratio.indexOf(c.Ratio) === -1){ Temp[Index]['Ratio'].push(c.Ratio)}
                    
                })
            })
        })

        Temp.map((client,i)=>{ ChartData.push({name:client.name, value:client.Ratio.reduce((a, b) => a + b, 0)}) })

        return ChartData
    }



    useEffect(()=>{ 
        setClientResources(Client_Split_by_Resources())
        setClientSites(Client_Split_by_Site())
        setClientWorkOrders(Client_Split_by_WorkOrders())
        
    },[UX]) 
    
 
    return(
        <div className="resultCharts">
            <div>
                <ChartHeader Icon={Chart1.Icon} Header={Chart1.Header}  Copy={Chart1.Copy} Tip={Chart1.Tip} />
                
                <PieChart Data={ClientResources}/>
            </div>
            <div>
                <ChartHeader Icon={Chart2.Icon} Header={Chart2.Header}  Copy={Chart2.Copy} Tip={Chart2.Tip} />
                <PieChart Data={ClientSites}/>
            </div> 
            <div>
                <ChartHeader Icon={Chart3.Icon} Header={Chart3.Header}  Copy={Chart3.Copy} Tip={Chart3.Tip} />
                <PieChart Data={ClientWorkOrders}/>
            </div> 
        </div>
    )
}
export default Locations_Radial_Pie_Charts;