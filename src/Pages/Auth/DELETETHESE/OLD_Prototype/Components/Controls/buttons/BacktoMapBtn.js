import React from 'react'
import Button from '@material-ui/core/Button';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import IconButton from '@material-ui/core/IconButton';
const ScanSwitch = ()=>{
    const BacktoMap = ()=>{setTimeout(()=>{document.getElementById("MainMap").scrollIntoView({ behavior: 'smooth' });},500)}
    return( 
    
    <IconButton aria-label="To Top" className="BackToTop" onClick={()=>{ BacktoMap()}} >
        <ArrowUpwardIcon fontSize="inherit" />
    </IconButton>
    )
}

export default ScanSwitch;
//<Button variant="contained" onClick={()=>{ BacktoMap()}}  >Back to Map</Button>
