import React from 'react'
import {useContext_UX_FULL} from "Context/UX";
import {RegionColor, ResourceColor} from "actions/HandleUX"

const ColorKey = ()=>{
    
    const UX = useContext_UX_FULL();

    const Opacity=(type)=>{
        if(UX.AreaSelectFilter.ByClusterType === type || UX.AreaSelectFilter.ByClusterType === undefined)
            return 1
                return 0.1;
    }

    return (

        <>
              <ClusterColorKey />
              <ResourceColorKey />
        </>

    )
}

export default ColorKey;



const ResourceColorKey = ()=>{
    const UX = useContext_UX_FULL();
    const Opacity=(type)=>{
        if(UX.AreaSelectFilter.ByResourceType === type || UX.AreaSelectFilter.ByResourceType === undefined)
            return 1
                return 0.1;
    }

    return(
        <div className="MapColorKey">
         <div >
                  <span style={{backgroundColor:ResourceColor('HandyMan'), opacity:Opacity('HandyMan')}}></span>
                  <h2>Handy Man</h2>
              </div>
              <div >
                  <span style={{backgroundColor:ResourceColor('Electrician'),opacity:Opacity('Electrician')}}></span>
                  <h2>Electrician</h2>
              </div>
              <div >
                  <span style={{backgroundColor:ResourceColor('Plumber'),opacity:Opacity('Plumber')}}></span>
                  <h2>Plumber</h2>
              </div>
              <div>
                  <span  style={{backgroundColor:ResourceColor('Specialized'),opacity:Opacity('Specialized')}}></span>
                  <h2>Specialized</h2>
              </div>
              <div>
                  <span style={{backgroundColor:ResourceColor('CombinedCluster'),opacity:Opacity('CombinedCluster')}}></span>
                  <h2>CombinedCluster</h2>
              </div>
        </div>
    )
}

const ClusterColorKey = ()=>{
    const UX = useContext_UX_FULL();
    const Opacity=(type)=>{
        if(UX.AreaSelectFilter.ByClusterType === type || UX.AreaSelectFilter.ByClusterType === undefined)
            return 1
                return 0.1;
    }

    return(
        <div className="MapColorKey">
         <div >
                  <span style={{backgroundColor:RegionColor('SameBuilding'), opacity:Opacity('SameBuilding')}}></span>
                  <h2>SameBuilding</h2>
              </div>
              <div >
                  <span style={{backgroundColor:RegionColor('CBD'),opacity:Opacity('CBD')}}></span>
                  <h2>CBD</h2>
              </div>
              <div >
                  <span style={{backgroundColor:RegionColor('InnerCity'),opacity:Opacity('InnerCity')}}></span>
                  <h2>InnerCity</h2>
              </div>
              <div>
                  <span  style={{backgroundColor:RegionColor('Metro'),opacity:Opacity('Metro')}}></span>
                  <h2>Metro</h2>
              </div>
              <div >
                  <span style={{backgroundColor:RegionColor('OuterMetro'),opacity:Opacity('OuterMetro')}}></span>
                  <h2>OuterMetro</h2>
              </div>
              <div >
                  <span style={{backgroundColor:RegionColor('Regional'),opacity:Opacity('Regional')}}></span>
                  <h2>Regional</h2>
              </div>
              <div >
                  <span style={{backgroundColor:RegionColor('Remote'),opacity:Opacity('Remote')}}></span>
                  <h2>Remote</h2>
              </div>
              
              <div >
                  <span style={{backgroundColor:RegionColor('ExtremeRemote'),opacity:Opacity('ExtremeRemote')}}></span>
                  <h2>ExtremeRemote</h2>
              </div>
        </div>
    )
}