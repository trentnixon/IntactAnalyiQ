import React, {useEffect, useState} from 'react'

import {useContext_STRAPI_FULL} from "../../../../Context/STRAPI";
import {useContext_STRAPI_Regions} from "../../../../Context/STRAPI";
import {useContext_UX_FULL} from "../../../../Context/UX";
import {SelectedRegion, CreateMapParameters} from "../../../../actions/HandleUX"
import { findIndex} from 'lodash'; 
const FeatureHeader = ()=>{
    const STRAPI = useContext_STRAPI_FULL()
    const Regions = useContext_STRAPI_Regions();

    const UX = useContext_UX_FULL()
    //const [SelectedRegion,setSelectedRegion] = useState(UX.SelectedArea);

   const  [WorkOrderCount,setWorkOrderCount ] = useState(0)
   const  [Sites,setSites ] = useState(0)
   const  [Cities,setCities ] = useState(0)
  
    
   const WorkorderCount =()=>{
       let WO=0, Cities=0, Sites=0
       
        UX.SelectedArea.map((region,i)=>{
           
            WO = WO+region.count[0].WorkOrders
            Cities = Cities + region.cities.length
            Sites = Sites + region.sites.length
        });
        setWorkOrderCount(WO)
        setSites(Sites)
        setCities(Cities)
   }
   

   const handleRemove = (item)=>{
        console.log("Remove this item", item.id, UX.SelectedArea)
        let index = findIndex( UX.SelectedArea, function(o) { return o.id === item.id; })
        UX.SelectedArea.splice(index, 1);
        CreateMapParameters(UX.SelectedArea)
   }


   useEffect(()=>{
        WorkorderCount()
    },[UX.MapParameters])

    return( 
        <>
        <div>
                <ul className="RegionRoundup">
                    <li><h2>{UX.SelectedArea.length}</h2><p>Regions</p> </li>
                    <li><h2>{Sites}</h2><p>Sites</p> </li>
                    <li><h2>{Cities}</h2><p>Cities</p> </li>
                    <li><h2>{WorkOrderCount}</h2><p>Work orders</p></li>
                </ul>
            </div>
            
        <div id="FeatureHeader">
            <div className="SelectedCenter">
                <h2> Centered Region: </h2>
                <h3> {UX.AreaSelectFilter.region.name} </h3>
            </div>

            <div className="AdditionalRegions">
                <h3>Regions Included in these results</h3>
                <ul className="RegionsInScan">
                    { UX.SelectedArea.map((region,i)=>{
                          return( <li key={i}>
                                    <p>{region.name}</p> 
                                    <button onClick={()=>{handleRemove(region)}}>Remove</button>
                                </li>)  
                    })}
                </ul>
            </div>    
           
        </div>
        
        </>
    )
}
export default FeatureHeader;