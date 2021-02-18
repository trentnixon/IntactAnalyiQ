import React, {useEffect, useState} from 'react'
import {useContext_COMPARE_FULL} from "Context/COMPARE";
import {OBJ_RESOURCES_GLOBAL, FindTotals, FindPercentageBewtweenTwoNumbers, WorkorderTotals} from 'actions/CreateCompareModelView'
import {H2} from "Pages/Auth/Components/Type"

const WorkOrderComparison = ()=>{
    const COMPARE = useContext_COMPARE_FULL();
    const MODELS = COMPARE.CompareData.FetchedModels;

    const [InModel, setInModel] = useState([])
    const [Total, setTotal] = useState([])
    const [OutofScope, setOutofScope] = useState([])

    const Calculate = ()=>{
        let StoreInModel=[]
        let StoreTotal=[]
        let StoreOOS=[]
        MODELS.map((model,i)=>{
            StoreTotal.push(WorkorderTotals(model.STOREMARKERCENTERPOINTS,model.STORERESIDUALMARKERS).reduce((a, b) => a + b, 0))
            StoreInModel.push(WorkorderTotals(model.STOREMARKERCENTERPOINTS,model.STORERESIDUALMARKERS)[0])
            StoreOOS.push(WorkorderTotals(model.STOREMARKERCENTERPOINTS,model.STORERESIDUALMARKERS)[1])
        })

        setTotal(StoreTotal)
        setInModel(StoreInModel)
        setOutofScope(StoreOOS)
    }


    useEffect(()=>{
        Calculate()
        console.log(MODELS)
       // console.log(WorkorderTotals(MODELS[0].STOREMARKERCENTERPOINTS,MODELS[0].STORERESIDUALMARKERS))
     },[COMPARE])

    const [RAW, setRAW] = useState([])

    useEffect(()=>{  setRAW(FindTotals(OBJ_RESOURCES_GLOBAL(),'Work Orders' )) },[])

    return(
        <div className="ComparisonRow">
            <div className="ShowInt"> <H2 Copy={`Work Order covered in Model`} /></div>
                {
                    InModel.map((int,i)=>{
                        return(
                            <div key={i} className="ShowInt">
                                {int}  {FindPercentageBewtweenTwoNumbers(InModel,i)}
                            </div>
                        )
                    })
                }
            <div className="ShowInt"> <H2 Copy={`Work Order Out of Scope`} /></div>
         
                {
                    OutofScope.map((int,i)=>{
                        return(
                            <div key={i} className="ShowInt">
                                {int}  {FindPercentageBewtweenTwoNumbers(OutofScope,i)}
                            </div>
                        )
                    })
                }

            <div className="ShowInt"> <H2 Copy={`Total Work Orders`} /></div>
            
                {
                    Total.map((int,i)=>{
                        return(
                            <div key={i} className="ShowInt">
                                {int}  {FindPercentageBewtweenTwoNumbers(Total,i)}
                            </div>
                        )
                    })
                }
    
                <WorkOrderNumbers />
            </div>
    )
}  
export default WorkOrderComparison;


const WorkOrderNumbers = ()=>{

    const [Workorders, setWorkorders] = useState([])
    const Calculate = ()=>{
        let stored={ }
        OBJ_RESOURCES_GLOBAL().map((model,i)=>{
            //stored.push()
            
            model.map((res,ii)=>{
                if(stored[res.name] === undefined){
                    stored[res.name]=[]
                }
              
                stored[res.name].push(res['Work Orders'])
            })
        })
        setWorkorders(stored)
    }

    useEffect(()=>{ Calculate() },[])

    return(
        <>
            <div className="FullWidth">
                <H2 Copy={`By Resource Type`} />
            </div>
        
                 {
                        Object.keys(Workorders).map((key,i)=>{
                           
                               return  (
                                   <>
                                        <div className="ShowInt"> <H2 Copy={key} /></div>
                                        <div className="ShowInt">{Workorders[key][0].toFixed(2)}</div>
                                        <div className="ShowInt">{Workorders[key][1].toFixed(2)} {FindPercentageBewtweenTwoNumbers(Workorders[key],1)}</div>
                                    </>
                               )
                        })
                    }
        </>
    )
}