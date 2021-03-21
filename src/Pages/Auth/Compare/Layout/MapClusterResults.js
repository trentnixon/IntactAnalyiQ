import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import {useContext_UX_FULL} from "Context/UX";
import {useContext_SCAN_FULL} from "Context/SCAN";
import {RegionColor, SetFilterPolygon,SetSelectedCluster,setMainMapLocation} from "actions/HandleUX";
import {findIndex} from 'lodash'; 
import VisibilityIcon from '@material-ui/icons/Visibility';
import IconButton from '@material-ui/core/IconButton';
import {H2} from "Pages/Auth/Components/Type";
import DiagramContainer from "Pages/Auth/Components/Layout/DiagramContainer"
const ClusterResults = ()=>{
    const UX = useContext_UX_FULL()
    const SCAN = useContext_SCAN_FULL();
    const [ShowResults, setResults] = useState([])
    const Pushhistory = useHistory();

    const handleSelect=(centerpoint)=>{
        console.log(centerpoint);

        SetFilterPolygon(centerpoint.name)
        SetSelectedCluster(centerpoint)
        setMainMapLocation( {Center:centerpoint.center, Zoom:14,Name:centerpoint.name} )
        Pushhistory.push("/results/map");
    }



    const GetResourceNum =(Cluster)=>{
        let Total=[];
        Cluster.map((res,i)=>{Total.push(res.ResourceAllocation);})

        return (Total.reduce((a, b) => a + b, 0))
    }

    useEffect(()=>{
        let Results=[]
        SCAN.SelectedModel.STOREMARKERCENTERPOINTS.map((centerpoint,i)=>{
        /* ******************************************************************************** */         
        // Map Filters
                //console.log(UX.AreaSelectFilter.ByColorScheme) 
                //console.log(centerpoint)
                // Filter Results by Cluster Type    
                if(UX.AreaSelectFilter.ByPolygon !== false)  
                    if(centerpoint.name != UX.AreaSelectFilter.ByPolygon)
                        return


                if(UX.AreaSelectFilter.ByClusterType !== false)  
                    if(centerpoint.scanCategory != UX.AreaSelectFilter.ByClusterType)
                        return

                // Filter Results by Reource Type  
                if(UX.AreaSelectFilter.ByResourceType !== false)  
                    if(findIndex(centerpoint.resourceQuota, function(o) { return o.Trade === UX.AreaSelectFilter.ByResourceType}) === -1)
                        return


        // End Map Filters
        /* ******************************************************************************** */    

            Results.push(centerpoint)
        })

        setResults(Results)
    },[UX])

    return(
        <DiagramContainer>
            <H2 Copy={`Clusters : ${ShowResults.length}`} />
            

            <ul className="clusterList">
            <li className="Header">
                <div>Cluster Name</div>
                <div>Sites</div>
                <div>Resource Allocation</div>
                <div></div>
            </li>
                {
                    ShowResults.map((center,i)=>{
                       console.log(center)
                        return(
                            <li key={i}>
                               <div style={{color: RegionColor(center.scanCategory)}}>{ center.scanCategory }</div>
                               <div >{ center.StripedSites.length }</div>
                               <div>{GetResourceNum(center.resourceQuota)}</div>
                               <div>
                                    <IconButton aria-label="refresh" onClick={()=>{handleSelect(center)}}>
                                        <VisibilityIcon />
                                    </IconButton>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>

      
        </DiagramContainer>
    )

}

export default ClusterResults;

/*

                               <div >{ center.sites }</div>
                               
                              
                               <div>{ center.clients }</div>
    
                               <div>
                                   { 
                                   center.resourceQuota.map((type,i)=>{
                                    return(<span>{type.Trade}</span>)
                                    }) 
                                   }
                                </div>
    
                                <div>{center.resourceQuotaTotal.toFixed(2)}</div>
                                
                               
*/