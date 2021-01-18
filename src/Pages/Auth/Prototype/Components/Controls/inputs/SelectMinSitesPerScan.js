import React, {useEffect, useState} from 'react'

// Context
import {useContext_SCAN_FULL} from "../../../../../../Context/SCAN";
// actions
import {HandleFilterChange} from "../../../../../../actions/HandleUX";

// UI 3rd Party
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const  MaterialUISelectCountry = () =>{

    const SCAN= useContext_SCAN_FULL();

    const classes = useStyles();
    const [Value, setValue] = useState(SCAN.LocationFilter.minSites);
    const [Label, setLabel]= useState('Min Sites')
    const [Disabled, setDisabled] = useState(false)
    const [open, setOpen] = useState(false);
  
    const Radui=[1,2,5,10,20,30,40,50]

    const handleChange = (event) => {
        HandleFilterChange('CHANGEMINSITES', event.target.value)
        setValue(event.target.value)
    };
  
    const handleClose = () => { setOpen(false); };
    const handleOpen = () => { setOpen(true); };
   
  useEffect(()=>{},[Value]);
 
    return (
      <div>
       
        <FormControl className={classes.formControl}>
          <InputLabel id="demo">{Label}</InputLabel>
          <Select
            labelId="demo"
            id="demo"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={Value}
            onChange={handleChange}
            disabled={Disabled}
          >
              {
                      Radui.map((item, i)=>{
                          return(
                              <MenuItem key={i} value={item} >{item} </MenuItem>
                             
                          )
                      })
                  }
          </Select>
        </FormControl>
      </div>
    );
  }

  export default MaterialUISelectCountry;



  const useStyles = makeStyles((theme) => ({
    button: {
      display: 'block',
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));