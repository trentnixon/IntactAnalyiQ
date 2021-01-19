import React, { useEffect } from 'react';
import {useContext_STRAPI_FULL} from "../../Context/STRAPI";
import {useContext_SCAN_FULL} from "../../Context/SCAN";
import {useContext_AUTH_FULL} from "../../Context/AUTH";
import{FetchPreviousScans} from "../../actions/authUser"
import {HandleTZDate} from "../../actions/HandleUX";
import ScanHistoryRefreshBtn from "./Components/buttons/HistoryRerfresh";
import ViewSingleResultBtn from "./Components/buttons/ViewSingleResultBtn";

const Profile = ()=>{
    const STRAPI = useContext_STRAPI_FULL();
    const AUTH = useContext_AUTH_FULL();
    const SCAN = useContext_SCAN_FULL();

   // useEffect(()=>{ FetchPreviousScans() },[])
   
    return(
        <>
        <div className="SectionHeaderWithControls">
            <h1>Stored Models</h1> 
            <div className="controls">
                {  AUTH.RefreshScanHistory ? <Refreshloading />: <ScanHistoryRefreshBtn /> }
            </div>
        </div>
           
           <div className="ModelHistory">
            <ul className="ScanHistoryList">
                    <li>
                        <div className="header">
                            <div>Name</div>
                            <div>Date Created</div>
                            <div>Status</div>
                        </div>         
                    </li>

            {
                AUTH.ScanHistory.map((scan,i)=>{
                    //console.log(scan);
                    return(
                        <li key={i}>

                             <div className="header">
                                <div>{scan.Name}</div>
                                <div>{HandleTZDate(scan.createdAt)}</div>
                                <div className={scan.ScanState}>{scan.ScanState}</div>
                             </div>

                             <div className="body">
                                <div>{scan.Description}</div>
                                <div className="ResultStats">
                                    <ul>
                                        <li>Clusters Found : {scan.IntCluster}</li>
                                        <li>Clients Sourced : {scan.IntClients}</li>
                                        <li>Sites Scanned : {scan.IntSites}</li>
                                        <li>Sites Grouped : {(scan.IntSites-scan.IntLocationsunaccommodated)}</li>
                                        <li>Sites Unaccommodated: {scan.IntLocationsunaccommodated}</li>
                            
                                    </ul>
                                </div>
                             </div>

                             <div className="cta">
                                <div><ViewSingleResultBtn scanID={scan.id} scan={scan}/></div>
                                <div>Delete</div>
                             </div>
                        
                        </li>
                    )
                })
            }
                </ul>
           </div>
          
        </>
    )
}

export default Profile;



const Refreshloading=()=>{
    return(
        <>
            <div className="loader">
                <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
            </div>
            <h3>Fetching Scan Status</h3>
        </>
    )
}