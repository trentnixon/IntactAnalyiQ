import React, { useEffect,useState } from 'react'
import {ScanState} from "actions/HandleUX";
import {useContext_SCAN_FULL} from "Context/SCAN";

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const btnPara={
    label:'Scan Now',
    disabled:false
}

const btnActivePara={
    label:'Scanning',
    disabled:true
}

const ScanSwitch = ()=>{
    const SCAN = useContext_SCAN_FULL();
    const [btn,setbtn] = useState(btnPara)
    
    const handle=()=>{  
        ScanState(true);
        //console.log("Scan NOW!!!!! true");
    }

    useEffect(()=>{ 
     
        //console.log(SCAN.active)
        if(SCAN.active)
            setbtn(btnActivePara)
        if(!SCAN.active)
            setbtn(btnPara)

    },[SCAN])
    return(
        <div className="ScanBtnContainer">
             <Button variant="contained" onClick={handle} className="btn-Next" disabled={btn.disabled} >
                {btn.label}
            </Button>
        
        </div>
        
    )
}

export default ScanSwitch;