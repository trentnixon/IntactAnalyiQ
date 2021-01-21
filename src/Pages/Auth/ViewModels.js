import React, { useEffect } from 'react';
import {useContext_STRAPI_FULL} from "../../Context/STRAPI";
import {useContext_SCAN_FULL} from "../../Context/SCAN";
import {useContext_AUTH_FULL} from "../../Context/AUTH";
import{FetchPreviousScans} from "../../actions/authUser"

import GroupWorkIcon from '@material-ui/icons/GroupWork';
import LocationDisabledIcon from '@material-ui/icons/LocationDisabled';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import LocationCityIcon from '@material-ui/icons/LocationCity';


import {HandleTZDate} from "../../actions/HandleUX";
import ScanHistoryRefreshBtn from "./Components/buttons/HistoryRerfresh";
import ViewSingleResultBtn from "./Components/buttons/ViewSingleResultBtn";
import Footer from "./Components/Layout/Footer"
const Profile = ()=>{
    const AUTH = useContext_AUTH_FULL();
    return(
        <div className="AuthLayout">
            <div className="Header">
                <h2>Models</h2>
            </div>

            <div className="Content">
                <div className="BtnWrapper">
                    {  AUTH.RefreshScanHistory ? <Refreshloading />: <ScanHistoryRefreshBtn /> }
                </div>
                <ModelHistory />
            </div>

            <Footer />
        </div>
    )
}

export default Profile;


const ModelHistory = ()=>{
    const AUTH = useContext_AUTH_FULL();
    return(
        <div className="ModelHistory">
            <ul className="ScanHistoryList">
                    <li>
                        <div className="header">
                            <div>Name</div>
                            <div>&nbsp;</div>
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
                                
                                <div className="ResultStats">
                                    <ul>
                                        <li><PersonPinIcon /><span>{scan.IntClients}</span>Clients</li>
                                        <li><LocationCityIcon /><span>{scan.IntSites}</span>Locations</li>
                                        <li><GroupWorkIcon /><span>{scan.IntCluster}</span>Clusters</li>
                                        <li><LocationSearchingIcon /><span>{(scan.IntSites-scan.IntLocationsunaccommodated)}</span>Inscope</li>
                                        <li><LocationDisabledIcon /><span>{scan.IntLocationsunaccommodated}</span>Unaccommodated</li>
                            
                                    </ul>
                                </div>
                                <h3>Model Description</h3>
                                <div className="description">
                                        {scan.Description}
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
    )
}

const Refreshloading=()=>{
    return(
        
            <div className="loader">
                <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
            </div>
    )
}