import React from 'react';

// Template
import Section from "Pages/Auth/Components/Layout/Section"
import {P} from "Pages/Auth/Components/Type";

// Filter
import FilterByResourceType from "Pages/Auth/Components/selects/SelectResourceType";
import FilterByClusterType from "Pages/Auth/Components/selects/SelectClusterType";
import SelectCompareModel from "Pages/Auth/Components/selects/SelectCompareModel";
const GlobalFilter = ()=>{

    return(
        <>
            
            <div className="GlobalFilter">
                <div className="options">
                    <SelectCompareModel />
                    <FilterByResourceType /> 
                    <FilterByClusterType />
                </div>
            </div>
        </> 
    )
}

export default GlobalFilter;