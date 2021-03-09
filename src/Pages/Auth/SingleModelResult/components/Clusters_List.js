import React, {useEffect, useState} from 'react'
import {useContext_SCAN_FULL} from "Context/SCAN";
import { useHistory } from "react-router-dom";
import {OBJ_CENTERPOINTS} from 'actions/CreateSingleViewModel';
import {RegionColor, SetFilterPolygon,SetSelectedCluster,setMainMapLocation} from "actions/HandleUX";
import {H2} from "Pages/Auth/Components/Type";
import IconButton from '@material-ui/core/IconButton';

import VisibilityIcon from '@material-ui/icons/Visibility';
import {orderBy} from 'lodash'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import DiagramContainer from "Pages/Auth/Components/Layout/DiagramContainer"
const ClusterList = ()=>{
   // const SCAN = useContext_SCAN_FULL();

   const [ReorderBy, setReorderBy] = useState('type')
   const Pushhistory = useHistory();
   useEffect(()=>{
        console.log(OBJ_CENTERPOINTS())
    },[ReorderBy])

    const handleSelect=(centerpoint)=>{
     
        SetFilterPolygon(centerpoint.name)
        SetSelectedCluster(centerpoint.model)
        setMainMapLocation( {Center:centerpoint.model.center, Zoom:14,Name:centerpoint.name} )
        Pushhistory.push("/results/map");
    }

    const handleReorder=(item)=>{
        console.log("clicked")
        setReorderBy(item)
    }


    const arrow=(item)=>{
        if(item === ReorderBy){
            return <ArrowDropDownIcon />
        }
    }

    return(
        <>
         <H2 Copy={`Cluster Breakdown`}/>
        <DiagramContainer>
        
        <ul className="clusterList">
            <li className="Header">
                <div>Cluster Name</div>
                <div className="sortable" onClick={()=>{handleReorder('type')}} >Cluster Type {arrow('type')} </div>
                <div className="sortable" onClick={()=>{handleReorder('sites')}} >Sites {arrow('sites')}</div>
                <div  className="sortable" onClick={()=>{handleReorder('clients')}} >Clients {arrow('clients')}</div>
                <div>Trades</div>
                <div className="sortable" onClick={()=>{handleReorder('resourceQuotaTotal')}} >Resources {arrow('resourceQuotaTotal')}</div>
                <div></div>
            </li>

            {
                //orderBy(OBJ_CENTERPOINTS(), ['resourceQuotaTotal', 'type'], ['asc', 'desc'])
                orderBy(OBJ_CENTERPOINTS(), [ReorderBy], ['desc','asc']).map((center,i)=>{
                    return(
                        <li key={i}>
                           <div>{ center.name }</div>
                           <div style={{color: RegionColor(center.type)}}>{ center.type }</div>
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
        </>
    )
}
export default ClusterList;