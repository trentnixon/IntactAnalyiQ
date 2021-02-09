import React, { useEffect } from 'react';
import {useContext_UX_FULL} from "Context/UX";

import {SetMapResourceType,SetMapClusterType,SetFilterClient } from "actions/HandleUX";
import {findClientName} from "actions/ClusterAnalysis"

import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
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
                
            { UX.AreaSelectFilter.ByResourceType != null ? <ResourceChip /> : false }
            { UX.AreaSelectFilter.ByClusterType != null ? <ClusterChip /> : false }
            { UX.AreaSelectFilter.ByClient != null ? <ClientChip /> : false }
            
        </div>
    )
}

export default FilterChips;


const ResourceChip=()=>{
    const UX = useContext_UX_FULL();
    const handleDelete = () => {  SetMapResourceType(null) };
    useEffect(()=>{console.log( UX.AreaSelectFilter.ByResourceType)},[UX])
    return(
        <Chip label={ UX.AreaSelectFilter.ByResourceType} clickable  className="TradeChip" onClick={handleDelete} icon={<FaceIcon />} />
    )
}


const ClusterChip=()=>{
    const UX = useContext_UX_FULL();
    const handleDelete = () => {  SetMapClusterType(null) };
    useEffect(()=>{console.log( UX.AreaSelectFilter.ByClusterType)},[UX])
    return(
        <Chip label={ UX.AreaSelectFilter.ByClusterType} clickable  className="TradeChip" onClick={handleDelete} icon={<LocationCityIcon />} />
    )
}

const ClientChip=()=>{
    const UX = useContext_UX_FULL();
    const handleDelete = () => {  SetFilterClient(null) };
    useEffect(()=>{console.log( UX.AreaSelectFilter.ByClient)},[UX])
    return(
        <Chip label={ findClientName(UX.AreaSelectFilter.ByClient)} clickable  className="TradeChip" onClick={handleDelete} icon={<PeopleAltIcon />} />
    )
}
