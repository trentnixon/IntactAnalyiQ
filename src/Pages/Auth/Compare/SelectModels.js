import React, {useEffect, useState} from 'react'
import {useContext_COMPARE_FULL} from "../../../Context/COMPARE";


import SelectCompare from "../Components/selects/SelectCompare"
import ConfirmCompareBtn from "../Components/buttons/ConfirmCompareBtn";

 const CompareModels=()=>{

    const COMPARE = useContext_COMPARE_FULL();
    // useContext_COMPARE_FULL
    const [ModelLimit, setLimit] = useState(2)
    const [ModelsSelected, setModelsSelected] = useState(2)
    const [ModelSelects, setModelSelects] = useState([])

    const CreateSelects = ()=>{
        let i=0
        let temp=[]
        while(i<ModelLimit){
            
            temp.push(<SelectCompare pos={i}/>)
            i++;
        }
        setModelSelects(temp)
    }
    useEffect(()=>{
        CreateSelects()
    },[ModelsSelected])

    useEffect(()=>{ console.log(COMPARE) },[COMPARE])
    return(
        <>
            <div className="SectionHeaderWithControls">
            <h1>Compare Models</h1>
                <div className="controls">
                {ModelSelects }
                    <ConfirmCompareBtn />
                </div>
            </div>
            <div>
                <div className="ComparedSelectedItems">

                <ul className="ComparableItem">
                                        <li>Model Name</li>
                                        <li>Clients</li>
                                        <li>Clusters</li>
                                        <li>Sites</li>
                                     
                                        <li>Description</li>
                                </ul>   


                    {
                        COMPARE.CompareData.UserSelected.map((model,i)=>{
                            return(
                                <ul key={i} className="ComparableItem">
                                        <li>{model.Name}</li>
                                        <li>{model.IntClients}</li>
                                        <li>{model.IntCluster}</li>
                                        <li>{model.IntSites}</li>
                                        
                                        <li>{model.Description}</li>
                                </ul>    
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default CompareModels