import React, { useEffect, useState } from 'react';
import {useContext_UX_FULL} from "Context/UX";
import {useContext_SCAN_FULL} from "Context/SCAN";
import { SetMapClusterType } from "actions/HandleUX";

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
const ByClusterType = ()=>{

    const SCAN = useContext_SCAN_FULL()
    const UX = useContext_UX_FULL()
    const ClusterType=['SameBuilding','CBD','InnerCity','Metro','OuterMetro','Regional','Remote','ExtremeRemote' ]
    const [type,setType] = useState(UX.AreaSelectFilter.ByClusterType)
    const classes = useStyles();


    const handleChange = (event) => { 
        //console.log(event.target.value.Center)
        
        setType(event.target.value)
        SetMapClusterType(event.target.value)
        //StoreCompareItem(event.target.value, pos)
    };


    useEffect(()=>{  },[SCAN])
    useEffect(()=>{ setType(UX.AreaSelectFilter.ByClusterType)},[UX])

 
    return(
        <FormControl variant="outlined" className={`${classes.formControl} Map_Filters`}>
        <InputLabel id="ByTier">Cluster Type</InputLabel>
             <Select
                labelId="ByTier"
                id="ByTier-outlined"
                value={type}
                onChange={handleChange}
                label="Select Cluster Type"
                >
                <MenuItem value={null}> <em>All</em> </MenuItem>

                {
                    ClusterType.map((city,i)=>{
                        return(
                            <MenuItem key={city}  value={city}>{city}</MenuItem>
                        )
                    })
                }

            </Select>
        </FormControl>
    )
}

export default ByClusterType;