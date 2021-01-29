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

    const HandleDate=(timestamp)=>{
        var a = new Date(timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var time = date + ' ' + month + ' ' + year;
        return time;
        
    }
    useEffect(()=>{
        console.log(AUTH.ScanHistory);
    },[AUTH.ScanHistory])
    return(
        <div className="ModelHistory">
            <ul className="ScanHistoryList">
                    

            {
                AUTH.ScanHistory.map((scan,i)=>{
                    //console.log(scan);
                    return(
                        <li key={i}>

                             <div className="header">
                                <div><h1>{scan.Name}</h1></div>
                                <p><strong>{HandleDate(scan.DateStart)} - {HandleDate(scan.DateEnd) }</strong></p>
                              
                                { scan.ScanState=== 'Complete'? <CTA scan={scan}/>: <ProcessingStatus scan={scan} />  }
                             </div>
                            

                             <div className="body">
                               
                                <div className="description">
                                        {scan.Description}
                                </div>
                                <div className="ResultStats">
                                    <ul> 
                                        <li><span>{scan.IntClients}</span><PersonPinIcon />Clients</li>
                                        <li><span>{scan.IntCluster}</span><GroupWorkIcon />Clusters</li>
                                        <li><span>{scan.IntSites}</span><LocationCityIcon />Locations</li>
                                        <li><span>{(scan.IntSites-scan.IntLocationsunaccommodated)}</span><LocationSearchingIcon />Inscope</li>
                                        <li><span>{scan.IntLocationsunaccommodated}</span><LocationDisabledIcon />Out of Scope</li>
                            
                                    </ul>
                                </div>
                               
                             </div>

                                <CreatedAt scan={scan}/>
                                { scan.ScanState=== 'Complete'? <ProcessingStatus scan={scan} />: false }
                             
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


const CreatedAt=(props)=>{
    const {scan} = props
    return(
        <ul className="ModelDateRange">
                                <li>
                                    <p><small>Created : {HandleTZDate(scan.createdAt)}</small></p>
                                </li>                               
                            </ul>
    )
}



const ProcessingStatus=(props)=>{
    const {scan} = props
    return(<>
            <div className={`${scan.ScanState} status`}>
                {scan.ScanState}
                <br />
                {
                    scan.ScanState=== 'Complete' ? `Time Take ${scan.CreateModel_TimeTaken}`:`ETA: ${scan.CreateModel_RemainingTime} `
                }
                
            </div>
           

    </>
        
    )
}


const CTA = (props)=>{
    const {scan} = props
    return(
        <div className="cta">
            <div><ViewSingleResultBtn scanID={scan.id} scan={scan}/></div>
            <div>Delete</div>
        </div>
    )
}