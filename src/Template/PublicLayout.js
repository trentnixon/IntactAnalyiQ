import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';


// Components
import PublicNavigation from "./Public/Navigation"

import Divider from '@material-ui/core/Divider';




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
    backgroundColor:'#89b2c3',
    zIndex:99
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor:'#89b2c3'
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
      <main className="Public">  
            <div  className="InnerFrame">
                {props.children}
            </div>
      </main>
    </div>
  );
}


/*
<div className={classes.toolbar} />
 <CssBaseline />

      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
            <h1>Intact AnalytiQ </h1>
            <p>Front end Portal</p>
         
        </Toolbar>
      </AppBar>
      
*/


//    <PublicNavigation />

/*

  <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
      
      </Drawer>

*/