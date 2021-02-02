import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {SetSelected} from "actions/HandleScanProcess";

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
        <Button variant="contained" onClick={()=>{SetSelected(true)} } color="primary">
            Scan this Selection
        </Button>
    </div> 
  );
}