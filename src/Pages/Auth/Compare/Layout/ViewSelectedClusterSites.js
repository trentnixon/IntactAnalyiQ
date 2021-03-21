import React, {useEffect} from 'react';
import {useContext_UX_FULL} from "Context/UX";
import DiagramContainer from "Pages/Auth/Components/Layout/DiagramContainer"


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
    const {SITES} = props
    return(
        <>{
            SITES.map((site,i)=>{
                return(
                    <li>
                        <div>{site.name}</div>
                        <div>{site.ScopeStatus}</div>
                        <div>{site.SumWorkOrder}</div>
                        <div>View Site</div>
                        
                    </li>
                )
            })
        }</>
    )
}
/*

*/