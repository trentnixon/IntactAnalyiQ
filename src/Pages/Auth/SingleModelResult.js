import React from 'react'
import { Route, Switch,useRouteMatch } from "react-router-dom";


// Layout 
import AppBar from "Pages/Auth/SingleModelResult/Layout/AppBar"
import HeaderTitles from "Pages/Auth/SingleModelResult/Layout/HeaderTitle"

// Sub Sections 
 import SubSection_Locations from "Pages/Auth/SingleModelResult/SubSections/SubSection_Locations";
 import SubSection_Client from "Pages/Auth/SingleModelResult/SubSections/SubSection_Client";
 import SubSection_FullMap from "Pages/Auth/SingleModelResult/SubSections/SubSection_FullMap";
 import SubSection_Clusters from "Pages/Auth/SingleModelResult/SubSections/SubSection_Clusters";
 import SubSection_Trade from "Pages/Auth/SingleModelResult/SubSections/SubSection_Trade";
 import SubSection_Workorders from "Pages/Auth/SingleModelResult/SubSections/SubSection_Workorders";
  


const SingleModelResult = ()=>{ 
    let match = useRouteMatch(); 
    
    return(
        <>
            <HeaderTitles />
                    <Switch> 
                        <Route path={`${match.path}/locations`}>
                            <SubSection_Locations />
                        </Route>
                        
                        <Route path={`${match.path}/trades`}>
                            <SubSection_Trade />
                        </Route>  
                         
                        <Route path={`${match.path}/clients`}>
                            <SubSection_Client />
                        </Route>


                        <Route path={`${match.path}/workorders`}>
                            <SubSection_Workorders />
                        </Route>

                        <Route path={`${match.path}/map`}>
                            <SubSection_FullMap />
                        </Route>

                        <Route path={`${match.path}/cluster`}>
                            <SubSection_Clusters />
                        </Route>
                         
                    </Switch> 
            <AppBar />
        </>
    ) 
}

export default SingleModelResult; 

