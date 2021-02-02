import React, {useEffect, useState} from 'react'
import {useContext_SCAN_FULL} from "Context/SCAN";
import {GroupArrayByOccurances} from "actions/HandleUX";
// Chart
import PieChart from "../../../../venders/apexCharts/SimplePie";

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
            console.log(GroupArrayByOccurances(CategoryInt));
            let RegionArray=GroupArrayByOccurances(CategoryInt);
            RegionArray[0].map((cat,i)=>{
              
                Data.push({ name: cat, value: RegionArray[1][i] })
               
            });

        setCategoryOccurance(Data)
    }

    const inScope=()=>{
        return gl(MODEL.USERSELECTEDLIST)-gl(MODEL.STORERESIDUALMARKERS)
    }

    useEffect(()=>{ console.log(MODEL)  },[]) 
    useEffect(()=>{extractResults()},[SCAN])

    return(
        <> 
            <div className="resultCharts">
                <div>
                    <PieChart Data={CategoryOccurance}/>
                </div>
                 <div>
                    <PieChart Data={[{ name: 'InScope', value: inScope() }, { name: 'Out of Scope', value: gl(MODEL.STORERESIDUALMARKERS) }]}/>
                </div>
               
            </div>
        </>
    )
}
export default HeaderLocations;