import store from "../store/index"
import { orderBy, findIndex} from 'lodash'; 






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

    // Arrays
    this.SiteList=null;
    this.SearchThisList=null
    this.GlobalCluster=[]
    this.GlobalCenterpoints=[]
    this.clusterCount=0
    this.ProcessPointer=0;

    this.ScanAreas=[
        { name:'SameBuilding', range: [0,0.2], allocation:1.6, feather:0.1 },
        { name:'CBD', range: [0,2], allocation:1, feather:10  },
        { name:'InnerCity', range: [0,10], allocation:1, feather:5  },
        { name:'Metro', range: [0,50], allocation:0.8, feather:1  },
        { name:'OuterMetro', range: [0,100], allocation:0.7, feather:0  },
        { name:'Regional', range: [0,200], allocation:0.4, feather:0  },
        { name:'Remote', range: [0,500], allocation:0.4, feather:0  },
        { name:'ExtremeRemote', range: [0,2000], allocation:0.4, feather:0 },
    ]
   


    this.Search=()=>{
        console.log("Begin Marker Search")

        // 1. OrderSites on site weighting
        this.JSONparse();
        // 2,
        this.ProcessScan(this.ScanAreas[this.ProcessPointer], 0);
    }


    this.JSONparse = ()=>{
        this.SiteList.map((site,i)=>{
            site.siteweighting = orderBy(JSON.parse(site.siteweighting), ['name'], ['asc', 'desc']); 
        })
        this.SiteList = orderBy(this.SiteList, item => item.count[0].WorkOrders, ['desc']);
        this.SearchThisList = JSON.parse(JSON.stringify(this.SiteList));
    }


    this.CheckGlobalKeys=(NameKey)=>{
        if(this.GlobalCluster[NameKey] === undefined)
            this.GlobalCluster[NameKey] = []
    }

    this.ProcessScan = (Range, int)=>{

        if(int === (this.SearchThisList.length-1) && int > 0){
            console.log("Int and Arr are the Same")
            this.ProcessPointer = this.ProcessPointer + 1
            this.ProcessScan(this.ScanAreas[this.ProcessPointer], 0);
            return true
        }

        if((this.ScanAreas.length-1) === this.ProcessPointer || this.SearchThisList.length  === 0){
                console.log("SCAN COMPLETE")
                this.Global();
                return true
        }

       // console.log(`Processing ${Range.name}`,this.SearchThisList.length)
    
        this.CheckGlobalKeys(Range.name);

        let SiteCluster=[]
        let CenterPoints=[]

        //console.log(this.SearchThisList[int], int, this.SearchThisList.length, this.SearchThisList)
        if(this.SearchThisList[int].lat != null){

            CenterPoints.push({
                name:this.SearchThisList[int].name,
                center:{ lat: this.SearchThisList[int].lat, lng: this.SearchThisList[int].long },
                range:Range.range[1],
                region:Range.name,
                feather:Range.feather
            })

           // console.log(`Searching ${this.SearchThisList[0].name}`);
           
            this.SearchThisList.map((site,ii)=>{
               
                let Distance = distancetoPoint(this.SearchThisList[int].lat, this.SearchThisList[int].long, site.lat,site.long, "K")
             
                
               // ensure we include the center point 
               // Distance === 0
               //
                if( Distance === 0 || Distance >= Range.range[0] && Distance <= Range.range[1] || (Distance-((Range.feather/100)*Distance)) <= Range.range[1]) 
                    {  
                        //console.log(Distance, Range.range[0], Range.range[1])
                        //console.log(this.SearchThisList[int].name, Distance, (Distance-((Range.feather/100)*Distance)) , Range.range[1])
                        SiteCluster.push(site) 
                        
                    }       
             })

        }
        this.findResourceQuota(SiteCluster, CenterPoints, int);
    
    }



    this.findResourceQuota=(cluster, CenterPoints, int)=>{
            let resourceQuota=[]

            if(cluster.length === 0){
                this.ProcessScan(this.ScanAreas[this.ProcessPointer], (int+1));
            }else{
            
                cluster.map((site,i)=>{
                        site.siteweighting.map((weight,i)=>{ resourceQuota.push(weight[this.ScanAreas[this.ProcessPointer].name]) })
                })
                
               
                if(resourceQuota.reduce((a, b) => a + b, 0) >=  this.ScanAreas[this.ProcessPointer].allocation){
                    CenterPoints[0].resourceQuota = resourceQuota.reduce((a, b) => a + b, 0)
                    this.GlobalCluster[this.ScanAreas[this.ProcessPointer].name].push(cluster);
                    this.GlobalCenterpoints.push(CenterPoints[0])
                    this.removeSites(cluster)
                }else{
                    this.ProcessScan(this.ScanAreas[this.ProcessPointer], (int+1));
                }
            }

           return true;
    }


    this.removeSites=(cluster)=>{
        console.log("Cluster REMOVAL")
        
        
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
        console.log("this.GlobalCluster")
        console.log(this.GlobalCluster)
        store.dispatch({ type:'STOREMARKERRESULTS', payload:this.GlobalCluster});
        store.dispatch({ type:'STOREMARKERCENTERPOINTS', payload:this.GlobalCenterpoints}); 
        
    }
}