import React, { useEffect, useState } from 'react';
import {useContext_UX_FULL} from "Context/UX";
import { setMainMapLocation } from "actions/HandleUX";

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
    const CapitalCities=[
        {
            Name:'Sydney',
            Zoom:10,
            Center: { lat:   -33.868820, lng: 151.209290}
        },
        {
            Name:'Melbourne',
            Zoom:8,
            Center: { lat:   -37.813629, lng: 144.963058}
        },
        {
            Name:'Brisbane',
            Zoom:10,
            Center: { lat:-27.4678, lng:153.0281}
        },
        {
            Name:'Perth',
            Zoom:10,
            Center: { lat:-31.9522, lng:115.8589}
        },
        {
            Name:'Adelaide',
            Zoom:10,
            Center: { lat:-34.9289, lng:138.6011}
        },
        {
            Name:'Canberra',
            Zoom:13,
            Center: { lat:-35.2931, lng:149.1269}
        },
        {
            Name:'Gold Coast',
            Zoom:10,
            Center: { lat:-28.0167, lng:153.4000}
        },
        {
            Name:'Newcastle',
            Zoom:10,
            Center: { lat:-32.9167, lng:151.7500}
        },
        {
            Name:'Hobart',
            Zoom:10,
            Center: { lat:-42.8806, lng:147.3250}
        }
]


    const classes = useStyles();
    const [city, setCity] = useState(UX.MapParameters.Location);
    const [OPTIONS, setOPTIONS] = useState([])
    
    
    const handleChange = (event, key, payload) => { 
        //console.log(CapitalCities[event.target.value])
        let Selected = find(CapitalCities, function(o) { return o.Name === event.target.value; })    
        setMainMapLocation(Selected); 
        setCity(event.target.value)
    
    };

    const CreateOptions=()=>{
        let options=[]
        CapitalCities.map((model,i)=>{ options.push(model.Name) })
        setOPTIONS(options)
    }

    useEffect(()=>{CreateOptions()},[])

    return(
       <FormControl variant="outlined" className={`${classes.formControl} Map_Filters`}>
        <InputLabel id="MajorCities">Major Cities</InputLabel>
             <Select
                labelId="MajorCities"
                id="MajorCities-outlined"
                value={city}
                onChange={handleChange}
                label="Select Major City"
                >
          {
              OPTIONS.map((city,i)=>{
                  return(
                    <MenuItem key={i} value={city}>{city}</MenuItem>
                  )
              })
          }

        </Select>
        </FormControl>
    )
}

export default ByCapitalCities;