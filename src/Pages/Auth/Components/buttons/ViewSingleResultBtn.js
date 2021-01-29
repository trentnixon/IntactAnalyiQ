import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {useContext_SCAN_FULL} from "../../../../Context/SCAN";
import { Link} from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';

import VisibilityIcon from '@material-ui/icons/Visibility';
import GetAppIcon from '@material-ui/icons/GetApp';
import{FetchSingleScanResult} from "../../../../actions/authUser"


// this button has 3 states
// Falsey .. nothign downloaded ot process
// Active .. there is a active result in memory
// processing .. system is downloading a result


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function IconButtons(props) {
    const {scanID, scan} = props
    const SCAN = useContext_SCAN_FULL();
    useEffect(()=>{
      console.log(SCAN)
    },[SCAN])

    return (
          <>
            {
              SCAN.SelectedModelUI.active ? <ActiveTrue scanID={scanID} scan={scan} />:<ActiveFalse scanID={scanID} scan={scan} />
            }
          </>
    );
}



const ActiveTrue = (props)=>{
  const {scanID, scan} = props
  const SCAN = useContext_SCAN_FULL();
  useEffect(()=>{
      //console.log(scanID,SCAN.SelectedModelUI.activeID )
  },[])
    return(
      <>
        {
          SCAN.SelectedModelUI.activeID === scanID ? <ViewResult /> : <DownloadResult scanID={scanID} scan={scan}/>
        }
      </>
    )
}






const ActiveFalse = (props)=>{
  const {scanID, scan} = props
  const SCAN = useContext_SCAN_FULL();
  useEffect(()=>{
      //console.log(scanID,SCAN.SelectedModelUI.activeID )
  },[])
  return(
    <>
      {
          SCAN.SelectedModelUI.processing  ? <Processing /> : <DownloadResult scanID={scanID} scan={scan}/>
        }
    </>
  )
}




const DownloadResult = (props)=>{
  const {scanID, scan} = props
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <IconButton aria-label="refresh" onClick={()=>{FetchSingleScanResult(scanID, scan)}}>
        <GetAppIcon />
      </IconButton>
    </div>
  );
}



const ViewResult = (props)=>{
  const {scanID} = props
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <IconButton aria-label="refresh"
       component={Link}
       to='/results'
       >
        <VisibilityIcon />
      </IconButton>
    </div>
  );
}


const Processing = ()=>{
  return(
    <>
        <div className="loader">
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </div>
    </>
  )
}