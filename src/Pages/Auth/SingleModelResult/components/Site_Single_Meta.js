import React, { useEffect, useState }  from 'react'
import {findClientName} from "actions/ClusterAnalysis";
import {useContext_SCAN_FULL} from "Context/SCAN";
import {useContext_UX_FULL} from "Context/UX";
import DiagramContainer from "Pages/Auth/Components/Layout/DiagramContainer"
import Section from "Pages/Auth/Components/Layout/Section"
import {H2,H3, H4,P} from "Pages/Auth/Components/Type";

import SiteSingleMap from "Pages/Auth/SingleModelResult/Maps/Site_Single_Location_Map"

import Site_Single_Line_Workorders from 'Pages/Auth/SingleModelResult/Charts/Site_Single_line_WorkordersOvertime'
import {find, findIndex} from 'lodash';

const SiteMeta = (props)=>{
    const {id} = props
    const UX = useContext_UX_FULL();
    const SCAN = useContext_SCAN_FULL();

    const  [site,setSite] = useState([])
    const  [modelLocations, setModelLocations] = useState([])



   const  FindMeta=(clusters)=>{
            let meta={
                Workorders:0,
                Allocation:[],
                Client:[],
                Dates:[]
            }
            
            clusters.map((cluster,i)=>{
                //console.log(cluster)
                if(cluster.SitesGroupedBy[id] != undefined){
                    console.log(cluster.SitesGroupedBy[id])
                        cluster.SitesGroupedBy[id].map((wo,i)=>{

                            meta.Workorders = meta.Workorders + wo.WOS
                            
                            let TradeIndex = findIndex(meta.Allocation, { 'Trade': wo.Trade  })
                            
                        
                            if(TradeIndex === -1){
                                meta.Allocation.push(
                                    {
                                        Trade:wo.Trade, 
                                        Allocation: wo.Ratio,
                                        WOS: wo.WOS
                                    }
                                )
                            }else{
                                meta.Allocation[TradeIndex].Allocation = (meta.Allocation[TradeIndex].Allocation+wo.Ratio)
                                meta.Allocation[TradeIndex].WOS = (meta.Allocation[TradeIndex].WOS+wo.WOS)
                            }

                            if(meta.Client.indexOf(findClientName(wo.Customer)) === -1){
                                meta.Client.push(findClientName(wo.Customer))
                            }

                            let DateIndex = findIndex(meta.Dates, { 'name': wo.Date  })
                            if(DateIndex === -1){
                                meta.Dates.push({
                                    name:wo.Date,
                                    UnixTime:wo.UnixDate,
                                    WOS: wo.WOS
                                })
                            }else{
                                meta.Dates[DateIndex].WOS = meta.Dates[DateIndex].WOS + wo.WOS
                            }

                        })
                }
            })
            console.log(meta)
            return meta;
    }


    const FindSiteInModel = ()=>{
        //console.log(site)
        let SiteModelLocations=[]
        SCAN.SelectedModel.STOREMARKERCENTERPOINTS.map((point,i)=>{
            let Model = find(point.StripedSites, { 'id': id  })
            if(Model != undefined){SiteModelLocations.push(point)}
        })
        //console.log(SiteModelLocations, id)
        setModelLocations(SiteModelLocations)
    }
  
    useEffect(()=>{
        setSite(find(SCAN.SelectedModel.USERSELECTEDLIST, { 'id': id  }))
        FindSiteInModel();
        
    },[id])

    return(
        <>
        <Section>
            
                <H2 Copy={`Address : ${site.name}`} />
                <H2 Copy={`Found in ${modelLocations.length} Clusters`} />
         
       
           <SiteSingleMap site={site} />
           <ListClusters modelLocations={modelLocations}/>
            <DiagramContainer>
                
                <P Copy={`Clients In Model :`} />
                <ul className="clusterList">
                        
                <li className="Header">
                                <div>Client</div>
                        </li>
                    {
                        FindMeta(modelLocations).Client.map((trade,i)=>{
                            return(
                                <li key={i}><div>{trade}</div></li>
                            )
                        })
                    }
                </ul>
            </DiagramContainer>
               

        <DiagramContainer>
                <P Copy={`Resource Allocation in Model :`} />
                <P Copy={`Total Site Work Orders in Model : ${FindMeta(modelLocations).Workorders}`} />
                        <ul className="clusterList">
                                <li className="Header">
                                        <div>Trade</div>
                                        <div>WO</div>
                                        <div>RA</div>
                                </li>

                            {
                                FindMeta(modelLocations).Allocation.map((trade,i)=>{
                                    return(
                                        <li key={i}>
                                            <div>{trade.Trade}</div>
                                            <div>{trade.WOS}</div>
                                            <div>{trade.Allocation.toFixed(2)}</div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
        </DiagramContainer>

        <div className="resultCharts">
                <Site_Single_Line_Workorders modelLocations={FindMeta(modelLocations)}/>
            </div>
            
        </Section>
        </>
    )
}

export default SiteMeta;

const ListClusters = (props)=>{
    const {modelLocations} = props
    return(
        <>
        <H2 Copy={`Clusters where site is found`} />
        <ul>
            {
                modelLocations.map((locations,i)=>{
                    
                    return(
                        <li>
                          
                            <div>{locations.scanCategory}</div>
                            
                           
                        </li>
                    )
                })
            }
        </ul>
        </>
    )
}