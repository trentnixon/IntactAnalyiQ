import React, {useEffect} from 'react'
import { Link} from "react-router-dom";
import { NavLink } from 'react-router-dom'
import List from '@material-ui/core/List';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import ApartmentIcon from '@material-ui/icons/Apartment';
import BlurCircularIcon from '@material-ui/icons/BlurCircular';
//import DataUsageIcon from '@material-ui/icons/DataUsage';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import CompareIcon from '@material-ui/icons/Compare';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import BuildIcon from '@material-ui/icons/Build';
import PinDropIcon from '@material-ui/icons/PinDrop';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';



const SideNavItems=[
    {
        to:'/',
        title:'Profile',
        icon:<PersonPinIcon />
    },
    {
        to:'/create-model',
        title:'Create a Model',
        icon:<BlurCircularIcon />
    },
    {
        to:'/view-models',
        title:'View a Model',
        icon:<ApartmentIcon />
    },
    {
        to:'/compare-models',
        title:'Compare Models',
        icon:<CompareIcon />
    },
    {
        to:'/location-Deep-Dive',
        title:'Deep Dive : locations',
        icon:<PinDropIcon />
    },
    {
        to:'/client-deep-dive',
        title:'Deep Dive : Clients',
        icon:<SupervisedUserCircleIcon />
    },
    {
        to:'/release-notes',
        title:'Release Notes',
        icon:<BuildIcon />
    },
    {
        to:'/pipeline',
        title:'Pipeline',
        icon:<AccountTreeIcon />
    },
    {
        to:'/UIComponents',
        title:'UI Components',
        icon:<DashboardIcon />
    }
]
const Login = ()=>{

    useEffect(()=>{},[])
    return( 
 
        <List className="AuthNavigation">

                {
                    SideNavItems.map((item, i)=>{
                        return(
                            <NavLink to={item.to} key={i}  exact activeClassName="selected">
                                <ListItem button key={item.title}>
                                    <ListItemIcon>
                                        <Tooltip title={item.title}>
                                            {item.icon}
                                        </Tooltip>
                                    </ListItemIcon>
                            </ListItem> 
                            </NavLink>
                        )
                    })
                }

        </List>
    )
}
export default Login