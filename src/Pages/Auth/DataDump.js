import React, {useEffect, useState} from 'react'
import {useContext_UX_FULL} from "../../Context/UX";
import {useContext_STRAPI_FULL} from "../../Context/STRAPI";
import { Label } from '@material-ui/icons';
import {FetchDataIntegrity} from "../../actions/authUser";

const Prototype = ()=>{
     const STRAPI = useContext_STRAPI_FULL();
     const UX = useContext_UX_FULL();

     useEffect(()=>{
         console.log(STRAPI)
     },[STRAPI])

     useEffect(()=>{
        FetchDataIntegrity()
     },[])
  
    return(
        <>
               <IntroText />
               { 
               STRAPI.UserData.Customers ? <DisplayData Data={STRAPI.UserData.Customers} Label="by Customer"/>:false
               }
                { 
               STRAPI.sites ? <DisplayData Data={STRAPI.sites} Label="by site"/>:false
               }
               
               
               
        </>
    )
}

export default Prototype 

// 


const IntroText = ()=>{
    return(
            <div className="DataCollection ">
                <div className="Copy">
                    <h1>Intact AnaltyiQ Prototype</h1>
                    <p>The following is a list of Parent Data collections pulled from strapi</p>
                    <p>This data is spread is just for Admins to check the Datas integrity.</p>
                </div>
      </div>
    )
}

 
const DisplayData = (props)=>{
    
    const {Data, Label} = props
    
    useEffect(()=>{  console.log(Data) },[Data])
  
    return(
      <div className="DataCollection">
         <h3>{Label}</h3>  
        <div className="FlexTable">
            <div className="FlexTableRow head">
                <div>Name </div>
                <div>Work Orders</div>
              
            </div>
                {  
                Data.map((state,i)=>{
     
                    return(
                        <div key={i} className="FlexTableRow">
                            <div>{state.name}</div>  
                            <div>{state.count}</div>
                        </div> 
                        )
                }) } 
        </div>
      </div>
    )
  }