import React from 'react';
import { Link} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import MapIcon from '@material-ui/icons/Map';
import BlurCircularIcon from '@material-ui/icons/BlurCircular';
import BuildIcon from '@material-ui/icons/Build';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PeopleIcon from '@material-ui/icons/People';


const useStyles = makeStyles((theme) => ({
  appBar: {
    top: 'auto',
    bottom: 0,
  },
}));

export default function BottomAppBar() {
  const classes = useStyles();

  return (
    <React.Fragment>
  
      <AppBar position="fixed" className={`ModelSingleResultBottom ${classes.appBar} `}>
            <Toolbar className="ModelSingleResultAppBar">
         
            <IconButton edge="end" color="inherit" component={Link} to={`/results/locations`} >
                <LocationCityIcon />
                <p>locations</p>
            </IconButton>
            <IconButton edge="end" color="inherit" component={Link} to={`/results/trades`} >
                <BuildIcon />
                <p>Trades</p>
            </IconButton>
            
            <IconButton edge="end" color="inherit" component={Link} to={`/results/clients`} >
                <PeopleIcon />
                <p>clients</p>
            </IconButton>

            <IconButton edge="start" color="inherit" aria-label="open drawer"  component={Link} to={`/results/workorders`} >
                <AssignmentIcon />
                <p>Work Orders</p>
            </IconButton>

            <IconButton edge="start" color="inherit" aria-label="open drawer" component={Link} to={`/results/map`} >
                <MapIcon />
                <p>Map</p>
            </IconButton>
            <IconButton color="inherit" component={Link} to={`/results/cluster`} >
                <BlurCircularIcon />
                <p>Clusters</p>
            </IconButton>
            
         
           
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
