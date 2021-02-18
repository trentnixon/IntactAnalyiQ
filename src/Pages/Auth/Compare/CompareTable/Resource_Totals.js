import React, {useEffect, useState} from 'react'
import {useContext_COMPARE_FULL} from "Context/COMPARE";

import {OBJ_RESOURCES_GLOBAL, FindTotals, FindPercentageBewtweenTwoNumbers} from 'actions/CreateCompareModelView'
import { workingDaysBetweenDates} from "actions/HandleUX";
import {H2, H3} from "Pages/Auth/Components/Type"


const Resource_Totals = ()=>{
    const COMPARE = useContext_COMPARE_FULL();
    const [RAW, setRAW] = useState([])
    const [DAYS, setDAYS] = useState([])
    const [AVG, setAVG] = useState([])
   

    const SetNumbers = ()=>{
        let Store=[]
        let AVG=[]
        let Resourses = FindTotals(OBJ_RESOURCES_GLOBAL(),'Resources' )
        COMPARE.CompareData.UserSelected.map((int,i)=>{ Store.push(workingDaysBetweenDates(int.DateStart,int.DateEnd)) })
        Resourses.map((int,i)=>{ AVG.push((int/Store[i]).toFixed(2))})

        setRAW(Resourses)
        setDAYS(Store)
        setAVG(AVG)
    }

    useEffect(()=>{ SetNumbers() },[])

    useEffect(()=>{
        console.log(OBJ_RESOURCES_GLOBAL())
    },[COMPARE])

    return(
        <>
            <div className="ComparisonRow">

                <div className="ShowInt"> <H2 Copy={`Resources In Model`} /></div>
                    {
                            RAW.map((int,i)=>{
                                return(
                                    <div key={i} className="ShowInt">
                                        {int} {FindPercentageBewtweenTwoNumbers(RAW,i)}
                                    </div>
                                )
                            })
                    }


                <div className="ShowInt"> <H2 Copy={`Days In Model`} /></div>
                    {
                            DAYS.map((int,i)=>{
                                return(
                                    <div key={i} className="ShowInt">
                                        {int} {FindPercentageBewtweenTwoNumbers(DAYS,i)}
                                    </div>
                                )
                            })
                    }
                   
                <div className="ShowInt"> <H2 Copy={`AVG WO/Resource`} /></div>
                    {
                            AVG.map((int,i)=>{
                                return(
                                    <div key={i} className="ShowInt">
                                        {int} {FindPercentageBewtweenTwoNumbers(AVG,i)}
                                    </div>
                                )
                            })
                    }

                    <ResourceNumbers />
            </div>
        </>
    )
}
 
export default Resource_Totals;





const ResourceNumbers = ()=>{

    const [Resources, setResources] = useState([])
    const Calculate = ()=>{
        let stored={ }
        OBJ_RESOURCES_GLOBAL().map((model,i)=>{
            //stored.push()
            
            model.map((res,ii)=>{
                if(stored[res.name] === undefined){
                    stored[res.name]=[]
                }

                stored[res.name].push(res.Resources)
            })
        })
        console.log(stored)
        setResources(stored)
    }

    useEffect(()=>{ Calculate() },[])

    return(
        <>
            <div className="FullWidth">
                <H2 Copy={`By Resource Type`} />
            </div>
                 {
                        Object.keys(Resources).map((key,i)=>{
                            console.log(Resources[key])
                               return  (
                                   <>
                                        <div className="ShowInt"> <H2 Copy={key} /></div>
                                        <div className="ShowInt">{Resources[key][0].toFixed(2)}</div>
                                        <div className="ShowInt">{Resources[key][1].toFixed(2)} {FindPercentageBewtweenTwoNumbers(Resources[key],1)}</div>
                                    </>
                               )
                        })
                    }
        </>
    )
}