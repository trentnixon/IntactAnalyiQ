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
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import BuildIcon from '@material-ui/icons/Build';

const Login = ()=>{

    useEffect(()=>{},[])
    return(
 
        <List className="AuthNavigation">
            <NavLink to={`/`} exact activeClassName="selected">
                <ListItem button key='Profile'>
                    <ListItemIcon><PersonPinIcon /></ListItemIcon>
            </ListItem> 
            </NavLink>

           <NavLink to={`/create-model`} activeClassName="selected">
                <ListItem button key='Create Model' >
                        <ListItemIcon><BlurCircularIcon /></ListItemIcon>
                </ListItem>
           </NavLink>

       
            <NavLink to={`/view-models`} activeClassName="selected">
                <ListItem button key='View Models' >
                        <ListItemIcon><ApartmentIcon /></ListItemIcon>
                        
                </ListItem>
            </NavLink>

            <NavLink to={`/compare-models`} activeClassName="selected">
                <ListItem button key='Compare Models' >
                        <ListItemIcon><CompareIcon /></ListItemIcon>
                        
                </ListItem>
            </NavLink>
            

            
            <NavLink to={`/release-notes`} activeClassName="selected">
                <ListItem button key='release-notes' >
                    <ListItemIcon><BuildIcon /></ListItemIcon>
                    
                </ListItem>
            </NavLink>
            <NavLink to={`/pipeline`} activeClassName="selected">
                <ListItem button key='pipeline' >
                    <ListItemIcon><AccountTreeIcon /></ListItemIcon>
                    
                </ListItem>
            </NavLink>

            <NavLink to={`/UIComponents`} activeClassName="selected">
                <ListItem button key='UI Components' >
                    <ListItemIcon><DashboardIcon /></ListItemIcon>
                </ListItem>
            </NavLink>
        </List>
    )
}

export default Login

/*
<ListItemText primary='Profile' />
<ListItemText primary='Create Model' /> 
<ListItemText primary='View Models' /> 
<ListItemText primary='Compare Models' /> 
<ListItemText primary='UI Components' />
*/