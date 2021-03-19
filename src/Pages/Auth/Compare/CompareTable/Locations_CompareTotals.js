import React, {useEffect, useState} from 'react'
import {useContext_COMPARE_FULL} from "Context/COMPARE";
import {useContext_UX_FULL} from "Context/UX";
import {OBJ_CLUSTER_GLOBAL, FindPercentageBewtweenTwoNumbers} from 'actions/CreateCompareModelView'

import {H2} from "Pages/Auth/Components/Type"
const TableWorkOrders = ()=>{
    const COMPARE = useContext_COMPARE_FULL().CompareData.FetchedModels
    const UX = useContext_UX_FULL()
    const [Locations, setLocations] = useState([[],[],[],[]])
    const [OOS, setOOS] = useState([])
    
    const LocationTotals=()=>{
        let TotalLocs = [],InScopeLocs = [], PartialLocs = [], OOSLocs = []

        COMPARE.map((model,i)=>{
            console.log(model.SITESINPARCITALSCOPE+model.SITESINSCOPE+model.SITESOUTOFSCOPE);
            TotalLocs.push(model.SITESINPARCITALSCOPE+model.SITESINSCOPE+model.SITESOUTOFSCOPE)
            InScopeLocs.push(model.SITESINSCOPE)
            PartialLocs.push(model.SITESINPARCITALSCOPE)
            OOSLocs.push(model.SITESOUTOFSCOPE)
        })

            OBJ_CLUSTER_GLOBAL().map((model,i)=>{
               let collectSites=[]
               console.log(COMPARE)
                model.map((sites,ii)=>{ 
                    if(sites.Sites != undefined){  collectSites.push(sites.Sites.length)  }
                })
               // Locs.push(collectSites.reduce((a, b) => a + b, 0))
            })

            setLocations([TotalLocs,InScopeLocs,PartialLocs,OOSLocs])
    }

    const OOSTotals=()=>{
        let Locs = []
        COMPARE.map((oos,i)=>{ Locs.push(oos.STORERESIDUALMARKERS.length) })
        setOOS(Locs)
    }

    useEffect(()=>{ LocationTotals(); OOSTotals()},[UX])
    useEffect(()=>{
        console.log(Locations)
    },[COMPARE,Locations]);

    return(
        <div className="ComparisonRow">
             <div className="ShowInt"> <H2 Copy={`Total Site Number`} /></div>
                {
                    Locations[0].map((locs,i)=>{
                        return(
                            <div key={i} className="ShowInt"> 
                                {locs} {FindPercentageBewtweenTwoNumbers(Locations[0],i)}
                            </div>
                        )
                    })
                }
             <div className="ShowInt"> <H2 Copy={`Locations inScope`} /></div>
                {
                    Locations[1].map((locs,i)=>{
                        return(
                            <div key={i} className="ShowInt"> 
                                {locs} {FindPercentageBewtweenTwoNumbers(Locations[1],i)}
                            </div>
                        )
                    })
                }
 
            <div className="ShowInt"> <H2 Copy={`Locations Partial Scope`} /></div>
                {
                    Locations[2].map((locs,i)=>{
                        return(
                            <div key={i} className="ShowInt"> 
                                {locs} {FindPercentageBewtweenTwoNumbers(Locations[2],i)}
                            </div>
                        )
                    })
                }

                <div className="ShowInt"> <H2 Copy={`Locations Out of Scope`} /></div>
                {
                    Locations[3].map((locs,i)=>{
                        return(
                            <div key={i} className="ShowInt"> 
                                {locs} {FindPercentageBewtweenTwoNumbers(Locations[3],i)}
                            </div>
                        )
                    })
                }
                
        </div> 
    ) 
} 
  
export default TableWorkOrders;


