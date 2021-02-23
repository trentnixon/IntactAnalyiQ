import React, { useEffect, useState } from 'react';
import {useContext_UX_FULL} from "Context/UX";
import {useContext_SCAN_FULL} from "Context/SCAN";
import {SetFilterClient , FindClientList} from "actions/HandleUX";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import {findClientName} from "actions/ClusterAnalysis"

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

    const MODEL = useContext_SCAN_FULL()
    const UX = useContext_UX_FULL()
    
    const [type,setType] = useState(UX.AreaSelectFilter.ByClient) 
    const Clients = FindClientList()
    const classes = useStyles();


    const handleChange = (event) => { 
        //console.log(event.target.value)
        
        setType(event.target.value)
        SetFilterClient(event.target.value)
        //StoreCompareItem(event.target.value, pos)
    };

  
   

    useEffect(()=>{ 
        
        console.log(UX.AreaSelectFilter.ByClient)
        setType(UX.AreaSelectFilter.ByResourceType)
       
    },[UX])

  

    return(
        <FormControl variant="outlined" className={`${classes.formControl} Map_Filters`}>
        <InputLabel id="ByTier">Select Client</InputLabel>
             <Select
                labelId="ByTier"
                id="ByTier-outlined"
                value={type}
                onChange={handleChange}
                label="Select Client"
            >
                <MenuItem value={''}> <em>All</em> </MenuItem>

                {
                    Clients.map((client,i)=>{
                        return(
                            <MenuItem   key={i}  value={client}>{findClientName(client)}</MenuItem>
                        )
                    })
                }

            </Select>
        </FormControl>
    )
}

export default ByResourceType;