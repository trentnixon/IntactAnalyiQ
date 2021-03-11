import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { setMainMapLocation } from "actions/HandleUX";
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const Center = {
    Name:'Australia',
    Zoom:4,
    Center: { lat:-25.274399, lng: 133.775131}
}

export default function ContainedButtons() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <Button variant="contained" onClick={()=>{setMainMapLocation(Center)} } className="btn-Next">
           Recenter Map
        </Button>
    </div> 
  );
}