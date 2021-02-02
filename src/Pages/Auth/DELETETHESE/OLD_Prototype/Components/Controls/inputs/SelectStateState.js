import React, {useEffect, useState} from 'react'

// Context
import {useContext_STRAPI_States} from "Context/STRAPI";
import {useContext_UX_FULL} from "Context/UX";

// actions
import {AreaFilter} from "actions/HandleUX";

// UI 3rd Party
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {  orderBy} from 'lodash'; 
const  MaterialUISelectState = () =>{

    const UX = useContext_UX_FULL();
    const STATES= useContext_STRAPI_States();

    //const {STRAPI, Filters, onHandle} = props
    const classes = useStyles();
  
    const [Value, setValue] = useState(UX.AreaSelectFilter.state);
    const [Disabled, setDisabled] = useState(false)
    const [open, setOpen] = useState(false);
    const [Label, setLabel]= useState('Select State')
  
  
    const handleChange = (event) => {
        AreaFilter('AREAFILTERSTATE', event.target.value)
        setValue(event.target.value)
    };
  
    const handleClose = () => { setOpen(false); };
    const handleOpen = () => { setOpen(true); };
   
    useEffect(()=>{},[Value]);
    useEffect(()=>{ console.log(STATES)},[])
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
                
              orderBy(STATES, ['name'], ['asc', 'desc']).map((item, i)=>{
                    return(<MenuItem key={i} value={item} >{item.name} ({item.count[0].WorkOrders})</MenuItem>)
                  })
                }
          </Select>
        </FormControl>
      </div>
    );
  }

  export default MaterialUISelectState;



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