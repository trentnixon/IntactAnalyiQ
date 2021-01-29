// Private Functions
import store from "../store/index"
//import axios from 'axios';
import {distancetoPoint} from "./GeoLocationActions"
import { findIndex} from 'lodash'; 


export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function AreaFilter(type, value){
    //console.log('AreaFilter', value)
    store.dispatch({ type:type, payload:value});
}

export function ScanState(value){
    console.log('ScanState', value)
    store.dispatch({ type:'SCANSTATE', payload:value});
}

export function SelectedRegion(SelectedRegion){

    console.log(SelectedRegion)
    store.dispatch({ type:'STORESELECTEDAREA', payload:SelectedRegion});

}

export function RemoveClusterItem(Haystack, Needle){ 

    console.log("Delete Cluster");
    console.log(Haystack, Needle);
    let index = findIndex( Haystack, function(o) { return o.Boundary === Needle; })
    console.log(index);

    Haystack.splice(index, 1)
    console.log(Haystack);
    store.dispatch({ type:'STORERESULTS', payload:Haystack}); 
}

 
export function CreateMapParameters(DATA){

            // USe this function to create ALL of the possible Map Data and Meta points.
            // Try to limit the use on the UX.SelectedArea around the APP
            // Instead focus on using UX.MapParameters

            let centerLatArray = [];
            let centerLngArray = [];
            let Storesites=[]

            //console.log(DATA)
            DATA.map((Region, i)=>{
                //console.log("Region", Region)
                Region.sites.map((marker,i)=>{
                    Storesites.push(marker)
                    if(!isNaN(parseFloat(marker.lat))){
                        centerLatArray.push(parseFloat(marker.lat))
                        centerLngArray.push(parseFloat(marker.long))
                    }
                })
                //return false
            })


            let centerLat = ((Math.min(...centerLatArray) + Math.max(...centerLatArray))/2)
            let centerLng = ((Math.min(...centerLngArray) + Math.max(...centerLngArray))/2)
            let LatLngBoundaries = [Math.min(...centerLatArray),Math.max(...centerLatArray),Math.min(...centerLngArray),Math.max(...centerLngArray)]
            
            let distance = distancetoPoint(LatLngBoundaries[0],LatLngBoundaries[2], LatLngBoundaries[1],LatLngBoundaries[3],'K')
           
           // console.log('distance', (distance*1000), setZoomLevel((distance*1000).toFixed(0)));
           
            let zoom = setZoomLevel((distance*1000).toFixed(0))
            let SetMap = true
            //console.log('Storesites', Storesites)
            
            let MapParameters = {
                LatLngBoundaries:LatLngBoundaries,
                BoundaryCenterPoint:[centerLat, centerLng],
                zoom:zoom,
                SetMap:SetMap,
                markers:Storesites
            }

            //console.log("MapParameters", MapParameters)
            store.dispatch({ type:'STOREMAPPARAMETERS', payload:MapParameters});
}



function setZoomLevel(meters) { 
    console.log(`Zoom level set meters: ${meters}`); 

    switch (meters) {
        case (meters < 1128):
            return 15;
          break;
        case ((meters > 1128) && (meters < 2256)):
            return 14;
          break;
        case ((meters > 2256) && (meters < 4513)):
            return 13;
          break;
        case ((meters > 4513) && (meters < 9027)):
            return 12;
          break; 
        case ((meters > 9027) && (meters < 18055)) :
            return 11;
          break;
        case ((meters > 18055) && (meters < 36111)) :
            return 10;
          break; 
        case ((meters > 36111) && (meters < 72223)) :
            return 9;
          break;      
        case ((meters > 72223) && (meters < 144447)) :
            return 8;
          break;   
        case ((meters > 144447) && (meters < 288895)) :
            return 7;
          break;    
        case ((meters > 288895) && (meters < 577790)) :
            return 6;
          break;  
          case ((meters > 577790) && (meters < 1155581)) :
            return 5;
          break;     
          default:
            return 4;
      }


    //return zoomfactor;
}

export function NumberReducer (labelValue) {

    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e+9

    ? Math.abs(Number(labelValue)) / 1.0e+9 + "B"
    // Six Zeroes for Millions 
    : Math.abs(Number(labelValue)) >= 1.0e+6

    ? Math.abs(Number(labelValue)) / 1.0e+6 + "M"
    // Three Zeroes for Thousands
    : Math.abs(Number(labelValue)) >= 1.0e+3

    ? Math.abs(Number(labelValue)) / 1.0e+3 + "K"

    : Math.abs(Number(labelValue));

}


export function HandleFilterChange(TYPE, VALUE){
    console.log(TYPE, VALUE)
    store.dispatch({ type:TYPE, payload:VALUE});
}

export function RegionColor(region){
  switch (region) {
      case 'SameBuilding':
            return '#B2007C' 
            break;
      case 'CBD':
              return '#DC000B'
        break;
      case 'InnerCity':
              return '#04419B'
          break;
      case 'Metro':
              return '#11B700'
          break;
      case 'OuterMetro':
              return '#330193'
          break;
        case 'Regional':
          return '#FF7400'
          break;
        case 'Remote':
          return '#3D1324'
          break; 
      case 'ExtremeRemote':
            return '#111D2F'
          break;   
     
  }
}

export const GroupArrayByOccurances =(arr) =>{
  var a = [],b = [],prev;
  arr.sort();
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] !== prev) {
      a.push(arr[i]);
      b.push(1);
    } else {
      b[b.length - 1]++;
    }
    prev = arr[i];
  }
  return [a, b];
}

export const HandleTZDate = (DATE)=>{
  const options = { year: "numeric", month: "long", day: "numeric" }
  return new Date(DATE).toLocaleDateString(undefined, options)

 // let NewDate = DATE.split('T');

 // return NewDate[0]
}