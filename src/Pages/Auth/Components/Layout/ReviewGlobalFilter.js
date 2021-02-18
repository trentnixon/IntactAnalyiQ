import React from 'react';

// Template
import Section from "Pages/Auth/Components/Layout/Section"
import {P} from "Pages/Auth/Components/Type";

// Filter
import FilterByResourceType from "Pages/Auth/Components/selects/SelectResourceType";
import FilterByClusterType from "Pages/Auth/Components/selects/SelectClusterType";
import SelectClient from "Pages/Auth/Components/selects/SelectClient";
const GlobalFilter = ()=>{

    return(
        <>
            
            <div className="GlobalFilter">
                <div className="options">
                    <SelectClient />    
                    <FilterByResourceType /> 
                    <FilterByClusterType />
                </div>
            </div>
        </> 
    )
}

export default GlobalFilter;