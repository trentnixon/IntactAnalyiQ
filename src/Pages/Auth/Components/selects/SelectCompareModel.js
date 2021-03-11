import React, { useEffect, useState } from 'react';
import {useContext_UX_FULL} from "Context/UX";
// Context
import {useContext_COMPARE_FULL} from "Context/COMPARE";

import {SetFilterModel} from "actions/HandleUX";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
//import{FetchSingleScanResult} from "actions/authUser"
import {SelectSingleScanResult} from "actions/HandleCompare";

import {find, findIndex} from 'lodash'

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  /* ************************************************** */
const ByComparabelModel = ()=>{

    const MODEL = useContext_COMPARE_FULL().CompareData
    const UX = useContext_UX_FULL()
    
    const [type,setType] = useState(UX.AreaSelectFilter.ByModel) 
    const [OPTIONS, setOPTIONS] = useState([])
    const classes = useStyles();



    const handleChange = (event) => { 
        //console.log(event.target.value)

        let SelectedIndex = findIndex(MODEL.UserSelected, function(o) { return o.Name == event.target.value; })
  


        SelectSingleScanResult(MODEL.UserSelected[SelectedIndex], MODEL.FetchedModels[SelectedIndex])
        SetFilterModel(event.target.value)
        setType(event.target.value) 
    };
 

    const CreateOptions=()=>{
        let options=[]
        MODEL.UserSelected.map((model,i)=>{ options.push(model.Name) })
        setOPTIONS(options)
    }
 
    useEffect(()=>{ setType(UX.AreaSelectFilter.ByModel) },[UX])

    useEffect(()=>{ 
        CreateOptions()
    },[])

  
    return(
        <FormControl variant="outlined" className={`${classes.formControl} Map_Filters`}>
        <InputLabel id="ByTier">Select Model</InputLabel>
             <Select
                labelId="ByTier"
                id="ByTier-outlined"
                value={type}
                onChange={handleChange}
                label="Select Client" 
            >
            
                {
                   OPTIONS.map((model,i)=>{
                        return(
                            <MenuItem  key={i}  value={model}>{model}</MenuItem>
                        )
                    })
                }
            </Select>
        </FormControl>
    )
}

export default ByComparabelModel;
/*
 findClientName()
*/