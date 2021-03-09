import React, { useEffect } from 'react';
import {useContext_UX_FULL} from "Context/UX";

import {
        SetMapResourceType,
        SetMapClusterType,
        SetFilterClient,
        SetFilterModel,
        SetFilterPolygon,
        SetSelectedCluster } 
        from "actions/HandleUX";

import {findClientName} from "actions/ClusterAnalysis"

import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import LayersIcon from '@material-ui/icons/Layers';
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(0.5),
      },
    },
  }));

const FilterChips = ()=>{
    const classes = useStyles();
    const UX = useContext_UX_FULL();

    return(
        <div className={`PacketofChips ${classes.root}`}>
                
            { UX.AreaSelectFilter.ByResourceType != false ? <ResourceChip /> : false }
            { UX.AreaSelectFilter.ByClusterType != false ? <ClusterChip /> : false }
            { UX.AreaSelectFilter.ByClient != false ? <ClientChip /> : false }
            { UX.AreaSelectFilter.ByModel != false ? <ModelChip /> : false }
            { UX.AreaSelectFilter.ByPolygon != false ? <PolygonChip /> : false }
            
        </div>
    )
}
 
export default FilterChips;


const PolygonChip=()=>{
    const UX = useContext_UX_FULL();
    const handleDelete = () => {  
        SetFilterPolygon(false) 
        SetSelectedCluster(false)
    };
    //onClick={handleDelete}
    useEffect(()=>{console.log( UX.AreaSelectFilter.ByPolygon)},[UX])
    return(
        <Chip label={ UX.AreaSelectFilter.ByPolygon} clickable  className="PolygonChip"  onClick={handleDelete}  icon={<LayersIcon />} />
    )
}

const ModelChip=()=>{
    const UX = useContext_UX_FULL();
    const handleDelete = () => {  SetFilterModel(false) };
    //onClick={handleDelete}
    useEffect(()=>{console.log( UX.AreaSelectFilter.ByModel)},[UX])
    return(
        <Chip label={ UX.AreaSelectFilter.ByModel} clickable  className="ModelChip" onClick={handleDelete}  icon={<AccountTreeIcon />} />
    )
}
const ResourceChip=()=>{
    const UX = useContext_UX_FULL();
    const handleDelete = () => {  SetMapResourceType(false) };
    useEffect(()=>{console.log( UX.AreaSelectFilter.ByResourceType)},[UX])
    return(
        <Chip label={ UX.AreaSelectFilter.ByResourceType} clickable  className="TradeChip" onClick={handleDelete} icon={<FaceIcon />} />
    )
}


const ClusterChip=()=>{
    const UX = useContext_UX_FULL();
    const handleDelete = () => {  SetMapClusterType(false) };
    useEffect(()=>{console.log( UX.AreaSelectFilter.ByClusterType)},[UX])
    return(
        <Chip label={ UX.AreaSelectFilter.ByClusterType} clickable  className="TradeChip" onClick={handleDelete} icon={<LocationCityIcon />} />
    )
}

const ClientChip=()=>{
    const UX = useContext_UX_FULL();
    const handleDelete = () => {  SetFilterClient(false) };
    useEffect(()=>{console.log( UX.AreaSelectFilter.ByClient)},[UX])
    return(
        <Chip label={ findClientName(UX.AreaSelectFilter.ByClient)} clickable  className="TradeChip" onClick={handleDelete} icon={<PeopleAltIcon />} />
    )
}
