import React, {useEffect, useMemo, useState} from 'react'
import {useContext_STRAPI_Regions} from "Context/STRAPI";
import {  Marker  } from '@react-google-maps/api';
import {useContext_UX_FULL} from "Context/UX";
import {SelectedRegion, CreateMapParameters} from "actions/HandleUX"
import { find} from 'lodash'; 

const AddNewRegion = ()=>{

    const UX = useContext_UX_FULL();
    const Regions = useContext_STRAPI_Regions();
    const [NewRegions, setNewRegions] = useState(null)
    const [markerRemoved,setmarkerRemoved] = useState([])
    
    const onLoadMarker=(name)=>{
       //console.log(name)
    }

    const OnMarkerClick=(region,e)=>{
        
        
        setNewRegions(null);
        //console.log("Add new Region : ", region.name, region.id)
       
        let FindRegion = find(Regions, function(o) { return o.id === region.id; });
        UX.SelectedArea.push(FindRegion);

        SelectedRegion(UX.SelectedArea);
        CreateMapParameters(UX.SelectedArea);
        
    }

    const CreateAddNewRegion = (Data)=>{
          
       
        let StoreMarkers=[]
        //console.log(UX.SelectedArea, StoreMarkers);

            Data.map((region,i)=>{
                if(find(UX.SelectedArea, {id: region.id}) === undefined){

                let Targeticon = {
                    path: "M25 1c-13.234 0-24 10.766-24 24 0 13.233 10.766 24 24 24 13.233 0 24-10.767 24-24 0-13.234-10.767-24-24-24zm3 43.75v-8.75h-6v8.75c-8.625-1.307-15.443-8.125-16.75-16.75h8.75v-6h-8.75c1.307-8.625 8.125-15.443 16.75-16.75v8.75h6v-8.75c8.625 1.307 15.443 8.125 16.75 16.75h-8.75v6h8.75c-1.307 8.625-8.125 15.443-16.75 16.75z",
                    fillColor: '#FF0000',
                    fillOpacity: .9,
                    anchor: new window.google.maps.Point(0,0),
                    strokeWeight: 0,
                    scale: 1
                }; 
                   

                StoreMarkers.push( 
                    <>
                        <Marker
                            key={i}
                            onLoad={onLoadMarker(region.name)}
                            title={region.name}
                            label={region.name}
                            icon={Targeticon}
                           
                            onClick={OnMarkerClick.bind(this,region)}
                            position={{
                                    lat: parseFloat(region.lat),
                                    lng: parseFloat(region.long)
                                }}
                                visible={true}
                        />
                    </>
                )

                } // close lodash if
            })// close Map
            setNewRegions(StoreMarkers)
    }


    useEffect(()=>{ CreateAddNewRegion(UX.AreaSelectFilter.state.regions); },[UX.AreaSelectFilter])
    useEffect(()=>{ CreateAddNewRegion(UX.AreaSelectFilter.state.regions);},[UX.MapParameters])
    return(<> {NewRegions} </>)
}

export default AddNewRegion;