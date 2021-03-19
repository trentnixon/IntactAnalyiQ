const InitialState ={
    
    information:{
        CLUSTER:'Clusters refer to the number of grouped sites equal to or greater then the min Resource Allocation',
        TOTALLOCATIONS:'Refers to the Total number of locations included in the Model Calculations',
        LOCATIONSINSCOPE:'Refers to the number of Total Locations than were gathered into a cluster',
        LOCATIONSOUTSCOPE:'Refers to the number of Total Locations than were not injected into a cluster',
        EXCLUDEDLOCATIONS:'The number of locations held by the selected clients but did not fit the parameters of the model',
        FULLPORTFOLIO:'Full number of Locations shared across the clients portfolios',
    },
    ChartSetup:{
        Bar:{
            icon:'bar',
            tip:'',
            Filters:['cluster','resource','client']
           
         },
         Line:{
            icon:'line',
            tip:'',
            Filters:['cluster','resource','client']
         },
        Network:{
            icon:'radial',
            tip:'',
            Filters:['']
        },
        Radial:{
            icon:'radial',
            tip:'',
            Filters:['']
        },
        Pie:{
            icon:'pie',
            tip:'',
            Filters:['cluster','resource','client']
        },
         Map:{
            icon:'map',
            tip:'',
            Filters:['cluster','resource','client']
           
         },
         Swarm:{
            icon:'radial',
            tip:'',
            Filters:['']
           
         },
         Waffle:{
            icon:'radial',
            tip:'',
            Filters:['']
           
         },
         Funnel:{
            icon:'radial',
            tip:'',
            Filters:['']
           
         }
    },

    ChartMeta:{ 
        Locations:{
            Network:{
                title:'The Cluster Network',
                Description:'The Node Network shows the relationships clusters have to there parent item. This diagram should provide a visual clue to cluster concentration'
            },
            Radial:{
                title:'How are the clusters Distributed?',
                Description:'The Radial Graph shows the number of clusters per cluster type in a given model.'
            },
            Pie:{
                title:'How many sites are Inscope?', 
                Description:'The Pie chart show the distribution of sites In, Partial or Out of scope'
            },
            Map:{
                title:'How are the sites distributed across the country?',
                Description:'The Heat map Below shows high volume areas of locations.'
                
            },
            Swarm:{
                title:'How do cluster site numbers relate to Work orkers completed?',
                Description:'Chart shows the Resource Allocation by the specific cluster types.'
             },
             Bar_Resource:{
                 title:'How is the Resource Allocation spread across the Cluster types?',
                 Description:'Chart shows the Rescourse Allocation by the specific cluster types.'
              },
              Bar_WorkOrder:{
                title:'How are Work orders spread across the Cluster by Trade types?',
                Description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
             }
        },
        Resources:{
            Radial:{
                title:'Resources Allocation to Cluster Type',
                Description:'The Radial Graph shows the number of Resource Allocations by Cluster Type in a given model.'
            },
            Pie_Locations:{
                title:'Resources Allocation to Cluster Type',
                Description:'The Radial Graph shows the number of Resource Allocations by Cluster Type in a given model.'
            },
            Waffle:{
                title:'Resources Allocation to Clients',
                Description:'The Graph shows the number of Resource Allocations by Cluster Type in a given model.'
            },
            Map:{
                title:'Heat map of Resource Allocation based on Cluster Types',
                Description:'This heat map shows areas of high volume Resource Allocation within the model.'
                
            },
            Pie_Selected_Locations:{
                title:"Resource Breakdown by Client",
                Description:`This chart shows the breakdown of selected resource by Allocation spread over the clients in the Model`
            },
            Funnel:{
                title:"Cluster Funnel",
                Description:`The funnel below shows the Resource Allocation for the selected Trade type against the Cluster Types`
            },
            Line_Resources_OverTime:{
                title:"Resources Allocation over time",
                Description:`The Bar Graph shows the number of Resource Allocations over the time period of the Model.`
            }
        },
        Clients:{},
        WorkOrders:{},
        Map:{},
        Clusters:{},
        Costs:{},
     
    }
}
 







const COMMUNICATION = (state=InitialState, action) =>{ 
    // eslint-disable-next-line 
    switch(action.type){}
    return state;
}
export default COMMUNICATION; 