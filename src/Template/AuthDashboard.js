import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Divider from '@material-ui/core/Divider';

import SideBar from "../Navigation/SideBar";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
   // width: `calc(100% - ${drawerWidth}px)`,
    //marginLeft: drawerWidth,
    zIndex:999
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    backgroundColor:'#ffc20e',
    zIndex:99
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor:'#fff',
    borderRight:'1px solid #ffc20e'
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: { 
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

export default function PermanentDrawerRight(props) {
    const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
            <h1>Intact AnaltyiQ </h1>
            <p>Front end Portal</p>
         
        </Toolbar>
      </AppBar>
      
    
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
      
        <SideBar />
       
      </Drawer>
      
      <main className="Auth">  
         <div className={classes.toolbar} />
          <div  className="InnerFrame">
            {props.children}
          </div>
      </main>

 
    </div>
  );
}
/*

 <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
*/
