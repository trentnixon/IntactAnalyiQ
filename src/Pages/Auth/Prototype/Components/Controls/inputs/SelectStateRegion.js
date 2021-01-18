import React, {useEffect, useState} from 'react'

// Context
import {useContext_STRAPI_Regions} from "../../../../../../Context/STRAPI";
import {useContext_UX_FULL} from "../../../../../../Context/UX";

// actions
import {AreaFilter, SelectedRegion} from "../../../../../../actions/HandleUX";

// UI 3rd Party
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { find, orderBy} from 'lodash'; 


/*  SWITCH ***************** */
const SwitchOnSelect = ()=>{
    const UX = useContext_UX_FULL();
  
    const [Show, setShow]= useState(false);

    useEffect(()=>{
        UX.AreaSelectFilter.state === null ? setShow(false):setShow(true)
    },[UX.AreaSelectFilter.state])

    if(Show) return( <MaterialUISelectRegion />) 
   
    return( <div> <p>Awaiting Regions.</p> </div>)    
}

export default SwitchOnSelect;


/* SELECT ********** */

const  MaterialUISelectRegion = () =>{

    const UX = useContext_UX_FULL();
    const Regions = useContext_STRAPI_Regions();
    const classes = useStyles();
  
    const [Value, setValue] = useState(UX.AreaSelectFilter.region);
    const [Disabled, setDisabled] = useState(false)
    const [open, setOpen] = useState(false);
    const [Label, setLabel]= useState('Select Regions')
  
  
    const handleChange = (event) => {
      
        let FindRegion = find(Regions, function(o) { return o.id === event.target.value.id; });
        AreaFilter('AREAFILTERREGION', event.target.value);
        
        setValue(event.target.value);
        SelectedRegion([FindRegion])
    };
  
    const handleClose = () => { setOpen(false); };
    const handleOpen = () => { setOpen(true); };
   
    useEffect(()=>{},[UX.AreaSelectFilter.state])
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
                
                orderBy(UX.AreaSelectFilter.state.regions, ['name'], ['asc', 'desc']).map((item, i)=>{
                    return(<MenuItem key={i} value={item} >{item.name} </MenuItem>)
                  })
                }
          </Select>
        </FormControl>
      </div>
    );
  }

//({item.count[0].WorkOrders})



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