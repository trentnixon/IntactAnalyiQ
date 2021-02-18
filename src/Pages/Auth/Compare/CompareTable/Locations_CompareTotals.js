import React, {useEffect, useState} from 'react'
import {useContext_COMPARE_FULL} from "Context/COMPARE";
import {OBJ_CLUSTER_GLOBAL, FindPercentageBewtweenTwoNumbers} from 'actions/CreateCompareModelView'

import {H2} from "Pages/Auth/Components/Type"
const TableWorkOrders = ()=>{
    const COMPARE = useContext_COMPARE_FULL().CompareData.FetchedModels
    const [Locations, setLocations] = useState([])
    const [OOS, setOOS] = useState([])
    
    const LocationTotals=()=>{
        let Locs = []

            OBJ_CLUSTER_GLOBAL().map((model,i)=>{
               let collectSites=[]
                model.map((sites,ii)=>{ collectSites.push(sites.Sites.length) })
                Locs.push(collectSites.reduce((a, b) => a + b, 0))
            })

            setLocations(Locs)
    }

    const OOSTotals=()=>{
        let Locs = []
        COMPARE.map((oos,i)=>{ Locs.push(oos.STORERESIDUALMARKERS.length) })
        setOOS(Locs)
    }

    useEffect(()=>{ LocationTotals(); OOSTotals()},[])
    useEffect(()=>{
        console.log(COMPARE)
    },[COMPARE])
    return(
        <div className="ComparisonRow">
             <div className="ShowInt"> <H2 Copy={`Locations inScope`} /></div>
                {
                    Locations.map((locs,i)=>{
                        return(
                            <div key={i} className="ShowInt"> 
                                {locs} {FindPercentageBewtweenTwoNumbers(Locations,i)}
                            </div>
                        )
                    })
                }
 

                <div className="ShowInt"> <H2 Copy={`Locations Out of Scope`} /></div>
                {
                    OOS.map((locs,i)=>{
                        return(
                            <div key={i} className="ShowInt"> 
                                {locs} {FindPercentageBewtweenTwoNumbers(OOS,i)}
                            </div>
                        )
                    })
                }
                
        </div> 
    ) 
} 
  
export default TableWorkOrders;


