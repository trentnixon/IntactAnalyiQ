import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {CreateNewScan} from "actions/HandleScanProcess";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function ContainedButtons() {
  const classes = useStyles();


    const HandleSingle=()=>{}
    const HandleCompare=()=>{ }

  return (
    <div className={classes.root}>
        <Button variant="contained" onClick={HandleSingle} color="primary">
            Single Source Scan
        </Button>

        <Button variant="contained" color="secondary">
            Comparison Scan
        </Button>
    </div>
  );
}
