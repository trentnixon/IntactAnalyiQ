import React, { useEffect,useState } from 'react';
// Context
import {useContext_AUTH_FULL} from "Context/AUTH";
// Actions
import {StoreCompareItem} from "actions/HandleCompare"


import { makeStyles } from '@material-ui/core/styles';
import {useContext_COMPARE_FULL} from "Context/COMPARE";

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import {orderBy} from 'lodash'


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));



export default function CompareSelect(props) {

    const {pos} = props
    const AUTH = useContext_AUTH_FULL();
    const COMPARE = useContext_COMPARE_FULL()
    const classes = useStyles();
    const [Model, setModel] = useState(COMPARE.CompareData.UserSelected[pos]);
    const Term=['Baseline','Comparable']

    const handleChange = (event) => { 
        setModel(event.target.value); 
        StoreCompareItem(event.target.value, pos)
    };


   

    useEffect(()=>{
      console.log(COMPARE.CompareData.UserSelected)
      orderBy(AUTH.ScanHistory, ['IntClients'], ['asc', 'desc']);
    },[COMPARE])

  return ( 
    <>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">{Term[pos]}</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={Model}
          onChange={handleChange}
          label="Compare"
        >
          <MenuItem value="">
            <em>Select</em>
          </MenuItem>

          {
              orderBy(AUTH.ScanHistory, ['IntClients'], ['asc', 'desc']).map((scan,i)=>{
                return(
                  <MenuItem value={scan} key={i}>{scan.Name} ({scan.IntClients})</MenuItem>
                ) 
              })
          }

        </Select>
      </FormControl>
    </>
  );
}
