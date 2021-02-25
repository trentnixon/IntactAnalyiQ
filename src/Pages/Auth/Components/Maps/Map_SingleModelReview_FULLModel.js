import React, { useEffect, useRef } from 'react';
import {useContext_UX_FULL} from "Context/UX";
import { GoogleMap } from '@react-google-maps/api';
import {findClientName} from "actions/ClusterAnalysis";
// Components

import Markers from "Pages/Auth/Components/Maps/LocationMarkers";
import ResidualMarkers from "Pages/Auth/Components/Maps/ResidualLocationMarkers";
//import CenterPoints from "Pages/Auth/Components/Maps/MarkersCenterpoints";
//import MarkerBasedResults from "Pages/Auth/Components/Maps/MarkerBasedResults";
import Polygons from "Pages/Auth/Components/Maps/Polygons"
import { useState } from 'react';

const containerStyle = { height: "550px", width: "auto" };
const Map=()=>{
    const UX = useContext_UX_FULL();

    useEffect(()=>{
        console.log(UX.ClusterParameters.SelectedCluster)
    },[UX])
        return(
                <div className="" id="MainMap">
                        <GoogleMap 
                            mapContainerStyle={containerStyle}
                            center={UX.MapParameters.LatLngBoundaries}
                            zoom={UX.MapParameters.zoom}
                        >
                            { /* Child components, such as markers, info windows, etc. */ }
                            
                            <Markers />
                            <ResidualMarkers />
                            <Polygons />
                        </GoogleMap>  
                        
                        <MapClusterContainer />
                        
                    </div> 
                )
}

//<CenterPoints />
 
export default Map;



const MapClusterContainer =()=>{
    const UX = useContext_UX_FULL();
    const [Class,setClass] = useState('hide');

    useEffect(()=>{
        console.log(UX.ClusterParameters.SelectedCluster)

        UX.ClusterParameters.SelectedCluster === null ? setClass('hide'): setClass('show')

    },[UX])


    return(
        <div className={`${Class} InfoBox`}>
               {UX.ClusterParameters.SelectedCluster === null ? false: <MapClusterInfo />}
        </div>
    )
}

const MapClusterInfo = ()=>{
    const UX = useContext_UX_FULL();
    const SELECTED = UX.ClusterParameters.SelectedCluster;


    const WOS = (Trade)=>{
        let Count=[]
        console.log('SELECTED',SELECTED.ResourcesGroupedBy[Trade])
        SELECTED.ResourcesGroupedBy[Trade].map((wos,i)=>{
            Count.push(wos.WOS)
        })
        console.log(Count, Count.reduce((a, b) => a + b, 0))
        return Count.reduce((a, b) => a + b, 0)
    }


    const Clients=()=>{
        let Count=[]
        
        Object.keys(SELECTED.ClientGroupedBy).map((key,value)=>{
            console.log(key)
            Count.push(findClientName(key))
        })
        return Count
    }


    const CenterPoint = ()=>{
        let Add;
        SELECTED.StripedSites.map((geo,i)=>{
            console.log(geo.lat,SELECTED.center.lat ,geo.long , SELECTED.center.lng)
            if(geo.lat === SELECTED.center.lat && geo.long === SELECTED.center.lng) { Add = geo.name }
        })

        return Add
    }


    useEffect(()=>{
        console.log(SELECTED)
    },[UX])

    return(
        <div>
            <h3>Cluster Info Box</h3>
      
            <ul>
                <li><span>Name : </span> {SELECTED.name}</li>
                <li><span>Category : </span>{SELECTED.scanCategory} </li>
                <li><span>Locations : </span>{SELECTED.StripedSites.length} </li>
                <li><span>Center Point Address : </span>{CenterPoint()} </li>
                <li><span>Clients in Cluster : </span>
                        <ul>
                            {Clients().map((q,i)=>{
                                return(
                                    <li key={i}>
                                        {q}
                                    </li>
                                )
                            })}
                         </ul> 
                         {} 
                </li>      
            

                
                <li><span>Resource Quota : </span> 
                        <ul>
                            {SELECTED.resourceQuota.map((q,i)=>{
                                return(
                                    <li key={i}>
                                        <span>{q.Trade} </span> {(q.ResourceAllocation).toFixed(2)}
                                    </li>
                                )
                            })}
                         </ul>   
                </li>

                <li><span>Work Orders :</span>
                
                <ul>
                            {SELECTED.resourceQuota.map((q,i)=>{
                                return(
                                    <li key={i}>
                                        <span>{q.Trade} </span> { WOS(q.Trade)}
                                    </li>
                                )
                            })}
                         </ul> 
                </li>    
            </ul>
                
        </div>
    )
}

/*

*/