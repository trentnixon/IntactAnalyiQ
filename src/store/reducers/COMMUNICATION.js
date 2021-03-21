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
            tip:''
           
         },
         Line:{
            icon:'line',
            tip:''
         },
        Network:{
            icon:'radial',
            tip:''
        },
        Radial:{
            icon:'radial',
            tip:''
        },
        Pie:{
            icon:'pie',
            tip:''
        },
         Map:{
            icon:'map',
            tip:''
           
         },
         Swarm:{
            icon:'radial',
            tip:''
           
         },
         Waffle:{
            icon:'radial',
            tip:''
         },
         Funnel:{
            icon:'radial',
            tip:''
         },
          Sunburst:{
            icon:'radial',
            tip:''
        }
    },

    ChartMeta:{ 
        Locations:{
            Network:{
                Filters:[''],
                title:'The Cluster Network',
                Description:'The Node Network shows the relationships clusters have to there parent item. The diagram provides a visual clue to cluster concentration'
            },
            Radial:{
                Filters:[''],
                title:'Where are the Clusters Distributed?',
                Description:'The Radial Graph shows the number of clusters by tier.'
            },
            Pie:{
                Filters:[''],
                title:'How many sites are Inscope?', 
                Description:'The Pie chart show the distribution of sites In, Partial or Out of scope'
            },
            Map:{
                Filters:[''],
                title:'Where are the sites distributed across the country?',
                Description:'The Heat map Below shows high volume areas of locations.'
                
            },
            Swarm:{
                Filters:[''],
                title:'How do cluster relate to work-orkers covered and site volumes gathered ?',
                Description:`The swarm chart shows the number of clusters per tier as a buble in each category. 
                            The Overall size of teh bubble refers to the number of sites within that cluster, 
                            with the vertical position showing the number of workorders completed by that cluster`
             },
             Bar_Resource:{
                Filters:['resource','client'],
                 title:'Where are the Resource concentrations?',
                 Description:`The Stacked Bar chart shows the resource concentrations by to specific cluster types.
                                Bars can be filtered down to specific resource types and clients`
              },
              Bar_WorkOrder:{
                Filters:['resource','client'],
                title:'Where are the Work order concentrations?',
                Description:`The Stacked Bar chart shows the work-order concentrations by to specific cluster types 
                                Bars can be filtered down to specific resource types and clients`
             },
            
        },
        Resources:{
            Radial:{
                Filters:['cluster','client'],
                title:'Where are the Resource Allocations concentrated?',
                Description:'Copy Required'
            },
            Pie_Locations:{
                Filters:['cluster','client'],
                title:'How are the Resources Divided?',
                Description:'Copy Required'
            },
            Waffle:{
                Filters:['resource','cluster'],
                title:'How is this resource allocation Spread across the clients?',
                Description:'Copy Required'
            },
            Map:{
                Filters:['cluster'],
                title:'Where in the country are Resources located?',
                Description:'Copy Required'
                
            },
            Pie_Selected_Locations:{
                Filters:['cluster'],
                title:"How is this resource split across clients?",
                Description:'Copy Required'
            },
            Funnel:{
                Filters:['client'],
                title:"What is the concentration of this resource over cluster types?",
                Description:'Copy Required'
            },
            Line_Resources_OverTime:{
                Filters:['cluster'],
                title:"What is the Demand for this resource over the model period?",
                Description:'Copy Required'
            }
        },
        Clients:{
            Sunburst:{
                Filters:[''],
                title:"How are the Clients broken down over Resource type and Clusters?",
                Description:'Copy Required'
            },
            Pie_Workorders:{
                Filters:['resource','cluster'],
                title:"What are the Work-order demands between clients?",
                Description:'Copy Required'
            },
            Pie_Locations:{
                Filters:['resource','cluster'],
                title:"What are the location numbers between clients?",
                Description:'Copy Required'
            },
            Pie_Resources:{
                Filters:['resource','cluster'],
                title:"What is the Resource Allocation Split between clients?",
                Description:'Copy Required'
            },
            Line_Workorders_Overtime:{
                Filters:['resource','cluster'],
                title:"What are the work-order loads, per clients over time?",
                Description:'Copy Required'
            },
            Line_ResourcesAllocation_Overtime:{
                Filters:['resource','cluster'],
                title:"What are the Resource Allocation requirements, per clients over time?",
                Description:'Copy Required'
            },
            Pie_Selected_Client_Inscope:{
                Filters:['cluster','resource'],
                title:"What are this clients resource requirements?",
                Description:'Copy Required'
            },
            Pie_Selected_Client_Rescourse:{
                Filters:['resource'],
                title:"Where are the clients resources clustered?",
                Description:'Copy Required'
            },
            Pie_Selected_WorkordersByClient:{
                Filters:['resource','cluster'],
                title:"What resources bring in the most work-orders?",
                Description:'Copy Required'
            },
            Pie_Selected_WorkordersByCluster:{
                Filters:['resource'],
                title:"Where are these work-orders clustered?",
                Description:'Copy Required'
            },
            Radial_Selected_WorkordersByCluster:{
                Filters:['resource'],
                title:"What is the clistes cluster disturbution?",
                Description:'Copy Required'
            },
            Funnel_Selected_WorkordersByCluster:{
                Filters:['resource'],
                title:"What is the clistes cluster disturbution?",
                Description:'Copy Required'
            }
           
        },
        WorkOrders:{
            Radial_Workorders:{
                Filters:['cluster'],
                title:"What is the Work-order spread across Resources?",
                Description:'Copy Required'
            },
            Pie_Workorders_Inscope:{
                Filters:[''],
                title:"How many of the model work-orders are InScope?",
                Description:'Copy Required'
            },
            Pie_Client_Workorders:{
                Filters:['resource','cluster'],
                title:"How are Work-orders divided across clients?",
                Description:'Copy Required'
            },
            Radial_Workorder_Spread:{
                Filters:['resource','client'],
                title:"How are the Work-orders Spread over the Clusters?",
                Description:'Copy Required'
            },
            Workorder_Heatmap:{
                Filters:['resource','cluster','client'],
                title:"Where in the country are work-orders found?",
                Description:'Copy Required'
            },
            Bar_Workorders_Overtime:{
                Filters:['resource','cluster'],
                title:"What is the work-order distrubution over the model dates?",
                Description:'Copy Required'
            }
        },
        Map:{},
        Clusters:{},
        Costs:{
            Pie_ResourceCosts:{
                Filters:[''],
                title:"How are the costs spread across resources?",
                Description:'Copy Required'
            },
            Line_ResourceCosts_Overtime:{
                Filters:[''],
                title:"How are the costs spread over time?",
                Description:'Copy Required'

            },
            Map_HeatMapCosts:{
                Filters:[''],
                title:"Where are the cost hot spots?",
                Description:'Copy Required'
            }
        },
     
    }
}
 







const COMMUNICATION = (state=InitialState, action) =>{ 
    // eslint-disable-next-line 
    switch(action.type){}
    return state;
}
export default COMMUNICATION; 