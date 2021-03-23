import React, {useEffect} from 'react';
import {useContext_UX_FULL} from "Context/UX";
import { useHistory } from "react-router-dom";

import DiagramContainer from "Pages/Auth/Components/Layout/DiagramContainer"
import VisibilityIcon from '@material-ui/icons/Visibility';
import IconButton from '@material-ui/core/IconButton';

const ViewSites = ()=>{
    const SITES = useContext_UX_FULL().ClusterParameters.SelectedCluster.StripedSites
    useEffect(()=>{
        console.log(SITES)
    },[SITES])
    return(
        <DiagramContainer>
           
          
            <ul className="clusterList">
                <li className="Header">
                    <div>Address</div>
                    <div>Scope Status</div>
                    <div>Work Orders</div>
                <div></div>
                </li>
                { SITES === undefined ? false : <ClusterSiteRows SITES={SITES} />}
                
            </ul>
        </DiagramContainer>
    )
}
export default ViewSites;


const ClusterSiteRows = (props)=>{
    const {SITES} = props;
    const Pushhistory = useHistory();
    const handleSelect=(id)=>{
     
        Pushhistory.push(`/results/site/${id}`);
    }

    return(
        <>{
            SITES.map((site,i)=>{
                console.log(site)

                return(
                    <li>
                        <div>{site.name}</div>
                        <div>{0}</div>
                        <div>{0}</div>
                        <div>
                        <div>
                                    <IconButton aria-label="refresh" onClick={()=>{handleSelect(site.id)}}>
                                        <VisibilityIcon />
                                    </IconButton>
                                </div>
                        </div>
                        
                    </li>
                )
            })
        }</>
    )
}
/*

*/