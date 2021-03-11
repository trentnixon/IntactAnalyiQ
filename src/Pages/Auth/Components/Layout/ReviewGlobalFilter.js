import React from 'react';

// Template
import Section from "Pages/Auth/Components/Layout/Section"
import {P} from "Pages/Auth/Components/Type";

// Filter
import FilterByResourceType from "Pages/Auth/Components/selects/SelectResourceType";
import FilterByClusterType from "Pages/Auth/Components/selects/SelectClusterType";
import SelectClient from "Pages/Auth/Components/selects/SelectClient";
import Filter_ByCapitalCities from "Pages/Auth/Components/Maps/Filters/Filter_ByCapitalCities";
const GlobalFilter = ()=>{

    return(
        <>
            
            <div className="GlobalFilter">
                <div className="options">
                    <Filter_ByCapitalCities />
                    <SelectClient />    
                    <FilterByResourceType />  
                    <FilterByClusterType />
                </div>
            </div>
        </> 
    )
}

export default GlobalFilter;