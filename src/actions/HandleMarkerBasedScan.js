import store from "../store/index"
import { orderBy, findIndex, inRange} from 'lodash'; 

// find the distance in KM from 1 point to another
function distancetoPoint(lat1, lon1, lat2, lon2, unit) {
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


export function ScanSites(){

    /* ***************************************************************************************** */
    // Arrays and Variable set up
    this.SiteList=null;
    this.SearchThisList=null
    this.GlobalCluster=[]
    this.GlobalCenterpoints=[]
    this.CatchNoLongLat=[]
    this.clusterCount=0
    this.ProcessPointer=0;

    this.ScanAreas=[
        { name:'SameBuilding',  range: [0,0.2], allocation:0.4, maxAllocation:null, feather:0.1,restrict:[] },
        { name:'CBD',           range: [0,2],   allocation:0.4, maxAllocation:null, feather:10, restrict:[]   },
        { name:'InnerCity',     range: [0,10],  allocation:0.4, maxAllocation:null, feather:5,  restrict:[]   },
        { name:'Metro',         range: [0,50],  allocation:0.4, maxAllocation:1, feather:1 , restrict:[]  },
        { name:'OuterMetro',    range: [0,100], allocation:0.4, maxAllocation:1, feather:0 , restrict:[]  },
        { name:'Regional',      range: [0,200], allocation:0.4, maxAllocation:1, feather:0 , restrict:[[7000,7999]]  },
        { name:'Remote',        range: [0,500], allocation:0.4, maxAllocation:1, feather:0 , restrict:[[7000,7999]]  },
        { name:'ExtremeRemote', range: [0,2000],allocation:0.4, maxAllocation:1, feather:0 , restrict:[[7000,7999]] },
    ]
   



    /* ***************************************************************************************** */
    // AUX Functions
    /* ***************************************************************************************** */
    this.JSONparse = ()=>{
    
        this.SiteList.map((site,i)=>{
            if(typeof site.siteweighting === 'string')
                site.siteweighting = orderBy(JSON.parse(site.siteweighting), ['name'], ['asc', 'desc']); 
            else
                site.siteweighting = orderBy(site.siteweighting, ['name'], ['asc', 'desc']);
        })
        this.SiteList = orderBy(this.SiteList, item => item.count[0].WorkOrders, ['desc']);
        this.SearchThisList = JSON.parse(JSON.stringify(this.SiteList));
    }


    this.CheckGlobalKeys=(NameKey)=>{
        if(this.GlobalCluster[NameKey] === undefined)
            this.GlobalCluster[NameKey] = []
    }




    /* ***************************************************************************************** */
    // Rules
    /* ***************************************************************************************** */

    this.ArrayState = ()=>{
        if((this.ScanAreas.length-1) === this.ProcessPointer || this.SearchThisList.length  === 0){
            console.log("SCAN COMPLETE")
            this.Global();
            return true
        }else{
            return false
        }
    }

    this.PointerState=(int)=>{
        if(int === (this.SearchThisList.length-1) && int > 0){
            console.log("Int and Arr are the Same")
            this.ProcessPointer = this.ProcessPointer + 1
            this.ProcessScan(this.ScanAreas[this.ProcessPointer], 0);
            return true
        }else{
            return false
        }
    }


    // Rule : is Site in radius Rule
    this.IsInDistance=(SiteInFocus,site,Range)=>{
        let Distance = distancetoPoint(SiteInFocus.lat, SiteInFocus.long, site.lat,site.long, "K")

        if( Distance === 0 || Distance >= Range.range[0] && Distance <= Range.range[1] || (Distance-((Range.feather/100)*Distance)) <= Range.range[1]) 
            return true
        else
            return false
    }


    // Rule : Restrict Postcode if in restricted Category
    this.sitePostCodeCheck = (postcode,region, int)=>{
        let Retrict = false

            region.restrict.map((range,i)=>{ Retrict = inRange(postcode, range[0], range[1])})
        
            if(!Retrict)
                return Retrict;
            else
                this.ProcessScan(this.ScanAreas[this.ProcessPointer], (int+1));
                return Retrict;
        
    }

    // check cluster integity
    this.clusterintegrity =(SiteCluster)=>{
        // check to see if the cluster should be handed over to a quota
        if(SiteCluster.length === 0)
           return false
        else
            return true
    }


    // Cluster Rules


    this.ClusterQuota = (cluster, int)=>{
        let resourceQuota=[]
        let MaxAllocation = this.ScanAreas[this.ProcessPointer].maxAllocation;
        cluster.map((site,i)=>{
            site.siteweighting.map((weight,ii)=>{  
                
                if(MaxAllocation === null){
                    resourceQuota.push(weight[this.ScanAreas[this.ProcessPointer].name]) 
                }else{
                    if(resourceQuota.reduce((a, b) => a + b, 0) < this.ScanAreas[this.ProcessPointer].maxAllocation){
                        resourceQuota.push(weight[this.ScanAreas[this.ProcessPointer].name]) 
                    }
                    else{
                        console.log("Max Quota Hit for this cluster in this Category. remove the existing sites")
                    }
                }
            })
        })

        if(resourceQuota.reduce((a, b) => a + b, 0) >=  this.ScanAreas[this.ProcessPointer].allocation){
           //console.log("resourceQuota", resourceQuota.reduce((a, b) => a + b, 0), this.ScanAreas[this.ProcessPointer].name, this.ScanAreas[this.ProcessPointer].allocation)
            return resourceQuota.reduce((a, b) => a + b, 0)
        }else{
            //console.log("Cluster Failed to reach min resources")
            this.ProcessScan(this.ScanAreas[this.ProcessPointer], (int+1));
            return false
        }
    }





    /* ***************************************************************************************** */
    // Power Functions 
    // Start Here
    this.Search=()=>{
        console.log("Begin Marker Search")
        // 1. OrderSites on site weighting
        this.JSONparse();
        // 2,
        this.ProcessScan(this.ScanAreas[this.ProcessPointer], 0);
        // 3 Rules
            // Site Rules
            // CLuster Rules
            // State of Search Array
    }
    

    this.ProcessScan = (Range, int)=>{

        // Scan Function Variables
        let SiteCluster=[]
        let CenterPoints=[]
        

        // Scan State Rules
        // If State Complete
        if(this.ArrayState())   
            return true
        // If Pointer exhusted
        if(this.PointerState(int))
            return true
      
        // Data Collection House Keeping
            // check to see if region exists in this.global
            this.CheckGlobalKeys(Range.name);


        let SiteInFocus = this.SearchThisList[int];
       
        if(SiteInFocus.combined != null){
            
            // Rule. Check if post code is restricted to the current scan category
            if(this.sitePostCodeCheck(SiteInFocus.postcode.name, Range, int))
                return false

            // Create an instance of a cluster center point, should cluster exist
            CenterPoints.push({
                name:`${SiteInFocus.region.name}-${Range.name}-${SiteInFocus.name}`,
                center:{ lat: SiteInFocus.lat, lng: SiteInFocus.long },
                range:Range.range[1],
                scanCategory:Range.name,
                feather:Range.feather,
                region:SiteInFocus.region.name,
                postcode:SiteInFocus.postcode.name
            })


            this.SearchThisList.map((site,ii)=>{
               
                // 1 rule for sites.
                // Do they fit into the Radius of the center point?
                if(this.IsInDistance(SiteInFocus, site, Range))
                    SiteCluster.push(site)
                else
                    return false
            })


        }
        else{
            // CATCH ALL SITES NOT INCLUDED IN SCAN
            let NoLngLat = findIndex(this.CatchNoLongLat, function(o) { return o.name == SiteInFocus.name; });
            if(NoLngLat === -1)
                this.CatchNoLongLat.push(SiteInFocus)
            
            
        }

        // should i push to Quota or fail this cluster nad move on?
        if(this.clusterintegrity(SiteCluster))
            this.findResourceQuota(SiteCluster, CenterPoints, int);
        else
            this.ProcessScan(this.ScanAreas[this.ProcessPointer], (int+1));
       
    }



    this.findResourceQuota=(cluster, CenterPoints, int)=>{
            //let resourceQuota=[]

             // is cluster Quote over the current threshold?
             let QuoteThreshold  = this.ClusterQuota(cluster, int) 
            
             if(QuoteThreshold)
                {
                
                    CenterPoints[0].resourceQuota = QuoteThreshold;
                    CenterPoints[0].sites = cluster;
                    
                    this.GlobalCluster[this.ScanAreas[this.ProcessPointer].name].push(cluster);
                    this.GlobalCenterpoints.push(CenterPoints[0])
                    
                    this.removeSites(cluster)
             }

           return true;
    }








    this.removeSites=(cluster)=>{
        //console.log("Cluster REMOVAL")
        
        
        let Index;
        cluster.map((site,i)=>{
            //console.log(site);
            Index = findIndex(this.SearchThisList, function(o) { return o.name == site.name; });
            //console.log("Index", Index, site.name)
            this.SearchThisList.splice(Index , 1)
        })
        this.ProcessScan(this.ScanAreas[this.ProcessPointer], 0);
        //console.log(this.GlobalCluster);
        //console.log(this.SearchThisList.length);
        
    }

    this.Global = ()=>{

        console.log("this.GlobalCluster", this.GlobalCluster.length);
        console.log("this.CatchNoLongLat", this.CatchNoLongLat.length);
        console.log("this.SearchThisList", this.SearchThisList.length);


        store.dispatch({ type:'SCANSTATE', payload:false}); 
        store.dispatch({ type:'STOREMARKERRESULTS', payload:this.GlobalCluster});
        store.dispatch({ type:'STOREMARKERCENTERPOINTS', payload:this.GlobalCenterpoints}); 
        store.dispatch({ type:'STORERESIDUALMARKERS', payload:this.SearchThisList});
        store.dispatch({ type:'STORENOLONGLAT', payload:this.CatchNoLongLat}); 
        
        
        
    }
}