import React, {useEffect, useState} from 'react'
import {useContext_SCAN_FULL} from "Context/SCAN";
import {GroupArrayByOccurances} from "actions/HandleUX";
// Chart
import PieChart from "venders/apexCharts/SimplePie";
import RadialSIngleChart from "venders/apexCharts/RadialSIngleChart";

import {H3, P} from "Pages/Auth/Components/Type";

import {uniqBy} from 'lodash'; 

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
/* data = [
  {
    subject: 'Math', A: 120, B: 110, fullMark: 150,
  },
  {
    subject: 'Chinese', A: 98, B: 130, fullMark: 150,
  },
  {
    subject: 'English', A: 86, B: 130, fullMark: 150,
  },
  {
    subject: 'Geography', A: 99, B: 100, fullMark: 150,
  },
  {
    subject: 'Physics', A: 85, B: 90, fullMark: 150,
  },
  {
    subject: 'History', A: 65, B: 85, fullMark: 150,
  },
];
*/
        let Data=[] 
        let ClientSpread=[]
            console.log(GroupArrayByOccurances(CategoryInt));
            let RegionArray=GroupArrayByOccurances(CategoryInt);
           
           
            RegionArray[0].map((cat,i)=>{
              
                Data.push({ name: cat, value: RegionArray[1][i] })
                let ClientPush=[]


                SCAN.SelectedModel.STOREMARKERCENTERPOINTS.map((CP,i)=>{
                        if(CP.scanCategory === cat)
                        {
                            CP.sites.map((client,i)=>{
                                //ClientPush.push(client.customers)
                                ClientPush= [...ClientPush, ...client.customers]
                            })
                        }
                        console.log(cat, GroupArrayByOccurances(ClientPush))
                })
            });

        console.log(RegionArray);

        setCategoryOccurance(Data)
    }

    const inScope=()=>{
        return gl(MODEL.USERSELECTEDLIST)-gl(MODEL.STORERESIDUALMARKERS)
    }

    useEffect(()=>{ console.log(MODEL)  },[]) 
    useEffect(()=>{extractResults()},[SCAN])

    return(
        <> 
            <H3 Copy={`Cluster Spread by Client`} />
            <div className="resultCharts">
                <div>
                    <RadialSIngleChart Data={CategoryOccurance} term={`Clusters`}/>
                </div>
               
            </div>
        </>
    )
}
//<PieChart Data={CategoryOccurance}/>
export default HeaderLocations;