import React, {useEffect} from 'react'
import { Link} from "react-router-dom";


import List from '@material-ui/core/List';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import HomeIcon from '@material-ui/icons/Home';
import MapIcon from '@material-ui/icons/Map';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import PersonPinIcon from '@material-ui/icons/PersonPin';
const Login = ()=>{

    useEffect(()=>{},[])
    return(

        <List>
            <ListItem button key='Landing' component={Link} to={`/`}>
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary='Landing' />
          </ListItem>

          <ListItem button key='Data return' component={Link} to={`/listData`}>
                <ListItemIcon><DataUsageIcon /></ListItemIcon>
                <ListItemText primary='Data return' />
          </ListItem>

          <ListItem button key='Primary Feature' component={Link} to={`/prototype/primaryfeature`}>
                <ListItemIcon><MapIcon /></ListItemIcon>
                <ListItemText primary='Primary Feature Test' />
          </ListItem>
          <ListItem button key='MarkerBasedScan' component={Link} to={`/MarkerBasedScan`}>
                <ListItemIcon><MapIcon /></ListItemIcon>
                <ListItemText primary='MarkerBasedScan' />
          </ListItem>
          
          <ListItem button key='Portfolio' component={Link} to={`/portfolio`}>
                <ListItemIcon><PersonPinIcon /></ListItemIcon>
                <ListItemText primary='Portfolio' />
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
 */