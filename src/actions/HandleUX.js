// Private Functions
import store from "../store/index"

//import axios from 'axios';
import {distancetoPoint} from "./GeoLocationActions"
import { findIndex} from 'lodash'; 
// Icons
import PieChartIcon from '@material-ui/icons/PieChart';
import AssessmentIcon from '@material-ui/icons/Assessment';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import MapIcon from '@material-ui/icons/Map';
import FilterListIcon from '@material-ui/icons/FilterList';
import TimelineIcon from '@material-ui/icons/Timeline';
export const colorArray = ['#030303', '#787878', '#575757', '#999A9A', '#D4D4D3', '#313231', '#777777', '#575757', '#3A3A3A', '#444444',];


export const ChartIcon =(Icon)=>{
  let DisplayIcon; 
  switch (Icon) {
    case 'bar':
        DisplayIcon = <AssessmentIcon />
      break;
      case 'pie':
        DisplayIcon = <PieChartIcon />
      break;
      case 'radial':
        DisplayIcon = <BubbleChartIcon />
      break;
      case 'map':
        DisplayIcon = <MapIcon />
      break;
      case 'funnel':
        DisplayIcon = <FilterListIcon />
      break;
      case 'line':
        DisplayIcon = <TimelineIcon />
      break;

      
      default:
        DisplayIcon = <AssessmentIcon />
    
  }
  return DisplayIcon;
}


export function setMainMapLocation(Location){
  const NewLocation = {
    LatLngBoundaries:Location.Center,
    BoundaryCenterPoint:null,
    zoom:Location.Zoom,
    Location:Location.Name
}
  store.dispatch({ type:'STOREMAPPARAMETERS', payload:NewLocation});
}


export const SetMapClusterType = (type)=>{
  store.dispatch({ type:'SETMAPCLUSTERTYPE', payload:type});
}



export const SetMapResourceType = (type)=>{
  //console.log(type)
  store.dispatch({ type:'SETMAPRESOURCETYPE', payload:type});
}

export const SetFilterClient = (type)=>{
  //console.log(type)
  store.dispatch({ type:'SETFILTERCLIENT', payload:type});
}

export const SetFilterModel = (type)=>{
  console.log('SetFilterModel', type)
  store.dispatch({ type:'SETFILTERMODEL', payload:type});
}

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const gl=(data)=>{ return data.length }

export function AreaFilter(type, value){
    //console.log('AreaFilter', value)
    store.dispatch({ type:type, payload:value});
}

export function ScanState(value){
   //console.log('ScanState', value)
    store.dispatch({ type:'SCANSTATE', payload:value});
}

export function SelectedRegion(SelectedRegion){

    //console.log(SelectedRegion)
    store.dispatch({ type:'STORESELECTEDAREA', payload:SelectedRegion});

}

export function RemoveClusterItem(Haystack, Needle){ 

    //console.log("Delete Cluster");
    //console.log(Haystack, Needle);
    let index = findIndex( Haystack, function(o) { return o.Boundary === Needle; })
    //console.log(index);

    Haystack.splice(index, 1)
    //console.log(Haystack);
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
           
           //console.log('distance', (distance*1000), setZoomLevel((distance*1000).toFixed(0)));
           
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
           //store.dispatch({ type:'STOREMAPPARAMETERS', payload:MapParameters});
}



function setZoomLevel(meters) { 
    //console.log(`Zoom level set meters: ${meters}`); 

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
    //console.log(TYPE, VALUE)
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


export const getDate=(timeStamp)=>{ 

  const milliseconds = timeStamp * 1000 

  const dateObject = new Date(milliseconds)
  //console.log(dateObject.getFullYear())
  //let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  let options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  const humanDateFormat = dateObject.toLocaleString('en-UK',options) //2019-12-9 10:30:15

  return humanDateFormat
 }



function parseDate(input) {
  // Transform date from text to date
var parts = input.match(/(\d+)/g);
// new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
}


export const workingDaysBetweenDates = (S1, E1) => {
  const S1Date = S1 * 1000; 
  const E1Date = E1 * 1000;
  
  const S1dateObject = new Date(S1Date)
  const E1dateObject = new Date(E1Date)

  let d0 = `${S1dateObject.getFullYear()}/${S1dateObject.getMonth()}/${S1dateObject.getDay()}`
  let d1= `${E1dateObject.getFullYear()}/${E1dateObject.getMonth()}/${E1dateObject.getDay()}`
  /* Two working days and an sunday (not working day) */
 // var holidays = ['2018-05-03', '2018-05-05', '2018-05-07'];
  var holidays = [''];
  var startDate = parseDate(d0);
  var endDate = parseDate(d1);  

// Validate input
  if (endDate <= startDate) {
    return 0;
  }

// Calculate days between dates
  var millisecondsPerDay = 86400 * 1000; // Day in milliseconds
  startDate.setHours(0, 0, 0, 1);  // Start just after midnight
  endDate.setHours(23, 59, 59, 999);  // End just before midnight
  var diff = endDate - startDate;  // Milliseconds between datetime objects    
  var days = Math.ceil(diff / millisecondsPerDay);

  // Subtract two weekend days for every week in between
  var weeks = Math.floor(days / 7);
  days -= weeks * 2;

  // Handle special cases
  var startDay = startDate.getDay();
  var endDay = endDate.getDay();
    
  // Remove weekend not previously removed.   
  if (startDay - endDay > 1) {
    days -= 2;
  }
  // Remove start day if span starts on Sunday but ends before Saturday
  if (startDay == 0 && endDay != 6) {
    days--;  
  }
  // Remove end day if span ends on Saturday but starts after Sunday
  if (endDay == 6 && startDay != 0) {
    days--;
  }
  /* Here is the code */
  holidays.forEach(day => {
    if ((day >= d0) && (day <= d1)) {
      /* If it is not saturday (6) or sunday (0), substract it */
      if ((parseDate(day).getDay() % 6) != 0) {
        days--;
      }
    }
  });

  return days
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

// CLient Name for Filter
export const FindClientList = ()=>{
  const MODEL = store.getState().SCANSTATE;
  let ClientNames = []
  MODEL.SelectedModel.STOREMARKERCENTERPOINTS.map((model,i)=>{
      Object.keys(model.ClientGroupedBy).map(function(key, index) {
          model.ClientGroupedBy[key].map((c,ii)=>{
              if(ClientNames.indexOf(c.Customer) === -1){
                  ClientNames.push(c.Customer)
              }
          })
      })
  })
  return ClientNames
}

// UX Filters
 export const HandleResourceFilter=(item, filter)=>{
    if(findIndex(item.resourceQuota, function(o) { return o.Trade === filter}) === -1)
      return false  
        return true
 }