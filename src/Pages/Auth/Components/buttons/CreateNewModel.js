import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {ResetCreateNewModel} from "../../../../actions/HandleScanProcess";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function ContainedButtons() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <Button variant="contained" onClick={ResetCreateNewModel} color="secondary">
           Create a New Model
        </Button>
    </div> 
  );
}