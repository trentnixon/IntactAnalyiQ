import React, {useEffect, useState} from 'react'
import {useContext_SCAN_FULL} from "Context/SCAN";
import {GroupArrayByOccurances} from "actions/HandleUX";
import {findClientName} from "actions/ClusterAnalysis";
// Chart
import PieChart from "venders/apexCharts/SimplePie";
import RadialMultiChart from "venders/apexCharts/RadialMultiChart";


import {H3, P} from "Pages/Auth/Components/Type";

import {find, findIndex} from 'lodash'; 

const HeaderLocations=()=>{

    const SCAN = useContext_SCAN_FULL();
    const MODEL = SCAN.SelectedModel
    const [CategoryOccurance,setCategoryOccurance ] = useState([[]]) 

    const gl=(data)=>{
        return data.length
    }

    const extractResults=()=>{
        let CategoryInt=[]
           
        SCAN.SelectedModel.STOREMARKERCENTERPOINTS.map((result,i)=>{
                CategoryInt.push(result.scanCategory)
                return true
            })

        let Data=[] 
        let ClientSpread=[]
            //console.log(GroupArrayByOccurances(CategoryInt));
            let RegionArray=GroupArrayByOccurances(CategoryInt);
           
           
            RegionArray[0].map((cat,i)=>{
              
                Data.push({ name: cat, value: RegionArray[1][i] })
                let ClientPush=[]


                SCAN.SelectedModel.STOREMARKERCENTERPOINTS.map((CP,i)=>{
                        if(CP.scanCategory === cat)
                        {
                            
                            // Check to see if Name exists
                            let TierID = findIndex(ClientSpread, function(o) { return o.name === cat; })
                            if(TierID === -1){ ClientSpread.push({name:cat}); }
                            TierID = findIndex(ClientSpread, function(o) { return o.name === cat; })
                        

                            
                           //console.log(ClientSpread[TierID], TierID, ClientSpread)
                            CP.sites.map((client,i)=>{
                                client.customers.map((name,i)=>{
                                    if(ClientSpread[TierID][findClientName(name)] === undefined){
                                        ClientSpread[TierID][findClientName(name)] = 1
                                    }else{
                                        ClientSpread[TierID][findClientName(name)] = ClientSpread[TierID][findClientName(name)]+1
                                    }
                                    //console.log()
                                    //console.log(findClientName(name))
                                })
                            })
                        }
                       
                })
            });

            //console.log(ClientSpread)

        setCategoryOccurance(ClientSpread)
    }

    const inScope=()=>{
        return gl(MODEL.USERSELECTEDLIST)-gl(MODEL.STORERESIDUALMARKERS)
    }
    useEffect(()=>{extractResults()},[SCAN])
    return(
        <> 
            <H3 Copy={`Cluster Spread by Client`} />
            <div className="resultCharts">
                <div>
                    <RadialMultiChart Data={CategoryOccurance} term={`Clusters`}/>
                </div>
               
            </div>
        </>
    )
}
//<PieChart Data={CategoryOccurance}/>
export default HeaderLocations;