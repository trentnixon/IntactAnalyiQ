import React, {useEffect, useState} from 'react'
//import { useSelector } from "react-redux";
//import store from "../../../../store/index"


import Controls from "../Controls/controls"

const SelectARegion = ()=>{

    return(
        <div className="Main">
            <Controls />
        </div>
    )
}

export default SelectARegion;
//
//<Controls  STRAPI={STRAPI} Filters={Filters} onHandle={onHandle}/>