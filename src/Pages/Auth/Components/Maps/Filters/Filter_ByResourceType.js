import React, { useEffect, useState } from 'react';
import {useContext_UX_FULL} from "Context/UX";
import {useContext_SCAN_FULL} from "Context/SCAN";
import { setMainMapLocation, SetMapClusterType,SetMapResourceType } from "actions/HandleUX";

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
const ByResourceType = ()=>{

    const SCAN = useContext_SCAN_FULL()
    const UX = useContext_UX_FULL()
    const ResourceType=["HandyMan","Electrician","Plumber","Specialized"]
    const [type,setType] = useState(UX.AreaSelectFilter.ByResourceType)
    const classes = useStyles();


    const handleChange = (event) => { 
        //console.log(event.target.value)
        
        setType(event.target.value)
        SetMapResourceType(event.target.value)
        //StoreCompareItem(event.target.value, pos)
    };


  
    useEffect(()=>{ setType(UX.AreaSelectFilter.ByResourceType)},[UX])

    return(
        <FormControl variant="outlined" className={`${classes.formControl} Map_Filters`}>
        <InputLabel id="ByTier">Resource Type</InputLabel>
             <Select
                labelId="ByTier"
                id="ByTier-outlined"
                value={type}
                onChange={handleChange}
                label="Select Resource Type"
                >
                <MenuItem value={false}>ALL</MenuItem>

                {
                    ResourceType.map((Resource,i)=>{
                        return(
                            <MenuItem key={Resource}  value={Resource}>{Resource}</MenuItem>
                        )
                    })
                }

            </Select>
        </FormControl>
    )
}

export default ByResourceType;