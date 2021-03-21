import React, { useEffect, useState } from 'react';
import {useContext_UX_FULL} from "Context/UX";
import { SetFilterColorSchemeType } from "actions/HandleUX";

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {find} from 'lodash'

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

const ByCapitalCities = ()=>{
    const UX = useContext_UX_FULL()
    const MarkerTypes=['Cluster', 'Resource']

    const classes = useStyles();
    const [Selected, setMarkerType] = useState(UX.AreaSelectFilter.ByColorScheme);
  
    const handleChange = (event) => { 
        SetFilterColorSchemeType(event.target.value); 
        setMarkerType(event.target.value)
    };
 

    return(
       <FormControl variant="outlined" className={`${classes.formControl} Map_Filters`}>
        <InputLabel id="MarkerType">Select Color Scheme</InputLabel>
             <Select
                labelId="Marker Type"
                id="MarkerType-outlined"
                value={Selected}
                onChange={handleChange}
                label="Select Marker Type"
                >
          <MenuItem value=""> <em>Select</em> </MenuItem>

          {
              MarkerTypes.map((marker,i)=>{
                  return(
                    <MenuItem key={i} value={marker}>{marker}</MenuItem>
                  )
              })
          }

        </Select>
        </FormControl>
    )
}

export default ByCapitalCities;