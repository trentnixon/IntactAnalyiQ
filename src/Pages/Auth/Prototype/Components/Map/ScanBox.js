import React, {useEffect, useState} from 'react'

import {useContext_UX_FULL} from "../../../../../Context/UX";
import {useContext_SCAN_FULL} from "../../../../../Context/SCAN";

import { useSelector } from "react-redux";
import {PreformScan} from "../../../../../actions/GeoLocationActions";
import { Rectangle } from '@react-google-maps/api';


//
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import DeleteCluster from "../Controls/buttons/DeleteClusterBtn";
import ClusterMap from "../Map/clusterMap/clustermap"
//
const RenderScan = new PreformScan();

const recOptions={
    strokeColor: '#6094ff',
    strokeOpacity: 1,
    strokeWeight: 1.5,
    fillColor: '#6094ff',
    fillOpacity: 0.35,
  }

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const ScanBox = ()=>{

    // Dialouge Box
    const [open, setOpen] = useState(false);
    const [clusterId, setclusterId]= useState(null)
    const [DeleteClusterRow, setDeleteClusterRow] = useState(null)


    //const STRAPI = useContext_STRAPI_FULL();
    const UX = useContext_UX_FULL();
    const SCAN = useContext_SCAN_FULL();
    const [ScanResults, setScanResults] = useState([])
    
    // Region Grid
    const [Gridpoints, setGridpoints] = useState(null)
    const [GridPointer, setGridPointer] = useState(null)





    const ScrolltoCluster=()=>{
        console.log(clusterId)
       
       
        setOpen(false);
        setTimeout(()=>{document.getElementById(clusterId).scrollIntoView({ behavior: 'smooth' });},500)
    }
    const handleClickOpen = (cluster, i) => {

       
        setDeleteClusterRow(SCAN.Results[i])
        setclusterId(cluster)
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

   const TestScan = ()=>{
            RenderScan.Boundaries=UX.MapParameters.LatLngBoundaries;
            RenderScan.FilterVariables = SCAN.LocationFilter
            RenderScan.setGridpoints= setGridpoints;
            RenderScan.setGridPointer= setGridPointer
            RenderScan.TestAgainstSites =  UX.MapParameters.markers;
            RenderScan.ScanResults=[]
            RenderScan.setScanResults= setScanResults
            RenderScan.Scan();
   }

   const CreateBorders = (Data)=>{

    let DisplayBorderResults=[];
    Data.map((border,i)=>{
        let position = border.GroupedBoxBoundaryLimits;
        DisplayBorderResults.push(<Rectangle key={i} onClick={()=>{handleClickOpen(`Cluster${i}`, `${i}`)}} visible={true} options={recOptions} bounds={{north: position[3],south: position[2],east: position[0],west: position[1]}} />)
    })
        setScanResults(DisplayBorderResults)
   }


    useEffect(()=>{ 
        //console.log('SCAN', SCAN.active) 
        if(SCAN.active){TestScan() }
     
    },[SCAN])

    useEffect(()=>{ 
        if(SCAN.Results.length != 0 ){ CreateBorders(SCAN.Results); } },[SCAN])

    return(
        <>
            {Gridpoints}
            {GridPointer}
            {ScanResults}

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Selected Cluster"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    <ClusterMap Data={DeleteClusterRow} />
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={()=>{ScrolltoCluster()}} color="primary">
                    View to Cluster
                </Button>
            
                <DeleteCluster  Data={DeleteClusterRow}/>
                
                <Button onClick={handleClose} color="primary">
                   Close Box
                </Button>
                
                </DialogActions>
      </Dialog>
        </>
    )
}

export default ScanBox;