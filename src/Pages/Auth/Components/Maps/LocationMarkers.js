
import React, {useEffect, useState} from 'react'

import {useContext_UX_FULL} from "Context/UX";
import {useContext_SCAN_FULL} from "Context/SCAN";

import {interpolate} from "d3-interpolate";
import {  Marker, MarkerClusterer,InfoWindow  } from '@react-google-maps/api';

//const iconBase ="https://developers.google.com/maps/documentation/javascript/examples/full/images/";
import {findIndex} from 'lodash'; 
import {RegionColor,ResourceColor} from "actions/HandleUX"
import {findClientName} from "actions/ClusterAnalysis";

const divStyle = {
  background: `yellow`,
  border: `1px solid #ccc`,
  padding: 15
}
 
  const mcOptions = {
    styles: [{
        height: 53,
        url: "/clusters/m1.png",
        width: 53, 

      },
      {
        height: 56,
        url: "/clusters/m2.png",
        width: 56,
      },
      {
        height: 66,
        url: "/clusters/m3.png",    
        width: 66, 
      },
      {
        height: 78,
        url: "/clusters/m4.png",
        width: 78,
      },
      {
        height: 90,
        url: "/clusters/m5.png",
        width: 90,
      }
    ]
  }

/** Loop Markers */ 
const MarkerBasedLocationMarkers = ()=>{

    //const STRAPI = useContext_STRAPI_FULL();
    const UX = useContext_UX_FULL();
    const SCAN = useContext_SCAN_FULL();
    const [DisplayMarkers,setDisplayMarkers] = useState(null)
    const [ShowInfoWindow, setShowInfoWindow] = useState(false)
    const [InfoWindowContent, setInfoWindowContent] = useState(false)




    let Targeticon = { };
    let Homeicon={}
    const onLoadMarker = marker => {
      //console.log('marker Created')
    }

    const OnMarkerClick=(point, Region)=>{
      //console.log("Marker Clicked", point, Region)  
      
      setInfoWindowContent(point)
      setShowInfoWindow(true)
    
    }


      const ColorMe = (val)=>{
        let color = interpolate("#466dfb", "#ff6d6d")
        return  color((val).toFixed(2))
      }

      const FindMinMax=(Data)=>{
        let arr=[]

        //console.log("FindMinMax", Data)
        Data.map((marker,i)=>{ 
       
            if(marker.count[0] != null){
              //console.log(marker.count[0])
              //console.log(marker.count[0].WorkOrders)
              arr.push(marker.count[0].WorkOrders) 
            }
          })
        return [Math.min(...arr),Math.max(...arr)]
      }

      const FindColor = (type, cluster, resource)=>{
        let FixedColor
            if(type === 'Cluster'){
                FixedColor = RegionColor(cluster)
            }else{
                if(resource.length===1){
                    console.log(resource[0].Trade)
                    FixedColor = ResourceColor(resource[0].Trade)
                }
                else{
                    console.log("RESOURCE MIXED")
                    FixedColor = ResourceColor('CombinedCluster')
                }
            }

        return FixedColor;
    }


      const CreateMarkers = (markers,  clusterer)=>{

       
        let StoreMarkers=[];

        markers.map((centerPoint,i)=>{

         //console.log("centerPoint", centerPoint)

  
/* ******************************************************************************** */         
// Map Filters
// Filter Results by Polygon Select
    if(UX.AreaSelectFilter.ByPolygon !== false)  
            if(centerPoint.name != UX.AreaSelectFilter.ByPolygon)
                return
// Filter Results by Cluster Type
          if(UX.AreaSelectFilter.ByClusterType !== false)  
            if(centerPoint.scanCategory != UX.AreaSelectFilter.ByClusterType)
              return
// Filter Results by Reource Type 

            if(UX.AreaSelectFilter.ByResourceType !== false)  
             if(findIndex(centerPoint.resourceQuota, function(o) { return o.Trade === UX.AreaSelectFilter.ByResourceType}) === -1)
              return
// End Map Filters
/* ******************************************************************************** */  

          if(UX.AreaSelectFilter.ByMarkerType === 'Center Points Only'){

            Homeicon = {
              //path: "M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z",
              path:"M38.8823 0.384155L0.579987 34.26H10.06V74.76H66.94V34.26H76.42L38.8823 0.384155Z",
              fillColor: FindColor(UX.AreaSelectFilter.ByColorScheme, centerPoint.scanCategory, centerPoint.resourceQuota),
              fillOpacity: .9,
              anchor: new window.google.maps.Point(50,50),
              strokeWeight: 0,
              scale: .3
          }; 
    
      
                StoreMarkers.push( 
                    
                        <Marker
                            clusterer={clusterer}
                            key={`${centerPoint.scanCategory} ${centerPoint.name}`}
                            onLoad={onLoadMarker}
                            title={centerPoint.name}
                            //label={site.name}
                            icon={Homeicon}
                            //onClick={()=>{OnMarkerClick(centerPoint)}}
                            position={{
                                    lat: parseFloat(centerPoint.center.lat),
                                    lng: parseFloat(centerPoint.center.lng)
                                }}
                        />
                  )


          }else{
            centerPoint.StripedSites.map((site,ii)=>{

              Targeticon = {
                //path: "M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z",
                path:"M-24-48h48v48h-48z",
                fillColor: FindColor(UX.AreaSelectFilter.ByColorScheme, centerPoint.scanCategory, centerPoint.resourceQuota),
                
                fillOpacity: .9,
                anchor: new window.google.maps.Point(0,0),
                strokeWeight: 0,
                scale: .3
            }; 
      
            
           
                  StoreMarkers.push( 
                        
                          <Marker
                              clusterer={clusterer}
                              key={`Site ${centerPoint.scanCategory}${site.name}`}
                           
                              onLoad={onLoadMarker}
                              title={site.name}
                              //label={site.name}
                              icon={Targeticon}
                              onClick={()=>{OnMarkerClick(site, centerPoint.scanCategory)}}
                              position={{
                                      lat: parseFloat(site.lat),
                                      lng: parseFloat(site.long)
                                  }}
                          />
                    )
              })

          }// end ByMarkerType Filter ELSE
          
          
          
          
          })
          return StoreMarkers;
        }

      useEffect(()=>{ 
        if(CreateMarkers(SCAN.SelectedModel.STOREMARKERCENTERPOINTS) != undefined)
          CreateMarkers(SCAN.SelectedModel.STOREMARKERCENTERPOINTS)
      },[SCAN.SelectedModel])


      const onLoad = infoWindow => {
        //console.log('infoWindow: ', infoWindow)
      }
      
      const onClose = (infoWindow)=>{
        //console.log('onClose: ',infoWindow)
        setShowInfoWindow(false)
      }


      useEffect(()=>{ },[UX])
      return(  <>
               
              {
                ShowInfoWindow ? <InfoWindow  onLoad={onLoad} position={ { lat: InfoWindowContent.lat, lng: InfoWindowContent.long }}  onCloseClick={onClose}>
                                    <div style={{ }}>
                                        <InfoWindowDetails InfoWindowContent={InfoWindowContent}/>
                                    </div>
                                </InfoWindow> : false
              }
                

                 <MarkerClusterer options={mcOptions} maxZoom={12} minimumClusterSize={30}>
                    {(clusterer) =>
                       CreateMarkers(SCAN.SelectedModel.STOREMARKERCENTERPOINTS, clusterer)
                    }
                  </MarkerClusterer>
                </>
                )

}

export default MarkerBasedLocationMarkers;



const InfoWindowDetails = (props)=>{
  const {InfoWindowContent} = props
  return(
      <div  className="SiteInfoWindow" >
          <h3>Site Info</h3>
          <ul>
              <li>
                  <span>Address : </span>
                  <span>{InfoWindowContent.name}</span>
              </li>
              <li>
                  <span>Work Orders : </span>
                  <span>{InfoWindowContent.SumWorkOrder}</span>
              </li>
              <li>
                  <span>Clients : </span>
                  <span>
                    <ul>
                        <li>
                              {
                                InfoWindowContent.customers.map((customer,i)=>{
                                  return(
                                    <li key={i}>
                                        {findClientName(customer)}
                                    </li>
                                  )
                                })
                              }
                          </li> 
                  </ul></span>
              </li>
              
          </ul>
      </div>
  )
}