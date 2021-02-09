import { Circle } from '@react-google-maps/api';
import store from "../store/index"
import {ClusterAnalysis} from "./ClusterAnalysis";



/*
    This class should deal with Geolocation Processes ONLY
    all result filtering to be handled in phase two

*/


// find the distance in KM from 1 point to another
export function distancetoPoint(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1/180;
        var radlat2 = Math.PI * lat2/180;
        var theta = lon1-lon2;
        var radtheta = Math.PI * theta/180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit=="K") { dist = dist * 1.609344 }
        if (unit=="N") { dist = dist * 0.8684 }
        return dist;
    }
}

// use to find the scan box area.
// this function return the corosponding lnglat to a given point


export  function llFromDistance(latitude, longitude, distance, bearing) {
    // taken from: https://stackoverflow.com/a/46410871/13549 
    // distance in KM, bearing in degrees
  
    const R = 6378.1; // Radius of the Earth
    const brng = bearing * Math.PI / 180; // Convert bearing to radian
    let lat = latitude * Math.PI / 180; // Current coords to radians
    let lon = longitude * Math.PI / 180;
  
    // Do the math magic
    lat = Math.asin(Math.sin(lat) * Math.cos(distance / R) + Math.cos(lat) * Math.sin(distance / R) * Math.cos(brng));
    lon += Math.atan2(Math.sin(brng) * Math.sin(distance / R) * Math.cos(lat), Math.cos(distance / R) - Math.sin(lat) * Math.sin(lat));
  
    // Coords back to degrees and return
    return [(lat * 180 / Math.PI), (lon * 180 / Math.PI)];
  
  }


  export const TestBoundaries = (site, Area)=>{
    let found=false;
    if(site.lat <=  Area.north && site.lat >= Area.south && site.long >= Area.west && site.long <= Area.east ){found=true}
    return found
}





 
// Main Scan Class
export function PreformScan(){

    /* *************************************************************************************************************** */        
    /* Variables */
    /* *************************************************************************************************************** */        
    
    //this.Area=.5
    //this.ScanDistanceArea=this.Area;
    //this.SearchRadius = .5
    //this.minSites=2
    //this.WorkOrderVariants = [500,1500];
    this.FilterVariables=null


    this.Boundaries=null;
    this.setGridpoints=null;
    this.setGridPointer=null;

    this.TestAgainstSites=null;
    this.ScanResults=[];
    this.setScanResults=null
    this.sleepFor=10;
    this.NESW={ north: null, south: null, east: null,  west: null }
    
    
    this.PointOptions={
        strokeColor: '#FF0000',
        strokeOpacity: 0.5,
        strokeWeight: 1,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        clickable: false,
        draggable: false,
        editable: false,
        visible: true,
        radius: 10,
        zIndex: 1
      }
         
     this.GridPointerOptions = {
        strokeColor: '#00ff00',
        strokeOpacity: 0.8,
        strokeWeight: 1,
        fillColor: '#00ff00',
        fillOpacity: 0.35,
        clickable: false,
        draggable: false,
        editable: false,
        visible: true,
        radius: 100,
        zIndex: 10
      }

      this.GridResultOptions={
        strokeColor: '#00ff00',
        strokeOpacity: 0.8,
        strokeWeight: 1,
        fillColor: '#00ff00',
        fillOpacity: 0.35,
        clickable: false,
        draggable: false,
        editable: false,
        visible: true,
        radius: 1000,
        zIndex: 10
      }

      this.recOptions={
        strokeColor: '#6094ff',
        strokeOpacity: 0.9,
        strokeWeight: 1,
        fillColor: '#6094ff',
        fillOpacity: 0.15,
      }

    /* *************************************************************************************************************** */        
    /*  AUX Functions*/
    /* *************************************************************************************************************** */        

    this.sleep = ()=>{  return new Promise(resolve => setTimeout(resolve, this.sleepFor)) }
    
    this.BreakBoundaries=(Boundaries)=>{
        this.NESW = {  north: Boundaries[1], south: Boundaries[0], east: Boundaries[3], west: Boundaries[2] }
    }

    this.arePointsNear = (checkPoint, centerPoint, km) => {
                var ky = 40000 / 360;
                var kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
                var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
                var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
                return Math.sqrt(dx * dx + dy * dy) <= km;
            }

    this.RemoveDuplicates =()=>{

    }

    /* *************************************************************************************************************** */        
    /* Process */
    /* *************************************************************************************************************** */        

    this.Scan=()=>{
            //console.log("START SCAN ")
            //console.log("Scan Filters", this.FilterVariables)
            
            this.BreakBoundaries(this.Boundaries)
            //console.log(this.NESW)
            
            
            //console.log(this.FilterVariables.Area, this.FilterVariables);
            let Xiterations = distancetoPoint(this.NESW.north,this.NESW.west, this.NESW.north, this.NESW.east,'K')/this.FilterVariables.GridSpacing;
            let Yiterations = distancetoPoint(this.NESW.north,this.NESW.west, this.NESW.south, this.NESW.west,'K')/this.FilterVariables.GridSpacing;

            //console.log( Xiterations, Yiterations);
            //let ScanBoxStartingPosition = llFromDistance(this.NESW.north, this.NESW.west, Math.sqrt(2)*this.Area, 135)
            
            //let LargestSurfaceArea = Math.max(Math.ceil(Xiterations), Math.ceil(Yiterations))

            this.setGridPointer(<Circle options={this.GridPointerOptions}  center={{ lat: this.NESW.north, lng: this.NESW.west }} />)
            this.FindScanPoints(Math.ceil(Xiterations), Math.ceil(Yiterations))
            
        }



    this.FindScanPoints = (Xiterations, Yiterations)=>{

        //console.log(Xiterations, Yiterations);

        let LargestSurfaceArea = Math.max(Xiterations, Yiterations)
        let i=0;
        let Points = []
        let ReturnedLngLat;

      
        while( i < LargestSurfaceArea){
           
            ReturnedLngLat = llFromDistance(this.NESW.north, this.NESW.west, (Math.sqrt(2)*(i*this.FilterVariables.GridSpacing)), 135)
            //console.log(ReturnedLngLat[0],ReturnedLngLat[1])
            Points.push([ReturnedLngLat[0],ReturnedLngLat[1]]) 
            
            i++
        }

        //console.log(Points);
        this.MapScanPoints(Points, Xiterations, Yiterations)
    }



    this.MapScanPoints=(Points, Xiterations, Yiterations)=>{

        let MapGrid=[]
        let createCircles=[];


        let ii=0;

        while(ii < Yiterations){
            let Row=0, Col=0, iii=0
            while(iii < Xiterations){
                Row=ii;
                Col=iii
                    //console.log([Row,Col])
                    MapGrid.push([Points[Row][0], Points[Col][1]])
                    createCircles.push(<Circle key={ii+iii} options={this.PointOptions}  center={{ lat: Points[Row][0], lng: Points[Col][1] }} />)
                    iii++
            }
            ii++
        }
        //console.log(MapGrid);
        this.setGridpoints(createCircles)
        this.RunScanTest (MapGrid)
    }


    this.RunScanTest = async(MapGrid)=>{
        
        // Variables
        this.setScanResults(null)
        let i=0
        // run loop to scan through Grid points
        while(i<MapGrid.length){
            // Hold scan point for FE show only
            await this.sleep()
            // find
          //  let ScanBoxNewPosition = llFromDistance(MapGrid[i][0], MapGrid[i][1], Math.sqrt(2)*this.Area, 135)
          //  south: ScanBoxNewPosition[0],east: ScanBoxNewPosition[1],
            this.setGridPointer(<Circle options={this.GridPointerOptions}  center={{ lat: MapGrid[i][0], lng: MapGrid[i][1] }} />)
            
            // Create Circle Center point to scan in next function hand off.
            let ScanBoundary = { north: MapGrid[i][0],  west: MapGrid[i][1] }
            
            this.scanTestDiameter(ScanBoundary)
            
            i++
        }

        this.setGridPointer(<Circle visible={false} options={this.GridPointerOptions}   />)
        this.StoreResults()
        ClusterAnalysis(this.ScanResults)
        
    }



    this.scanTestDiameter = (ScanBoundary)=>{

        // This function checks to see if a site is within the Radius of the center point in the scan
        // it should check each site lng/lst. if true then store in array this.ScanResults;
       
        // Outer Global Variables
        let CollectSites=[];
        let long=[],lat=[],GroupedBoxBoundaryLimits=[];
       // Variables
       let WorkOrderCount = 0;

        // Loop known sites in this area for matches
        this.TestAgainstSites.map((site,i)=>{
            
            
            if(this.arePointsNear({ lat: site.lat, lng: site.long}, { lat: ScanBoundary.north, lng: ScanBoundary.west }, this.FilterVariables.SearchRadius)){

                //console.log(site)

                // Push Values into Arrays
                long.push(site.long);
                lat.push(site.lat)
                CollectSites.push(site);
                
                //console.log(site)
                //if(site.count[0] !== null) WorkOrderCount = WorkOrderCount + site.count[0].WorkOrders;
               
              
            } // close if true
           
          })  // close Map

            // Limit Boundaries to outer most
            GroupedBoxBoundaryLimits.push([Math.max(...long), Math.min(...long), Math.max(...lat), Math.min(...lat)])
            // if work orders !0 ship it off for processing
            /*
            if( WorkOrderCount >= this.FilterVariables.MinWorkOrder 
                && WorkOrderCount <= this.FilterVariables.MaxOrderOrders 
                && CollectSites.length>=this.FilterVariables.minSites)
                { }
            */
                this.ProcessGridBoundary(CollectSites, GroupedBoxBoundaryLimits, ScanBoundary)
        }

 

    this.ProcessGridBoundary=(Sites, GroupedBoxBoundaryLimits, ScanBoundary)=>{
     
        // Variables
        let tmp = [];
        let remove=[];
        let removeDuplicateBoundaryLimits;
        
        // remove any dupliactes from arrays
        removeDuplicateBoundaryLimits = GroupedBoxBoundaryLimits.filter(function (v, i) {
            if (tmp.indexOf(v.toString()) < 0) 
                { 
                    tmp.push(v.toString());
                    return v;
                }else{
                    remove.push(i)
                }
        });

        remove.map((id,i)=>{ Sites.splice(id, 1);})

        // only add items with a site count
        if(Sites.length>0){
            this.ScanResults.push({
                Sites:Sites,
                SiteCount:Sites.length,
                Boundary:ScanBoundary,
                //WorkOrderCount:WorkOrderCount,
                GroupedBoxBoundaryLimits:removeDuplicateBoundaryLimits[0]
            });
        }
    }


    this.StoreResults = ()=>{


        //console.log("Scan End Num", this.ScanResults.length)
        // Store Results
        store.dispatch({ type:'SCANSTATE', payload:false}); 
        
        
        //store.dispatch({ type:'STORERESULTS', payload:this.ScanResults});        
 
    }

} 