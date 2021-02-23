import React from 'react';
// Context
import {useContext_AUTH_FULL} from "Context/AUTH";
// Actions
import {StoreCompareItem} from "actions/HandleCompare"


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

export default function CompareSelect(props) {

    const {pos} = props
    const AUTH = useContext_AUTH_FULL();

    const classes = useStyles();
    const [Model, setModel] = React.useState('');

    const handleChange = (event) => { 
        setModel(event.target.value); 
        StoreCompareItem(event.target.value, pos)
    };

  return ( 
    <>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Model</InputLabel>
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
              AUTH.ScanHistory.map((scan,i)=>{
                  return(
                    <MenuItem value={scan} key={i}>{scan.Name}</MenuItem>
                  )
              })
          }

        </Select>
      </FormControl>
    </>
  );
}
