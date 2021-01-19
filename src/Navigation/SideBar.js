import React, {useEffect} from 'react'
import { Link} from "react-router-dom";

import List from '@material-ui/core/List';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import ApartmentIcon from '@material-ui/icons/Apartment';
import BlurCircularIcon from '@material-ui/icons/BlurCircular';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import CompareIcon from '@material-ui/icons/Compare';


const Login = ()=>{

    useEffect(()=>{},[])
    return(

        <List className="AuthNavigation">
            <ListItem button key='Profile' component={Link} to={`/`}>
                <ListItemIcon><PersonPinIcon /></ListItemIcon>
                <ListItemText primary='Profile' />
          </ListItem>
          
          <ListItem button key='Create Model' component={Link} to={`/create-model`}>
                <ListItemIcon><BlurCircularIcon /></ListItemIcon>
                <ListItemText primary='Create Model' /> 
          </ListItem>

          <ListItem button key='View Models' component={Link} to={`/view-models`}>
                <ListItemIcon><ApartmentIcon /></ListItemIcon>
                <ListItemText primary='View Models' /> 
          </ListItem>
          <ListItem button key='Compare Models' component={Link} to={`/compare-models`}>
                <ListItemIcon><CompareIcon /></ListItemIcon>
                <ListItemText primary='Compare Models' /> 
          </ListItem>
        

          <ListItem button key='Data return' component={Link} to={`/integity`}>
                <ListItemIcon><DataUsageIcon /></ListItemIcon>
                <ListItemText primary='Data integity' /> 
          </ListItem>
        </List>
   

    )
}

export default Login

/**
 * 
 * *  <ul>
        <li><Link to={`/`}>Landing</Link></li>
        <li><Link to={`/listData`}>Data return</Link></li>
        <li><Link to={`/prototype/primaryfeature`}>Primary Feature</Link></li>
    </ul>
       <ListItem button key='MarkerBasedScan' component={Link} to={`/MarkerBasedScan`}>
                <ListItemIcon><MapIcon /></ListItemIcon>
                <ListItemText primary='Portfolio' />
          </ListItem>

     <ListItem button key='Primary Feature' component={Link} to={`/prototype/primaryfeature`}>
                <ListItemIcon><MapIcon /></ListItemIcon>
                <ListItemText primary='Primary Feature Test' />
          </ListItem>

            <ListItem button key='View Results' component={Link} to={`/results`}>
                <ListItemIcon><DataUsageIcon /></ListItemIcon>
                <ListItemText primary='View Results' /> 
          </ListItem>
 */