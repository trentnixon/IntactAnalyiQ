import React from 'react'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {useContext_SCAN_FULL} from "Context/SCAN";
import {RemoveClusterItem} from "actions/HandleUX";

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const ScanSwitch = (props)=>{
    const {Data} = props
    const SCAN = useContext_SCAN_FULL();
    return(
        <IconButton aria-label="delete" className="DeleteCluster" onClick={()=>{ RemoveClusterItem(SCAN.Results, Data.Boundary)}} >
            <DeleteForeverIcon fontSize="inherit" />
        </IconButton>
             
    )
}

export default ScanSwitch;

/*
<Button variant="contained" onClick={()=>{ RemoveClusterItem(SCAN.Results, Data.Boundary)}}  >
                   <DeleteForeverIcon />
            </Button>
*/