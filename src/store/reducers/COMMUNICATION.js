const InitialState ={
    
    information:{
        CLUSTER:'Clusters refer to the number of grouped sites equal to or greater then the min Resource Allocation',
        TOTALLOCATIONS:'Refers to the Total number of locations included in the Model Calculations',
        LOCATIONSINSCOPE:'Refers to the number of Total Locations than were gathered into a cluster',
        LOCATIONSOUTSCOPE:'Refers to the number of Total Locations than were not injected into a cluster',
        EXCLUDEDLOCATIONS:'The number of locations held by the selected clients but did not fit the parameters of the model',
        FULLPORTFOLIO:'Full number of Locations shared across the clients portfolios',
   
    }
}
 
const COMMUNICATION = (state=InitialState, action) =>{ 
    // eslint-disable-next-line 
    switch(action.type){}
    return state;
}
export default COMMUNICATION; 