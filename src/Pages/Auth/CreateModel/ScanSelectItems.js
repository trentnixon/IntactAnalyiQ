import React, { useEffect, useState } from 'react'
import {useContext_STRAPI_FULL} from "Context/STRAPI";
import {useContext_SCAN_FULL} from "Context/SCAN";
import { orderBy,findIndex,  remove} from 'lodash'; 
import ReviewSelectionBtn from "../Components/buttons/SetSelectedBtn";
import {StoreSelected_Single} from "actions/HandleScanProcess";
import BtnBacktoScanOptions from "../Components/buttons/BacktoScanType";

import Select_FilterClients from "Pages/Auth/Components/selects/Select_CreateModelFilter";

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
const ScanSelectItems=()=>{
   
    const STRAPI = useContext_STRAPI_FULL();
    const SCAN = useContext_SCAN_FULL();
    const USERSCAN = SCAN.UserScanState;
    const [nonSelected, setNonselected] = useState([])
    const [Selected, setSelected] = useState([])
    const [filter, setFilter] =  useState(null)

    const handleAdd=(customer)=>{
    
        let Index= findIndex(Selected, function(o) { return o.id === customer.id; });
        if(Index === -1){
            let NewSelected = [...Selected, customer]; 
            setSelected(NewSelected)
        }
       
        let RemoveSelected = remove(nonSelected, function(o) {return o.id != customer.id;});
        setNonselected(RemoveSelected)
        
    } 

    const handleRemove=(customer)=>{

        let Index= findIndex(nonSelected, function(o) { return o.id === customer.id; });
        if(Index === -1){
            let NewSelected = [...nonSelected, customer];
            setNonselected(NewSelected)
        }
        let RemoveSelected = remove( Selected, function(o) {return o.id != customer.id;});
        setSelected(RemoveSelected);
      
    }

    useEffect(()=>{
        setNonselected(JSON.parse(JSON.stringify(STRAPI.UserData.Customers)));
     
        setSelected(USERSCAN.UserScanSingleDataSets)
      
    },[USERSCAN.ScanOptionSelected])

    useEffect(()=>{
        StoreSelected_Single(Selected)
    },[Selected,nonSelected])

    useEffect(()=>{
        if(filter != null){
            const results = JSON.parse(JSON.stringify(STRAPI.UserData.Customers)).filter( h => h.name.toLowerCase().includes(filter.toLowerCase()) );
            setNonselected(results);
        }
      
    },[filter])
    return(
        <>
            <div className="InnerFrame">
                <h2>Select Clients for Model</h2>
                <p>Loremipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <p>Loremipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

                <Select_FilterClients setFilter={setFilter}/>

                <div className="Dataset_Selection">
                    <div>
                        <ul>
                            {
                                
                                orderBy(nonSelected, ['name'], ['asc']).map((customer,i)=>{
                                    return(
                                        <li key={i} >
                                            {customer.name}
                                            <IconButton aria-label="add" onClick={()=>{handleAdd(customer)}}>
                                            <AddCircleIcon />
                                                
                                            </IconButton>
                                            
                                        </li>
                                    )
                                })
                            }
                      </ul>
                    </div>
                    <div>
                        <ul>
                            {
                                orderBy(Selected, ['name'], ['asc']).map((customer,i)=>{
                                    return(
                                        <li key={i} >
                                            {customer.name}
                                            <IconButton aria-label="delete"onClick={()=>{handleRemove(customer)}}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </li>
                                    )
                                })
                            }
                    </ul>
                    </div>
                </div>
            </div>

            <div className="SideBarRight">
                <div className="ControlBar">
                    <ReviewSelectionBtn />
                    <BtnBacktoScanOptions />
                </div>
            </div>
        </>
    )
}

export default ScanSelectItems;
