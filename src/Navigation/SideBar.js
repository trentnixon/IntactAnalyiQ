import React, {useEffect} from 'react'
import { Link} from "react-router-dom";
import { NavLink } from 'react-router-dom'
import List from '@material-ui/core/List';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import ApartmentIcon from '@material-ui/icons/Apartment';
import BlurCircularIcon from '@material-ui/icons/BlurCircular';
//import DataUsageIcon from '@material-ui/icons/DataUsage';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import CompareIcon from '@material-ui/icons/Compare';
import DashboardIcon from '@material-ui/icons/Dashboard';

const Login = ()=>{

    useEffect(()=>{},[])
    return(

        <List className="AuthNavigation">
            <NavLink to={`/UIComponents`} activeClassName="selected">
                <ListItem button key='UI Components' >
                    <ListItemIcon><DashboardIcon /></ListItemIcon>
                    <ListItemText primary='UI Components' />
                </ListItem>
            </NavLink>

            <NavLink to={`/`} exact activeClassName="selected">
                <ListItem button key='Profile' component={Link} to={`/`}>
                    <ListItemIcon><PersonPinIcon /></ListItemIcon>
                    <ListItemText primary='Profile' />
            </ListItem> 
            </NavLink>

           <NavLink to={`/create-model`} activeClassName="selected">
                <ListItem button key='Create Model' >
                        <ListItemIcon><BlurCircularIcon /></ListItemIcon>
                        <ListItemText primary='Create Model' /> 
                </ListItem>
           </NavLink>

       
            <NavLink to={`/view-models`} activeClassName="selected">
                <ListItem button key='View Models' >
                        <ListItemIcon><ApartmentIcon /></ListItemIcon>
                        <ListItemText primary='View Models' /> 
                </ListItem>
            </NavLink>

            <NavLink to={`/compare-models`} activeClassName="selected">
                <ListItem button key='Compare Models' >
                        <ListItemIcon><CompareIcon /></ListItemIcon>
                        <ListItemText primary='Compare Models' /> 
                </ListItem>
            </NavLink>

        </List>
    )
}

export default Login

/**
 *  <ListItem button key='Data return' component={Link} to={`/integity`}>
                <ListItemIcon><DataUsageIcon /></ListItemIcon>
                <ListItemText primary='Data integrity' /> 
          </ListItem>
 * *
 */