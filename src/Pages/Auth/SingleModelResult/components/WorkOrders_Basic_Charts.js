import React, {useEffect, useState} from 'react'
import {useContext_SCAN_FULL} from "Context/SCAN";
import {findClientName} from "actions/ClusterAnalysis";
// Chart
import PieChart from "venders/apexCharts/SimplePie";


const HeaderLocations=()=>{

    const SCAN = useContext_SCAN_FULL();
    const MODEL = SCAN.SelectedModel
    const [byClient, setByClient] = useState([])

    const TotalWorkOrders=(Data)=>{
        let TotalWOs=[]
        Data.map((site,i)=>{
            if(site.SumWorkOrder !== undefined) 
                TotalWOs.push(site.SumWorkOrder)
        })
        return TotalWOs.reduce((a, b) => a + b, 0)
    }

    const WOsCoveredInModel = ()=>{
        let ModelTotal=[];
        MODEL.STOREMARKERCENTERPOINTS.map((site)=>{
                ModelTotal.push(TotalWorkOrders(site.sites))
            })
        return ModelTotal.reduce((a, b) => a + b, 0)
    }

    const ByClient=()=>{
        let client=[];
        let SumByClient
        MODEL.STOREMARKERCENTERPOINTS.map((sites,i)=>{
            sites.sites.map((site,i)=>{
                client.push({
                    sum:site.SumWorkOrder,
                    client:site.customers[0]
                })
            })
        })
      
        SumByClient = client.reduce(function (r, o) { (r[o.client])? r[o.client] += o.sum : r[o.client] = o.sum; return r; }, {});
        let Data=[]
       console.log(SumByClient)
       Object.keys(SumByClient).map(function(key, i) {
        Data.push({ name: findClientName(key), value: SumByClient[key] })
       
        }) 
      
        console.log(Data);
        setByClient(Data)
    }

    useEffect(()=>{ console.log(MODEL)  },[]) 
    useEffect(()=>{ByClient()},[MODEL])

    return(
        <> 
            <div className="resultCharts">
                <div>
                    <PieChart Data={[{ name: 'Work orders Covered', value: WOsCoveredInModel() },{ name: 'Work Orders Not Included', value: (TotalWorkOrders(MODEL.USERSELECTEDLIST)-WOsCoveredInModel()) }]}/>
                </div>
                <div>
                    <PieChart Data={byClient}/>
                </div>
            </div>
        </>
    )
}
export default HeaderLocations;
//