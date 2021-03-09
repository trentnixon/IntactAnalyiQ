import React, {useEffect, useState} from 'react'
import {useContext_COMPARE_FULL} from "Context/COMPARE";

import BorderColorIcon from '@material-ui/icons/BorderColor';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import StarRateIcon from '@material-ui/icons/StarRate';


import SelectCompare from "../Components/selects/SelectCompare"
import ConfirmCompareBtn from "../Components/buttons/ConfirmCompareBtn";

 const CompareModels=()=>{

    const COMPARE = useContext_COMPARE_FULL();
    // useContext_COMPARE_FULL
    const [ModelLimit, setLimit] = useState(2)
    const [ModelsSelected, setModelsSelected] = useState(2)
    const [ModelSelects, setModelSelects] = useState([])
    const [Warning, setWarning] = useState(null)


    

    const CreateSelects = ()=>{
        let i=0
        let temp=[]
        while(i<ModelLimit){
            
            temp.push(<SelectCompare pos={i}/>)
            i++;
        } 
        setModelSelects(temp)
    }


    const ValidCompare=()=>{
        let obj=true
        
            if( COMPARE.CompareData.UserSelected[0] === COMPARE.CompareData.UserSelected[1]){
                obj=false;
            }

            COMPARE.CompareData.UserSelected.map((check,i)=>{
                if(typeof check !== 'object')
                    obj=false
            })
    
        return obj
    }

    useEffect(()=>{  CreateSelects() },[ModelsSelected])
    useEffect(()=>{  console.log(COMPARE.CompareData.UserSelected.length) },[COMPARE])


    return(
        <div className="OuterContainer">
            
            <div className="InnerFrame">
                <div className="SectionHeaderWithControls">
                    <h2>Compare Models</h2>
                    <ModelList />
                  
                    {
                         ValidCompare() ? <ConfirmCompareBtn /> :  false
                    }

                    <p>{Warning}</p> 
                </div>
            </div>

            <div className="SideBarRight">
                <div className="controls">
                    <div className="SelectComparables">
                        <h3>Select comparable models</h3>
                        {ModelSelects}
                    </div>
                </div>
            </div>    
        
        </div>
    )
}

export default CompareModels


const ModelList = ()=>{
    const COMPARE = useContext_COMPARE_FULL();
    const icons=[<StarRateIcon />,<CompareArrowsIcon />]
    return(
        <div className="ComparedSelectedItems">

                        <ul className="ComparableItem">
                            <li></li>
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
                                            <li>{icons[i]}</li>
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
    )
}