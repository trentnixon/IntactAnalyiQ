import React from 'react';
import { Link} from "react-router-dom";
import { NavLink } from 'react-router-dom'
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
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';


import FilterChips from "Pages/Auth/SingleModelResult/Layout/FilterChips";

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: 'auto',
    bottom: 0,
  }, button: {
    backgroundColor: "green",
    "&:hover": {
      backgroundColor: "white"
    }
  },
  child: {
    backgroundColor: "#656565"
  },
  rippleVisible: {
    opacity: 0.5,
    animation: `$enter 550ms ${theme.transitions.easing.easeInOut}`
  },
  "@keyframes enter": {
    "0%": {
      transform: "scale(0)",
      opacity: 0.1
    },
    "100%": {
      transform: "scale(1)",
      opacity: 0.3
    }
  }
}));



const AppNav=[
  {
    Link:'/results/locations',
    Icon:<LocationCityIcon />,
    Label:'locations'
  },{
    Link:'/results/trades',
    Icon:<BuildIcon />,
    Label:'Resources'
  },{
    Link:'/results/clients',
    Icon:<PeopleIcon />,
    Label:'clients'
  },{
    Link:'/results/workorders',
    Icon:<AssignmentIcon />,
    Label:'Work Orders'
  },{
    Link:'/results/map',
    Icon:<MapIcon />,
    Label:'Map'
  },{
    Link:'/results/cluster',
    Icon:<BlurCircularIcon />,
    Label:'Clusters'
  },{
    Link:'/results/costs',
    Icon:<MonetizationOnIcon />,
    Label:'Cost Analysis'
  }
]


export default function BottomAppBar() {
  const classes = useStyles();
  const { button: buttonClass, ...rippleClasses } = classes;
  return (
  
    
    <div className="ModelViewNav">
           
              {
                AppNav.map((Link,i)=>{
                    return(
                      <NavLink key={i} to={Link.Link}  activeClassName="selected">
                        <IconButton edge="end"  color="inherit" TouchRippleProps={{ classes: rippleClasses }} >
                              {Link.Icon}
                              <p>{Link.Label}</p>
                        </IconButton>
                      </NavLink>
                    )
                })
              }
            
      </div>     
      

  );
}

/*

export default function BottomAppBar() {
  const classes = useStyles();
  const { button: buttonClass, ...rippleClasses } = classes;
  return (
    <React.Fragment>
    
      <AppBar position="fixed" className={`ModelSingleResultBottom ${classes.appBar} `}>
            <FilterChips />
            <Toolbar className="ModelSingleResultAppBar">
           
              {
                AppNav.map((Link,i)=>{
                    return(
                      <NavLink key={i} to={Link.Link}  activeClassName="selected">
                        <IconButton edge="end"  color="inherit" TouchRippleProps={{ classes: rippleClasses }} >
                              {Link.Icon}
                              <p>{Link.Label}</p>
                        </IconButton>
                      </NavLink>
                    )
                })
              }
           
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
*/